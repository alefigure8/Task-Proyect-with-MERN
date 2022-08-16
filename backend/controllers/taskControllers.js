import Tasks from '../container/taskContainer.js'

const task = new Tasks();

// Add task to project
const addTask = async (req, res) => {
  const userId = req.user._id;
  const userTask = req.body;

  try{
    const taskExists = await task.add(userTask, userId);

    if(!taskExists.data){
      return res.status(400).json(taskExists);
    }

    return res.status(200).json(taskExists);
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

    if(!taskExist.data){
      return res.status(400).json(taskExist);
    }

    return res.status(200).json(taskExist);

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

      if(!taskUpdated.data){
        return res.status(400).json(taskUpdated);
      }

      return res.status(200).json(taskUpdated);
    }

    return res.status(400).json(taskExist);

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

    if(!taskDeleted.data){
      return res.status(400).json();
    }
    return res.status(200).json(taskDeleted);
  } catch (error) {
    console.log(error);
  }
}

const changeStateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;
    const taskUpdated = await task.changeState(taskId, userId);
    if(taskUpdated.task){
      return res.status(200).json(taskUpdated);
    }
    return res.status(400).json(taskUpdated);
  } catch (error) {
    console.log(error)
  }
}

export {
  addTask,
  getTask,
  updateTask,
  delteTask,
  changeStateTask
}