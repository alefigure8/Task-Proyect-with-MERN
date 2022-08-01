import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useProjects from '../hooks/useProjects'

const OPTIONS = ['Low', 'Medium', 'High']

export default function ModalFormTask() {
  const { modalForm, handleModal } = useProjects()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [option, setOption] = useState('')

  return (
    <Transition.Root show={modalForm} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModal}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900 uppercase">
                                      Create a new task
                                    </Dialog.Title>
                                      <form
                                        className='my-8'
                                      >
                                        <div
                                            className="mb-5"
                                        >
                                          <label 
                                            htmlFor="name"
                                            className='block text-sm font-medium leading-5 text-gray-700 uppercase'
                                            >
                                              Name
                                          </label>
                                          <input
                                            id="name"
                                            type="text"
                                            className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
                                            placeholder='Name'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                          />
                                        </div>
                                        <div
                                            className="mb-5"
                                        >
                                          <label 
                                            htmlFor="description"
                                            className='block text-sm font-medium leading-5 text-gray-700 uppercase'
                                            >
                                              Description
                                          </label>
                                          <textarea
                                            id="description"
                                            className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
                                            placeholder='Description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                          />
                                        </div>
                                        <div
                                            className="mb-5"
                                        >
                                          <label 
                                            htmlFor="priority"
                                            className='block text-sm font-medium leading-5 text-gray-700 uppercase'
                                            >
                                              Priority
                                          </label>
                                          <select
                                            id="priority"
                                            type="text"
                                            className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
                                            placeholder='Name'
                                            value={option}
                                            onChange={e => setOption(e.target.value)}
                                          >
                                            <option value = ""> -- Select an option -- </option>
                                            {OPTIONS.map( option => <option key={option} value={option}>{option}</option>)}
                                          </select>
                                          <input 
                                            type="submit"
                                            value="Create"
                                            className='w-full mt-3 p-2 bg-sky-600 text-white font-bold uppercase cursor-pointer rounded-md hover:bg-sky-700'
                                          />
                                        </div>
                                      </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
