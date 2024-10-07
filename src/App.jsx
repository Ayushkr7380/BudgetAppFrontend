import './App.css'
import Navbar from './Components/Navbar/Navbar'
import BudgetRouters from './CustomRoutes/BudgetRouters'

function App() {

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <Navbar/>
        <BudgetRouters/>
      </div>
    </>
  )
}

export default App
