import { useContext, useEffect, useState } from "react"
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";
const Home = () => {
  
  const context = useContext(CreateDataContext);
  const authContext = useContext(CreateAuthContext);
  const { handleChange , submitExpenditureDetails , expenditureDetails} = context;
  
  const { userDetailsData ,userData} = authContext;
  
  const dummydata = [
    {
        date:"2024-10-01",
        item:"Biryani",
        price:"700"
    },
    {
      date:"2024-10-01",
      item:"Ayush",
      price:"20"
    },
    {
      date:"2024-10-01",
      item:"Hello",
      price:"200"
    },
    {
        date:"2024-10-01",
        item:"Coke",
        price:"4000"
    },
    {
        date:"2024-10-02",
        item:"Cake",
        price:"2000"
    },
    {
      date:"2024-10-02",
      item:"Cake",
      price:"2000"
  },
  {
    date:"2024-10-02",
    item:"Cake",
    price:"2000"
},
]


const [groupedByDate, setGroupedByDate] = useState({});

function userFetch(){
  console.log("Function working.");
  userDetailsData();
}
useEffect(()=>{
  userFetch(); 
},[]);

console.log(userData);
useEffect(() => {
  // Grouping the dummydata by date and calculating total price
  const groupDataByDate = dummydata.reduce((acc, ele) => {
    const { date, item, price } = ele;
    if (acc[date]) {
      acc[date].items.push({ item, price });
      acc[date].total += parseFloat(price);
    } else {
      acc[date] = {
        items: [{ item, price }],
        total: parseFloat(price),
      };
    }
    return acc;
  }, {});

  setGroupedByDate(groupDataByDate);
}, []);

console.log(groupedByDate);

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
        
        <div className="grid grid-cols-4">
          {Object.keys(groupedByDate).map((date) => (
            <div key={date} className="mb-4 border p-3 text-black m-2 bg-slate-300">
              <h3 className="font-bold mb-2 text-orange-600">{date}</h3>
              <ul>
                {groupedByDate[date].items.map((ele, index) => (
                  <li key={index} className="mb-1">
                    {ele.item} - ₹{ele.price}
                    
                  </li>
                  
                ))}
              </ul>
              <p className="text-green-600 font-semibold">Total = {groupedByDate[date].total}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
export default Home