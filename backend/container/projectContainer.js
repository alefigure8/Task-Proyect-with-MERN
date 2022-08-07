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
    const project = await Project.findById({_id: projectId})
      .populate('tasks')
      .populate('colaborators', 'name email _id');

    if(!project){
      return {msg: 'Project not found', data: false};
    }

    if(project.createdBy.toString() !== userId.toString() && !project.colaborators.some( value => value._id.toString() === userId.toString())){
      return {msg: 'User doesnt have permission', data: false};
    }

    return {msg: 'Project found', data: project};
  }

  async getProjectByUser(userId) {
    const project = await Project.find({
      '$or' : [
        { colaborators: { $in:  userId} },
        { createdBy: {$in: userId} }
      ]
    })
      .select('-tasks');

    if(project){
      return project;
    }
    return false;
  }

  async update(projectId, projectData, userId) {
    const {data} = await this.getProject(projectId, userId);
    if(data){
      data.name = projectData.name || data.name;
      data.description = projectData.description || data.description;
      data.client = projectData.client || data.client;
      data.startDate = projectData.startDate || data.startDate;
      const projectUpdated = await data.save();

      return projectUpdated;
    }
    return false
  }

  async delete(projectId, userId) {
    const {data} = await this.getProject(projectId, userId);
    if(data){
      const projectDeleted = await data.remove();
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

    const {data} = await this.getProject(projectId, userId);
    const user = await Usuario.findOne(email);

    if(data && user){

      // chek if user is creator of data
      if(data.createdBy.toString() != userId.toString() ){
        return {msg: 'Only creator can added colaborators', data: false};
      }

      // chek if user is creator of data
      if(data.createdBy.toString() === user._id.toString()){
        return {msg: 'Creator can not be added as colcaborator', data: false};
      }

      // Check if user is already colaborator
      if(data.colaborators.includes(user._id)){
        return {msg: 'user is already colaborator', data: false};
      }

      // Add user to colaborators array
      data.colaborators.push(user._id);
      const projectUpdated = await data.save();

      return {msg: 'Colaborator was added with success', data: projectUpdated};
    }

    return false;
  }

  async removeColaborator(userId, projectId, email) {
    const {data} = await this.getProject(projectId, userId);

    const user = await Usuario.findOne({email});

      if(data && user){

      if(data.createdBy.toString() !== userId.toString() && !data.colaborators.some( value => value._id.toString() === userId.toString())){
        return {msg: 'You are not allowed to delete colaborators', data: false};
      }

      if(data.createdBy.toString() !== userId.toString() && user._id.toString() !== userId.toString()){
        return {msg: 'You are not allowed to delete others colaborators', data: false};
      }

      if(!data.colaborators.some( value => value._id.toString() === user._id.toString())){
        return {msg: 'user is not a colaborator', data: false};
      }

      data.colaborators.pull(user._id);
      const projectUpdated = await data.save();

      return {msg: 'Colaborator was delete with success', data: projectUpdated};
    }
  }

}

export default Projects;