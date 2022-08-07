import Task from '../models/task.js';
import Project from '../container/projectContainer.js';

// Init project class
const projects = new Project();

class Tasks {
  async add (task, userId) {
    const { name, description, priority, project, deliveryDate} = task;

    // Check if project exist and if user is owner
    const {data} = await projects.getProject(project, userId);

    // save task
    if(data){
      const task = new Task({
        name,
        description,
        priority,
        project,
        deliveryDate
      });
      const taskSaved = await task.save();

      // Add task to project
      data.tasks.push(taskSaved._id);
      await data.save();

      if(taskSaved){
        return taskSaved;
      }
    }
    return false;
  }

  async get (taskId, userId){
    const taskExist = await Task.findById({_id: taskId})
    if(taskExist){
      const porjectId = taskExist.project;
      const {data} = await projects.getProject(porjectId, userId);
      if(data){
        return taskExist;
      }
      return false;
    }
  }

  async update (taskId, taskData){
    const { name, description, priority, state, deliveryDate} = taskData;
    const taskExist = await Task.findById(taskId);
    if(taskExist){
      taskExist.name = name || taskExist.name;
      taskExist.description = description || taskExist.description;
      taskExist.priority = priority || taskExist.priority;
      taskExist.state = state || taskExist.state;
      taskExist.deliveryDate = deliveryDate || taskExist.deliveryDate;
      const taskUpdated = await taskExist.save();
      if(taskUpdated){
        return taskUpdated;
      }
    }
    return false;
  }

  async delete (taskId, userId){
    const taskExist = await this.get(taskId, userId);
    const {data} = await projects.getProject(taskExist.project, userId);

    if(taskExist && data){
      if(data.createdBy.toString() !== userId.toString()){
          return false;
      }

      data.tasks.pull(taskId);

      await Promise.allSettled([await data.save(), await Task.deleteOne()])

      return true;
    }
    return false;
  }

  async changeState (taskId, userId){
    const taskExist = await this.get(taskId, userId);
     const {data} = await projects.getProject(taskExist.project, userId);

    if(taskExist && data){

      if(data.createdBy.toString() !== userId.toString() && !data.colaborators.some( value => value._id.toString() === userId.toString())){
          return {msg: 'User doesnt have permission', data: false};
      }

      taskExist.state = !taskExist.state;
      const updatedTask = await taskExist.save();

      if(updatedTask){
        return {msg: 'Task updated', task: updatedTask};
      }

      return {msg: 'Task not updated', task: false};
    }
    return {msg: 'Task not found', task: false};
  }

}

export default Tasks;