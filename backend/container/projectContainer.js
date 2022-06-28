import Project from '../models/projects.js';
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
    const project = await Project.findById({_id: projectId});

    // Check if project exist and if user is owner
    if(project.createdBy.toString() === userId.toString()){
      return project;
    }

    // Check if project exist and if user is collaborator
    if(project.colaborators.includes(userId)){
      return project;
    }

    return false;
  }

  async getProjectByUser(userId) {
    const project = await Project.find({ createdBy: userId });
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
}

export default Projects;