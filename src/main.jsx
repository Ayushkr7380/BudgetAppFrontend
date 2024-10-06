import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DataContext from './Context/DataContext/DataContext.jsx'
import AuthContext from './Context/AuthContext/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <DataContext>
        <App />
      </DataContext>
    </AuthContext>
  </BrowserRouter>
  ,
)
