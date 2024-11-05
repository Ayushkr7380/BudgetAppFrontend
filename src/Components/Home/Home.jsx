import { useContext, useEffect, useState } from "react";
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

const Home = () => {
  const context = useContext(CreateDataContext);
  const authContext = useContext(CreateAuthContext);

  const {
    handleChange,
    submitExpenditureDetails,
    expenditureDetails,
    expenditureData,
    fetchExpenditureData ,
    deleteItem
  } = context;

  const { userDetailsData } = authContext;

  const [groupedByMonth, setGroupedByMonth] = useState({});

  // Fetch user and expenditure data on component mount
  useEffect(() => {
    userDetailsData();
    fetchExpenditureData();
  }, []);

  // Group expenditures by month and calculate daily and monthly totals
  useEffect(() => {
    const groupDataByMonth = expenditureData.reduce((acc, { ExpenditureDate, ExpenditureName, ExpenditureAmount ,_id}) => {
      const [day, month, year] = ExpenditureDate.split("-");
      const monthYear = `${new Date(year, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { days: {}, monthlyTotal: 0 };
      }

      // Add daily entries
      if (!acc[monthYear].days[ExpenditureDate]) {
        acc[monthYear].days[ExpenditureDate] = { items: [], dailyTotal: 0 };
      }

      acc[monthYear].days[ExpenditureDate].items.push({ ExpenditureName, ExpenditureAmount ,_id});
      acc[monthYear].days[ExpenditureDate].dailyTotal += parseFloat(ExpenditureAmount);
      acc[monthYear].monthlyTotal += parseFloat(ExpenditureAmount);

      return acc;
    }, {});

    // Sort by month and day
    const sortedGroupedData = Object.keys(groupDataByMonth)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, key) => {
        acc[key] = groupDataByMonth[key];
        return acc;
      }, {});

    setGroupedByMonth(sortedGroupedData);
  }, [expenditureData]);
// console.log('dataaaa',groupedByMonth);

const handleDeleteItem = (itemId) =>{
  console.log("delete item id : ",itemId);
  deleteItem(itemId);
}

const handleEditItem = (itemId) =>{
  console.log("edit item id : ",itemId);
}

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-2xl font-semibold underline">Write your daily expenditure here</h2>
      
      <div className="flex flex-col m-2 border-2 border-white min-h-40 justify-center px-2 py-1 rounded-md ">                        
        <input
          type="text"
          className="border-2 border-black px-2 py-1 my-1 outline-none text-black rounded-md"
          placeholder="Expenditure Name"
          onChange={handleChange}
          name="ExpenditureName"
          value={expenditureDetails.ExpenditureName}
        />
        <input
          type="text"
          className="border-2 border-black outline-none px-2 py-1 my-1 text-black rounded-md"
          placeholder="Expenditure Amount"
          onChange={handleChange}
          name="ExpenditureAmount"
          value={expenditureDetails.ExpenditureAmount}
        />   
        <input
          type="date"
          onChange={handleChange}
          name="ExpenditureDate"
          className="text-black rounded-md my-1 px-2"
          value={expenditureDetails.ExpenditureDate}
        />        
      </div>
      
      <button
        className="border-white border-2 px-3 py-1 rounded-md font-bold hover:bg-white hover:text-black"
        onClick={submitExpenditureDetails}
      >
        Add
      </button>
      
      <div className="mt-4">
        {Object.keys(groupedByMonth).map((monthYear) => (
          <div key={monthYear} className="mb-6 mx-4">
            <h3 className="font-bold text-lg text-center text-black mb-2 bg-gray-200 p-2 rounded-md">
              {monthYear} - Total: ₹{groupedByMonth[monthYear].monthlyTotal.toFixed(2)}
            </h3>
            <div className="bg-white shadow rounded-md p-4 text-black">
              {Object.keys(groupedByMonth[monthYear].days).map((date) => (
                <div key={date} className="flex flex-col items-center justify-center border-b py-2">
                  
                  <div className=" flex items-center text-black font-bold mb-2">
                  <span>
                    {date}
                  </span>
                  <span className="text-green-600 text-3xl cursor-pointer ml-6"><IoAddCircleOutline />
                  </span>
                  </div>
                  <div className="flex flex-col">
                    {groupedByMonth[monthYear].days[date].items.map((item, index) => (
                      <div key={index} className="flex justify-between mb-1 mx-1">
                        <span>{item.ExpenditureName} - ₹{item.ExpenditureAmount}</span>
                        {/* <span>{item._id}</span> */}
                        <div className="flex items-center justify-end">
                          <p className="text-green-600 mx-1 px-1 text-xl cursor-pointer" onClick={()=>handleEditItem(item._id)}><FaEdit /></p>
                          <p className="text-red-600 mx-1 px-1 text-xl cursor-pointer" onClick={()=>handleDeleteItem(item._id)}><MdDelete /></p>
                        </div>
                      </div>
                    ))}
                    <div className="text-right font-bold mt-2">
                      Day Total: ₹{groupedByMonth[monthYear].days[date].dailyTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
