import Tasks from '../container/taskContainer.js'

const task = new Tasks();

// Add task to project
const addTask = async (req, res) => {
  const userId = req.user._id;
  const userTask = req.body;

  try{
    const taskExists = await task.add(userTask, userId);

    if(taskExists){
      return res.status(200).json({msg: 'Task added', task: taskExists});
    }

    return res.status(400).json({msg: 'you are not owner of this project or project does not exist'});
  } catch(err){
    console.log(err);
  }

}

// Get task by id
const getTask = async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.id;
  try {
    const taskExist = await task.get(taskId, userId);
    if(taskExist){
      return res.status(200).json({msg: 'Task found', task: taskExist});
      }
      return res.status(400).json({msg: 'you are not owner of this project or project does not exist'});
  } catch (error) {
    console.log(error);
  }
}

// Update task
const updateTask = async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.id;
  const taskData = req.body;
  try {
    // Check if task exist and if user is owner
    const taskExist = await task.get(taskId, userId);
    if(taskExist){
      // Update task
      const taskUpdated = await task.update(taskId, taskData);
      if(taskUpdated){
        return res.status(200).json({msg: 'Task updated', task: taskUpdated});
      }
      return res.status(400).json({msg: 'Task not updated'});
    }
    return res.status(400).json({msg: 'you are not owner of this project or project does not exist'});
  } catch (error) {
    console.log(error);
  }

}

// Delete task
const delteTask = async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.id;
  try {
    const taskDeleted = await task.delete(taskId, userId);
    if(taskDeleted){
      return res.status(200).json({msg: 'Task deleted', task: taskDeleted});
    }
    return res.status(400).json({msg: 'you are not owner of this project or project does not exist'});
  } catch (error) {
    console.log(error);
  }
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