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

      // Save task
      const taskSaved = await task.save();

      // Add task into project
      data.tasks.push(taskSaved._id);

      // Save project
      await data.save();

      if(taskSaved){
        return {msg: 'Task added', task: taskSaved};
      }
    }
    return {msg: 'you are not owner of this project or project does not exist', data: false};
  }

  async get (taskId, userId){
    const taskExist = await Task.findById({_id: taskId})
      .populate('project')
      .populate('completedBy');

    if(taskExist){
      const porjectId = taskExist.project;
      const {data} = await projects.getProject(porjectId, userId);

      if(data){
        return {msg: 'Task found', task: taskExist};
      }

      return {msg: 'you are not owner of this project or project does not exist', task: false};
    }

    return {msg: 'Task not found', task: false};
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
        return {msg: 'Task updated', task: taskUpdated};
      }
    }

    return {msg: 'Task not updated', task: false};
  }

  async delete (taskId, userId){
    const taskExist = await this.get(taskId, userId);
    const {data} = await projects.getProject(taskExist.project, userId);

    if(taskExist && data){
      if(data.createdBy.toString() !== userId.toString()){
          return {msg: 'you are not owner of this project', data: false};
      }

      data.tasks.pull(taskId);

      await Promise.allSettled([await data.save(), await Task.deleteOne({_id: taskId})]);

      return {msg: 'Task deleted', task: true};
    }
    return {msg: 'Project does not exist', data: false};
  }

  async changeState (taskId, userId){
    const taskExist = await this.get(taskId, userId);

    if(taskExist){

      if(taskExist.project.createdBy.toString() !== userId.toString() && !taskExist.project.colaborators.some( value => value._id.toString() === userId.toString())){
          return {msg: 'User doesnt have permission', data: false};
      }

      taskExist.state = !taskExist.state;

      if(taskExist.state){
        taskExist.completedBy = userId;
      } else {
        taskExist.completedBy = null;
      }

      await (await taskExist.save());

      const updatedTask = await this.get(taskId, userId);

      if(updatedTask){
        return {msg: 'Task updated', task: updatedTask};
      }

      return {msg: 'Task not updated', task: false};
    }
    return {msg: 'Task not found', task: false};
  }

}

export default Tasks;