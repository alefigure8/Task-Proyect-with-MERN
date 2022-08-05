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

const deleteProject = async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params.id;
  try {
    const projectDeleted = await project.delete(projectId, userId);
    if(projectDeleted){
      return res.json({
        msg: 'Project deleted',
        data: projectDeleted
      });
    }
    return res.status(400).json({ msg: 'Error deleting project' });
  } catch (error) {
    console.log(error);
  }

}

// Search colaborator by email
const searchColaborator = async (req, res) => {
  const email = req.body;
  try {
    const colaborator = await project.searchColaborator(email);
    if(colaborator){
      return res.json({
        msg: 'Colaborator found',
        data: colaborator
      });
    }
    return res.status(400).json({ msg: 'Error finding colaborator' });
  } catch (error) {
    console.log(error);
  }
}

// Add colaborator to project
const addColaborator = async (req, res) => {
 try {
  const projectId = req.params.id;
  const email = req.body;
  const userId = req.user._id;
  const colaborator = await project.addColaborator(userId, projectId, email);

  if(!colaborator.data){
    return res.status(400).json(colaborator);
  }

  return res.status(200).json(colaborator);

 } catch (error) {
   console.log(error);
 }
}

const removeColaborator = async (req, res) => {
  try {
    const projectId = req.params.id;
    const email = req.body.email;
    const userId = req.user._id;

    const colaborator = await project.removeColaborator(userId, projectId, email);

    if(!colaborator.data){
      return res.status(400).json(colaborator);
    }

    return res.status(200).json(colaborator);
  } catch (error) {
    console.log(error);
  }
}

export {
  getProject,
  newProject,
  allProject,
  editProject,
  deleteProject,
  searchColaborator,
  addColaborator,
  removeColaborator,
}