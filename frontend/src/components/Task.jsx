import { formatDate } from '../../helpers/formatDate';
import useProject from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';

const Task = ({task}) => {
  const {_id, name, description, deliveryDate, priority, state} = task;
  const {editTask, handleModalDelete, handleSatatus} = useProject();
  const admin = useAdmin();

  return (
    <div className='flex border-b p-5 justify-between items-center'>
    <div >
      <p className='mb-2 text-xl'>
        {name}
      </p>
      <p className='mb-2 text-gray-600'>
        {description}
      </p> 
      <p className='text-sm mb-2 text-gray-600'>
        Delivery Date: {formatDate(deliveryDate)}
      </p>
      <p className={`${priority == 'high' ? 'text-red-800' :priority == 'low' ? 'text-green-700' : 'text-sky-700'}`}>
      <span className='text-gray-600'>Priority: </span>{priority.toUpperCase()[0].concat(priority.slice(1)) }
       </p>
      </div>
      <div className='flex gap-2'>

        {admin && (
          <button 
            onClick={ () => editTask(task) }
            className='uppercase bg-indigo-600 px-4 py-2 font-bold text-sm text-white rounded-lg'
          >
            Edit
          </button>
        )}

          <button
            onClick = {() => handleSatatus(_id)}
            className={`${state ? 'bg-sky-600' : 'bg-gray-600'} uppercase px-4 py-2 font-bold text-sm text-white rounded-lg`}
            >
           {state ? 'Complete' : 'Incomplete'}
          </button>

          {admin &&(
            <button 
              onClick={ () => handleModalDelete(task) }
              className='uppercase bg-red-600 px-4 py-2 font-bold text-sm text-white rounded-lg'
            >
              Delete
            </button>
          )}

      </div>

    </div>
  )
}

export default Task