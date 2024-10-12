import { useContext } from "react"
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
const Home = () => {
  const context = useContext(CreateDataContext);
  const { handleChange , submitExpenditureDetails , expenditureDetails } = context;
  return (
    <div className="flex items-center flex-col border-2 border-white min-h-48 p-4">
      <h2>Write your daily expenditure here</h2>
      <div className="flex flex-col m-2">                        
                <input type="text"
                    className="border-2 border-black p-2 text-black"
                    placeholder="Expenditure Name"
                    onChange={handleChange} 
                    name="ExpenditureName" 
                    value={expenditureDetails.ExpenditureName}
                  />
                <input type="text"
                  className="border-2 border-black p-2 text-black" 
                  placeholder="Expenditure Amount" 
                  onChange={handleChange} 
                  name="ExpenditureAmount" 
                  value={expenditureDetails.ExpenditureAmount}
                 />   
                <input type="date" 
                  onChange={handleChange} 
                  name="ExpenditureDate"
                  className="text-black"
                  value={expenditureDetails.ExpenditureDate}
                 />        
        </div>
        <div >
          <button className="border-white border-2 p-2 rounded-md" onClick={submitExpenditureDetails}>Add</button>
        </div>
    </div>
  )
}
export default Home