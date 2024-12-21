import { CreateAuthContext } from "./CreateAuthContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateDataContext } from "../DataContext/CreateDataContext";
function AuthContext(props){
    const URL = 'http://localhost:3000';
    const navigate = useNavigate();
    // const dataContext = useContext(CreateDataContext);
    // const { setExpenditureData } = dataContext; 
    const [userData , setUserData] = useState({});
    async function userDetailsData(){
        try {
          // console.log('try start');
            const response = await axios.get(`${URL}/auth/`,{withCredentials:true});
            // console.log(response.data);
            // console.log("success");
            setUserData(response.data.user);
        } catch (error) {
          // console.log("error part");
            // console.log(error.response.data.message);
            navigate('/auth/login');
        }
    }

    async function userLogout(){
        try {
            const response = await axios.post(`${URL}/auth/logout`,{},{withCredentials:true});
            // console.log(response.data);
            setUserData({});
            // setExpenditureData([]);
            navigate('/auth/login');
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return(
        <>
            <CreateAuthContext.Provider value={{userDetailsData,userData,userLogout}}>
                {props.children}
            </CreateAuthContext.Provider>
        </>
    )
}

export default AuthContext;