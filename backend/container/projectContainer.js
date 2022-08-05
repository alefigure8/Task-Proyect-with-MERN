import Project from '../models/projects.js';
import Usuario from '../models/Usuario.js';

class Projects {
  async save(projectData, userId) {
    const project = new Project(projectData);
    project.createdBy = userId;
    const projectSaved = await project.save();
    if(project){
      return projectSaved;
    }
    return false;
  }

  async getProject(projectId, userId) {
    // search project by id
    const project = await Project.findById({_id: projectId})
      .populate('tasks')
      .populate('colaborators', 'name email');

    // Check if project exists
    if(!project){
      return false;
    }

    // Check if project exist and if user is owner or colaborator
    if(project.createdBy.toString() !== userId.toString() && !project.colaborators.includes(userId)){
      return false;
    }

    // return project and tasks
    return project
  }

  async getProjectByUser(userId) {
    const project = await Project.find({ createdBy: userId }).select('-tasks');
    if(project){
      return project;
    }
    return false;
  }

  async update(projectId, projectData, userId) {
    const findProyect = await this.getProject(projectId, userId);
    if(findProyect){
      findProyect.name = projectData.name || findProyect.name;
      findProyect.description = projectData.description || findProyect.description;
      findProyect.client = projectData.client || findProyect.client;
      findProyect.startDate = projectData.startDate || findProyect.startDate;
      const projectUpdated = await findProyect.save();

      return projectUpdated;
    }
    return false
  }

  async delete(projectId, userId) {
    const findProyect = await this.getProject(projectId, userId);
    if(findProyect){
      const projectDeleted = await findProyect.remove();
      return projectDeleted;
    }
    return false
  }

  async searchColaborator({email}) {
    const user = await Usuario.findOne({email}).select(['-password', '-__v', '-createdAt', '-updatedAt', '-token', '-confirm']);
    if(user){
      return user;
    }
    return false;
  }

  async addColaborator(userId, projectId, email) {

    const project = await this.getProject(projectId, userId);
    const user = await Usuario.findOne(email);

    if(project && user){

      // chek if user is creator of project
      if(project.createdBy.toString() !== userId._id.toString()){
        return {msg: 'Only creator can added colaborators', data: false};
      }

      // chek if user is creator of project
      if(project.createdBy.toString() === user._id.toString()){
        return {msg: 'Creator can not be added as colcaborator', data: false};
      }

      // Check if user is already colaborator
      if(project.colaborators.includes(user._id)){
        return {msg: 'user is already colaborator', data: false};
      }

      // Add user to colaborators array
      project.colaborators.push(user._id);
      const projectUpdated = await project.save();

      return {msg: 'Colaborator added with success', data: projectUpdated};
    }

    return false;
  }

  async removeColaborator(userId, projectId, email) {
    const project = await this.getProject(projectId, userId);
    const user = await Usuario.findOne({email});

    if(project && user){
      // chek if user is creator of project
      if(project.createdBy.toString() !== userId._id.toString()){
        return {msg: 'Only creator can added colaborators', data: false};
      }

      // Check if user is not a colaborator
      if(!project.colaborators.some( value => value._id.toString() === user._id.toString())){
        return {msg: 'user is not a colaborator', data: false};
      }

      // Add user to colaborators array
      project.colaborators.pull(user._id);
      const projectUpdated = await project.save();

      return {msg: 'Colaborator was delete with success', data: projectUpdated};
    }
  }

}

export default Projects;