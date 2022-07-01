
const NewPass = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Reset yourr password and do not lose access to your
      <span className="text-slate-700"> projects</span>
    </h1>
    <form action="" className="my-10 bg-white shadow rounded-lg p-10">
      <div className="my-3">
        <label 
          className="Uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password"
          >New Password</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter your new password"
          className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3 my-3"
        />
      </div>
      <input type="submit" value="Save new password" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
    </form>

  </>
  )
}

export default NewPass