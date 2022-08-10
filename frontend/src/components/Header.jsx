import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useProjects from '../hooks/useProjects'

const Header = () => {

  const {handleModalSearch} = useProjects()

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          UpTask
        </h2> 
         <div className="flex justify-center">
            <div className="xl:w-96">
              <div className="input-group relative flex justify-center items-stretch w-full md:mb-0 mb-4">
                <div 
                  className='flex gap-2 p-2 rounded-md text-sm bg-sky-600 text-white font-bold uppercase hover:bg-sky-700 cursor-pointer'
                  onClick={handleModalSearch}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Buscar
                  </div>
              </div>
            </div>
          </div>
         <div
          className='flex items-center gap-4 justify-between'>
          <Link to='/projects' className='font-bold uppercase'>
            Projects
          </Link>
          <button
            type='button'
            className='p-2 rounded-md text-sm bg-sky-600 text-white font-bold uppercase hover:bg-sky-700'
          >
            Logout
          </button>
         </div>

      </div>

    </header>
  )
}

export default Header