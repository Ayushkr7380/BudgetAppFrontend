import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Profile from '../Components/Profile/Profile';

function BudgetRouters(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
            </Routes>
        </>
    )
}

export default BudgetRouters;