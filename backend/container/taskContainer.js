import Task from '../models/task.js';
import Project from '../container/projectContainer.js';

const projects = new Project();

class Tasks {
  async add (task, userId) {
    const { name, description, priority, project} = task;
    const taslExists = await projects.getProject(project, userId);
    if(taslExists){
      const task = new Task({
        name,
        description,
        priority,
        project,
      });
      const taskSaved = await task.save();
      if(taskSaved){
        return taskSaved;
      }
    }
    return false;
  }


}

export default Tasks;