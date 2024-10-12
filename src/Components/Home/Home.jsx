import { useState } from "react"

// import { Link } from "react-router-dom"
const Home = () => {
  const [ inputFieldLength , setInputFieldLength ] = useState([1]);

  const addInput = ()=>{
    setInputFieldLength([inputFieldLength.length + 1])
  }
  console.log(inputFieldLength)
  return (
    <div className="flex justify-center">
        {
          inputFieldLength
        }
        <div className="flex ">
        
          
        </div>
        <div>
          <button onClick={()=>addInput()}>Add</button>
        </div>
    </div>
  )
}
export default Home