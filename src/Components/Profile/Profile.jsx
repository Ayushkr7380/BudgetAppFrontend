import { useContext, useEffect } from "react"
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext"
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom"
const Profile = () => {
  const context = useContext(CreateAuthContext);
  const { userData ,userLogout} = context;
  const navigate = useNavigate();

 useEffect(()=>{
    function checkUser(){
      !userData.name && navigate("/auth/login");
    }
    checkUser();
 },[userData])
  return ( 
    <div className="flex flex-col items-center">
      <div className="font-bold mt-5">
        <h1 className="text-3xl ">Welcome {userData.name}</h1>
        <p className="mt-3">Name : {userData.name}</p>
        <p className="mt-3">Email : {userData.email}</p>
      </div>
        <div className="bg-red-600 py-1 px-3 font-semibold rounded-md absolute bottom-6">
          <button onClick={()=>userLogout()}>Logout</button>
        </div>
    </div>
  )
}

export default Profile