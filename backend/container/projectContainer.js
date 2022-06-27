import Project from '../models/projects.js';

class Projects {
  async save(projectData, userId) {
    const project = new Project(projectData);
    project.createdBy = userId;
    const projectSaved = await project.save();
    return projectSaved;
  }

  async getProject(projectId) {
    const project = await Project.findById({_id: projectId});
    return project;
  }

  async getProjectByUser(userId) {
    const project = await Project.find({ createdBy: userId });
    return project;
  }

}

export default Projects;