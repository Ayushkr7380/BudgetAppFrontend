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

    const [ expenditureData , setExpenditureData] = useState([]);
    const [showEditItemOption, setShowEditItemOption] = useState({});
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
    
    try {
        const response = await axios.post(`${URL}/api/additem`,expenditureDetails,{withCredentials:true});
        console.log(response.data);
        setExpenditureDetails({ExpenditureName:'',ExpenditureAmount:'',ExpenditureDate:''});
        fetchExpenditureData();
    } catch (error) {
        console.log(error.response.data.message);
    }
  }

  const fetchExpenditureData = async() =>{
    try {
        const response = await axios.get(`${URL}/api/getitem`,{withCredentials:true});
        console.log(response.data);
        setExpenditureData(response.data.expenditureData);
    } catch (error) {
        console.log(error.response.data.message);
    }
  }

  const deleteItem = async(id)=>{
    try {
        const response = await axios.post(`${URL}/api/deleteitem`,{id:id},{withCredentials:true});
        console.log(response.data);
        fetchExpenditureData();
    } catch (error) {
        console.log(error.response.data.message);
    }
  }


  const handleHideEditItem = (itemId) => {
    setShowEditItemOption((prev) => ({
      ...prev,
      [itemId]: false, // Hide edit option for the specific item
    }));
  };

  const editItem = async(itemId , itemname , itemprice ) =>{
        try {
            const response = await axios.post(`${URL}/api/updateitem`,{
                id:itemId,
                name : itemname,
                price : itemprice
            },{
                withCredentials:true
            });
            console.log(response.data);
            handleHideEditItem(itemId);
            fetchExpenditureData();
        } catch (error) {
            console.log(error.response.data.message);
            handleHideEditItem(itemId);
        }
        
  }
    return(
        <>
            <CreateDataContext.Provider value={{signUpData , setSignUpData,signUpSubmit,loginData , setLoginData,loginSubmit,handleChange,submitExpenditureDetails,expenditureDetails ,setExpenditureData , expenditureData ,fetchExpenditureData , deleteItem ,showEditItemOption, setShowEditItemOption,handleHideEditItem ,editItem}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default DataContext;