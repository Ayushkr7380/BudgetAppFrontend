import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Profile from '../Components/Profile/Profile';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';

function BudgetRouters(){
    return(
        <>
            <Routes>
                <Route path='/auth/signup' element={<Signup/>}></Route>
                <Route path='/auth/login' element={<Login/>}></Route>

                <Route path='/' element={<Home/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
            </Routes>
        </>
    )
}

export default BudgetRouters;