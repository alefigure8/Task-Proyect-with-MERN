import Project from '../models/projects.js';

class Projects {
  async save(projectData, userId) {
    const project = new Project(projectData);
    project.createdBy = userId;
    const projectSaved = await project.save();
    return projectSaved;
  }

}

export default Projects;