import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DataContext from './Context/DataContext/DataContext.jsx'
import AuthContext from './Context/AuthContext/AuthContext.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <DataContext>
        <App />
        <ToastContainer/>
      </DataContext>
    </AuthContext>
    
  </BrowserRouter>
  ,
)
