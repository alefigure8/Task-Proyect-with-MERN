import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          UpTask
        </h2>
      
         <div className="flex justify-center">
            <div className="xl:w-96">
              <div className="input-group relative flex justify-center items-stretch w-full md:mb-0 mb-4">
                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                <button className="btn px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out items-center" type="button" id="button-addon2">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </button>
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