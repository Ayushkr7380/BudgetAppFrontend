import { CreateDataContext } from "./CreateDataContext";
import { useState } from "react";
function DataContext(props){
    const [ expenditureDetails , setExpenditureDetails] = useState({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});

  const handleChange =(e)=>{
      const { name , value } = e.target;
      setExpenditureDetails({
        ...expenditureDetails,
        [name]:value
      });
  }
  // console.log(expenditureDetails);
  const submitExpenditureDetails = () =>{
    console.log(expenditureDetails); 
    setExpenditureDetails({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''})  
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