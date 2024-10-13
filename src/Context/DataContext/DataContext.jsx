import { CreateDataContext } from "./CreateDataContext";
import { useState } from "react";
import axios from 'axios';
function DataContext(props){
    const URL = 'http://localhost:5000';

    const [ expenditureDetails , setExpenditureDetails] = useState({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});

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
            <CreateDataContext.Provider value={{handleChange,submitExpenditureDetails,expenditureDetails}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default DataContext;