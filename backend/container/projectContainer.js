import Project from '../models/projects.js';

class Projects {
  async save(projectData, userId) {
    const project = new Project(projectData);
    project.createdBy = userId;
    const projectSaved = await project.save();
    return projectSaved;
  }

  async getProject(projectId, userId) {
    const project = await Project.findById({_id: projectId}).where('createdBy').equals(userId);
    return project;
  }

  async getProjectByUser(userId) {
    const project = await Project.find({ createdBy: userId });
    return project;
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

}

export default Projects;