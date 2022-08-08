import {useState, useEffect} from 'react'
import useProjects from '../hooks/useProjects'
import Alert from '../components/Alert'
import { useParams } from 'react-router-dom'

const FormProject = () => {
  const [id, setId] = useState(null);
  const params = useParams();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [client, setClient] = useState('')
  const {showAlert, alert, submitProject, project} = useProjects();

  useEffect(()=>{
    if(params.id){
      setId(params.id)
      setName(project.name)
      setDescription(project.description)
      setDate(project.date.split('T')[0])
      setClient(project.client)
    }
  }
  , [params.id])

  const handleSubmit = (e) => {
    e.preventDefault();

    if([name, description, date, client].includes('')) {
      showAlert({
        msg: 'All fields are required',
        error: true
      })

      return
    }

    // send the data to the API
    submitProject({id, name, description, date, client})

    // clean the form
    setId(null)
    setName('')
    setDescription('')
    setDate('')
    setClient('')
  }

  return (
   <form onSubmit={handleSubmit} className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
    {alert?.msg && <Alert alert={alert} />}
    <div>
      <label
      className='text-gray-700 font-bold uppercase text-sm'
      htmlFor='name'
      >First Name</label>
      <input
        type="text"
        className='my-2 w-full border rounded-md p-2 placeholder-gray-400'
        placeholder='Insert your name'
        id='name'
        value = {name}
        onChange = {e => setName(e.target.value)}
      />
    </div>
    <div>
      <label
      className='text-gray-700 font-bold uppercase text-sm'
      htmlFor='description'
      >Description</label>
      <textarea
        className='my-2 w-full border rounded-md p-2 placeholder-gray-400'
        placeholder='description project'
        id='description'
        value = {description}
        onChange = {e => setDescription(e.target.value)}
      />
    </div>
    <div>
      <label
      className='text-gray-700 font-bold uppercase text-sm'
      htmlFor='description'
      >Date</label>
      <input
        type="date"
        className='my-2 w-full border rounded-md p-2 placeholder-gray-400'
        placeholder='description project'
        id='description'
        value = {date}
        onChange = {e => setDate(e.target.value)}
      />
    </div>
    <div>
      <label
      className='text-gray-700 font-bold uppercase text-sm'
      htmlFor='client'
      >Client</label>
      <input
        className='my-2 w-full border rounded-md p-2 placeholder-gray-400'
        placeholder='Name client'
        id='client'
        value = {client}
        onChange = {e => setClient(e.target.value)}
      />
    </div>
    <input type="submit" value={id ? 'Edit Project' : 'Submit'} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md w-full cursor-pointer transition-colors mt-2"/>
   </form>
  )
}

export default FormProject