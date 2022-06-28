import Tasks from '../container/taskContainer.js'
const task = new Tasks();

// Add task to project
const addTask = async (req, res) => {
  const userId = req.user._id;
  const userTask = req.body;

  const taskExists = await task.add(userTask, userId);

  if(taskExists){
    return res.status(200).json({message: 'Task added', task: taskExists});
  }
  return res.status(400).json({
    message: 'Task not added',
  });

}

const getTask = async (req, res) => {

}

const updateTask = async (req, res) => {

}

const delteTask = async (req, res) => {

}

const changeStateTask = async (req, res) => {

}

export {
  addTask,
  getTask,
  updateTask,
  delteTask,
  changeStateTask
}