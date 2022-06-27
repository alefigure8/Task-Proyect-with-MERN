import Projects from  '../container/projectContainer.js';

// Init Models projects
const project = new Projects();

const getProjects = (req, res) => {
  res.json({msg: "Hola mundo"});

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

const allProject = (req, res) => {

}

const editProject = (req, res) => {

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
  getProjects,
  newProject,
  allProject,
  editProject,
  deleteProject,
  addColaborator,
  removeColaborator,
  getTask
}