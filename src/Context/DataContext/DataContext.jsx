import { useState } from "react";
import { CreateDataContext } from "./CreateDataContext";
import axios from 'axios';
function DataContext(props){
    const URL = 'http://127.0.0.1:3000';

    const [ expenditureDetails , setExpenditureDetails] = useState({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});


    //SignUp
    const signUpSubmit = async(signUpdata) =>{
        try {
            const response = await axios.post(`${URL}/auth/signup`,signUpdata,{withCredentials: true});
            console.log(response.data);
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
            <CreateDataContext.Provider value={{signUpSubmit,handleChange,submitExpenditureDetails,expenditureDetails}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default DataContext;