const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Login and Manage your
        <span className="text-slate-700"> projects</span>
      </h1>
      <form action="" className="my-10 bg-white shadow rounded-lg p-10">
        <div>
          <label 
            className="Uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3"
          />
        </div>
        <div className="my-5">
          <label 
            className="Uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3 my-3"
          />
        </div>
        <input type="submit" value="Login" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-3" />
      </form>
    </>
  )
}

export default Login