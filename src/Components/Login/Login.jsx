import { useContext} from "react";
import { Link } from "react-router-dom" 
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
// import LoadingBar from "react-top-loading-bar";
import ClipLoader from "react-spinners/ClipLoader";
const Login = () => {

  const context = useContext(CreateDataContext);

  const {loginSubmit ,loginData , setLoginData , loginLoadingBar , setLoginLoadingBar} = context;
  
  const handleChange = (e) =>{
      const { name , value } = e.target;
      setLoginData({
        ...loginData,
        [name]:value
      });
      
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await loginSubmit(loginData);
  }

  return (
    <div className="text-white flex justify-center ">
      <div className="flex flex-col border-2 border-white py-2 px-6 rounded-md">
        <h1 className="font-bold text-2xl text-center my-3">Login Page</h1>
      
         <input
         type="text"
         className="text-black px-2 py-1 m-2 rounded-md"
         name="email"
         placeholder="Email"
         onChange={handleChange}
         value={loginData.email}
         />
         <input
         type="password"
         className="text-black px-2 py-1 m-2 rounded-md"
         name="password"
         placeholder="Password"
         onChange={handleChange}
         value={loginData.password}
         />
          <div  className="text-center h-5">
          {
          loginLoadingBar && <span><ClipLoader color="white" size={15}
 /></span>
         }
          </div>
         <div className="grid grid-cols-2 items-center text-center mt-3 px-2">
          <button className="border-white border-2  rounded-md font-semibold" onClick={handleSubmit}>Login</button>
          <Link to='/auth/signup' className="underline" >Signup</Link>
         </div>
         
      </div>
    </div>
  )
}

export default Login