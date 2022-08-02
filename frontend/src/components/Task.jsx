import { formatDate } from '../../helpers/formatDate';

const Task = ({task}) => {
  const {_id, name, description, deliveryDate, priority, state} = task;

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
        <button className='uppercase bg-indigo-600 px-4 py-2 font-bold text-sm text-white rounded-lg'>
          Edit
        </button>
        {state ? (
          <button className='uppercase bg-sky-600 px-4 py-2 font-bold text-sm text-white rounded-lg'>
            Complete
          </button>
        ) : (
          <button className='uppercase bg-gray-600 px-4 py-2 font-bold text-sm text-white rounded-lg'>
            Uncomplete
          </button>
        )}
          <button className='uppercase bg-red-600 px-4 py-2 font-bold text-sm text-white rounded-lg'>
            Delete
          </button>

      </div>

    </div>
  )
}

export default Task