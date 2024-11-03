import { useContext, useEffect, useState } from "react"
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";
const Home = () => {
  
  const context = useContext(CreateDataContext);
  const authContext = useContext(CreateAuthContext);
  const { handleChange , submitExpenditureDetails , expenditureDetails , expenditureData ,fetchExpenditureData} = context;
  
  const { userDetailsData ,userData} = authContext;
  
  // console.log("data : ",expenditureData);


const [groupedByDate, setGroupedByDate] = useState({});

function userFetch(){
  // console.log("Function working.");
  userDetailsData();
}
useEffect(()=>{
  userFetch(); 
  fetchExpenditureData();
},[]);

// console.log(userData);
useEffect(() => {
  // Grouping the dummydata by date and calculating total price
  const groupDataByDate = expenditureData.reduce((acc, ele) => {
    const { ExpenditureDate
      , ExpenditureName, 
      ExpenditureAmount } = ele;
    if (acc[ExpenditureDate
    ]) {
      acc[ExpenditureDate
      ].items.push({ ExpenditureName, 
        ExpenditureAmount });
      acc[ExpenditureDate
      ].total += parseFloat(
        ExpenditureAmount);
    } else {
      acc[ExpenditureDate
      ] = {
        items: [{ ExpenditureName, 
          ExpenditureAmount }],
        total: parseFloat(
          ExpenditureAmount),
      };
    }
    return acc;
  }, {});

  setGroupedByDate(groupDataByDate);
}, [expenditureData]);

// console.log(groupedByDate);

  return (
    <div className="flex items-center flex-col  ">
      <h2>Write your daily expenditure here</h2>
      <div className="flex flex-col m-2 border-2 border-white min-h-48 p-4">                        
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
        
        <div className="grid grid-cols-4 mt-4">
          {Object.keys(groupedByDate).map((date) => (
            <div key={date} className="mb-4 border p-3 text-black m-2 bg-slate-300 rounded-md">
              <h3 className="font-bold mb-2 text-black">{date}</h3>
              <ul>
                {groupedByDate[date].items.map((ele, index) => (
                  <li key={index} className="mb-1">
                    {ele.ExpenditureName} - ₹{ele.ExpenditureAmount}
                    
                  </li>
                  
                ))}
              </ul>
              <p className="text-black font-bold text-md">Total = {groupedByDate[date].total}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
export default Home