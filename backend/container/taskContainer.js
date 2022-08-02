import Task from '../models/task.js';
import Project from '../container/projectContainer.js';

// Init project class
const projects = new Project();

class Tasks {
  async add (task, userId) {
    const { name, description, priority, project, deliveryDate} = task;

    // Check if project exist and if user is owner
    const taskExists = await projects.getProject(project, userId);

    // save task
    if(taskExists){
      const task = new Task({
        name,
        description,
        priority,
        project,
        deliveryDate
      });
      const taskSaved = await task.save();

      // Add task to project
      taskExists.tasks.push(taskSaved._id);
      await taskExists.save();

      if(taskSaved){
        return taskSaved;
      }
    }
    return false;
  }

  async get (taskId, userId){
    const taskExist = await Task.findById(taskId);
    if(taskExist){
      const porjectId = taskExist.project;
      const projectExist = await projects.getProject(porjectId, userId);
      if(projectExist){
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
    if(taskExist){
      const taskDeleted = await Task.deleteOne();
      if(taskDeleted){
        return taskDeleted;
      }
    }

    return false;
  }

}

export default Tasks;