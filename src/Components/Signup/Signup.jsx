import{ Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="text-white flex justify-center ">
      <div className="flex flex-col border-2 border-white py-2 px-6 rounded-md">
        <h1 className="font-bold text-2xl text-center my-3">SignUp Page</h1>
        <input
         type="text"
         className="text-white px-2 py-1 m-2 rounded-md"
         name="name"
         placeholder="Name"
         />
         <input
         type="text"
         className="text-white px-2 py-1 m-2 rounded-md"
         name="email"
         placeholder="Email"
         />
         <input
         type="password"
         className="text-white px-2 py-1 m-2 rounded-md"
         name="password"
         placeholder="Password"
         />

         <div className="grid grid-cols-2 items-center text-center mt-3">
          <button className="border-white border-2  rounded-md font-semibold">Signup</button>
          <Link to='/auth/login' className="underline" >Login</Link>
         </div>
      </div>
    </div>
  )
}

export default Signup