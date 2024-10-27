import { useContext, useState } from "react";
import{ Link } from "react-router-dom";
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
const Signup = () => {

  const  context = useContext(CreateDataContext);

  const { signUpSubmit , signUpData , setSignUpData} = context;
 
  const handleChange = (e)=>{
        const { name , value } = e.target;
        setSignUpData({
          ...signUpData ,
          [name]:value
        })
  }

  // console.log(signUpData);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await signUpSubmit(signUpData);
  }

  return (
    <div className="text-white flex justify-center ">
      <div className="flex flex-col border-2 border-white py-2 px-6 rounded-md">
        <h1 className="font-bold text-2xl text-center my-3">SignUp Page</h1>
        <input
         type="text"
         className="text-black px-2 py-1 m-2 rounded-md"
         name="name"
         placeholder="Name"
         onChange={handleChange}
         value={signUpData.name}
         />
         <input
         type="text"
         className="text-black px-2 py-1 m-2 rounded-md"
         name="email"
         placeholder="Email"
         onChange={handleChange}
         value={signUpData.email}
         />
         <input
         type="password"
         className="text-black px-2 py-1 m-2 rounded-md"
         name="password"
         placeholder="Password"
         onChange={handleChange}
         value={signUpData.password}
         />

         <div className="grid grid-cols-2 items-center text-center mt-3 px-2">
          <button className="border-white border-2  rounded-md font-semibold" onClick={handleSubmit}>Signup</button>
          <Link to='/auth/login' className="underline">Login</Link>
         </div>
      </div>
    </div>
  )
}

export default Signup