import {useState} from 'react'
import useProjects from '../hooks/useProjects'
import Alert from './Alert';

const FormColaborator = () => {
  const [email, setEmail] = useState('');
  const {showAlert, alert, searchColaborator} = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === '') {
      showAlert({
        msg: 'All fields are required',
        error: true
      })

      setTimeout(() => {
        showAlert({})
      }, 3000);

      return
    }

    searchColaborator(email);
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
    {alert?.msg && <Alert alert={alert} />}
      <div>
        <label
        className='text-gray-700 font-bold uppercase text-sm'
        htmlFor='email'
        >Email</label>
        <input
          type="email"
          className='my-2 w-full border rounded-md p-2 placeholder-gray-400'
          placeholder='Insert an email'
          id='email'
          value = {email}
          onChange = {e => setEmail(e.target.value)}
        />
      </div>
      <input type="submit" value='Search user' className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md w-full cursor-pointer transition-colors mt-2"/>
      </form>

  )
}

export default FormColaborator