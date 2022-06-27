import Projects from  '../container/projectContainer.js';

// Init Models projects
const project = new Projects();

// get all projects by user
const allProject = async (req, res) => {
  const userId = req.user._id;
  const projectByUser = await project.getProjectByUser(userId)
  if(projectByUser){
    return res.json({
      msg: 'Projects found',
      data: projectByUser
    });
  }
  return res.status(400).json({ msg: 'Error finding projects' });
}

// Create a new project
const newProject = async (req, res) => {
  const projectData = req.body;
  const userId = req.user._id;
  try {
    const newProject = await project.save(projectData, userId);
    if(newProject){
      return res.json({
        msg: 'Project created',
        data: newProject
      });
    }
    return res.status(400).json({ msg: 'Error creating project' });
  } catch (error) {
    console.log(error);
  }

}

// get project by id
const getProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;
  try {
    const projectById = await project.getProject(projectId, userId);
    if(projectById){
      return res.json({
        msg: 'Project found',
        data: projectById
      });
    }
    return res.status(400).json({ msg: 'Error finding project' });
  } catch (error) {
    console.log(error);
  }
}

const editProject = async (req, res) => {
  const userId = req.user._id;
  const projectData = req.body;
  const projectId = req.params.id;
  try {

    const projectEdited = await project.update(projectId, projectData, userId);
    if(projectEdited){
      return res.json({
        msg: 'Project updated',
        data: projectEdited
      });
    }
    return res.status(400).json({ msg: 'Error updating project' });

  } catch (error) {
    console.log(error);
  }
}

const deleteProject = (req, res) => {

}

const addColaborator = (req, res) => {

}

const removeColaborator = (req, res) => {

}

const getTask = (req, res) => {

}

export {
  getProject,
  newProject,
  allProject,
  editProject,
  deleteProject,
  addColaborator,
  removeColaborator,
  getTask
}