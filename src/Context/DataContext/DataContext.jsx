import { useState } from "react";
import { CreateDataContext } from "./CreateDataContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function DataContext(props){
    const URL = 'http://localhost:3000';

    const navigate = useNavigate();

    const [ signUpData , setSignUpData] = useState({name : '',email:'',password : ''});
    const [ loginData , setLoginData ] = useState({email : '',password : ''});
    const [ expenditureDetails , setExpenditureDetails] = useState({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});


    //SignUp
    const signUpSubmit = async(signUpdata) =>{
        try {
            const response = await axios.post(`${URL}/auth/signup`,signUpdata,{withCredentials: true});
            console.log(response.data);
            setSignUpData({name : '',email:'',password : ''});
            navigate('/auth/login');
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    //Login
    const loginSubmit = async(loginData) =>{
        try {
            const response = await axios.post(`${URL}/auth/login`,loginData,{withCredentials:true});
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.log(error.response.data.message);
        }
    }


  const handleChange =(e)=>{
      const { name , value } = e.target;
      setExpenditureDetails({
        ...expenditureDetails,
        [name]:value
      });
  }
  // console.log(expenditureDetails);
  const submitExpenditureDetails = async() =>{
    console.log(expenditureDetails); 
    setExpenditureDetails({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});
    try {
        const response = await axios.post(`${URL}/`);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
  }
    return(
        <>
            <CreateDataContext.Provider value={{signUpData , setSignUpData,signUpSubmit,loginData , setLoginData,loginSubmit,handleChange,submitExpenditureDetails,expenditureDetails}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default DataContext;