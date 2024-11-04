import { useContext, useEffect, useState } from "react";
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  const context = useContext(CreateDataContext);
  const authContext = useContext(CreateAuthContext);

  const {
    handleChange,
    submitExpenditureDetails,
    expenditureDetails,
    expenditureData,
    fetchExpenditureData
  } = context;

  const { userDetailsData } = authContext;

  const [groupedByDate, setGroupedByDate] = useState({});

  // Fetch user and expenditure data on component mount
  useEffect(() => {
    userDetailsData();
    fetchExpenditureData();
  }, []);

  // Group expenditures by date and calculate total for each date
  useEffect(() => {
    const groupDataByDate = expenditureData.reduce((acc, { ExpenditureDate, ExpenditureName, ExpenditureAmount }) => {
      if (acc[ExpenditureDate]) {
        acc[ExpenditureDate].items.push({ ExpenditureName, ExpenditureAmount });
        acc[ExpenditureDate].total += parseFloat(ExpenditureAmount);
      } else {
        acc[ExpenditureDate] = {
          items: [{ ExpenditureName, ExpenditureAmount }],
          total: parseFloat(ExpenditureAmount),
        };
      }
      return acc;
    }, {});

    // Sort the grouped data by date in ascending order
    const sortedGroupedData = Object.keys(groupDataByDate)
      .sort((a, b) => new Date(a.split('-').reverse().join('-')) - new Date(b.split('-').reverse().join('-')))
      .reduce((acc, key) => {
        acc[key] = groupDataByDate[key];
        return acc;
      }, {});

    setGroupedByDate(sortedGroupedData);
  }, [expenditureData]);

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
      
      <div className="grid md:grid-cols-4 mt-4 grid-cols-2">
        {Object.keys(groupedByDate).map((date) => (
          <div key={date} className="mb-4 border p-3 text-black m-2 bg-slate-300 rounded-md">
            <div className="flex justify-end md:text-xl mb-3">
              <p className="text-green-600 mx-1 px-1"><FaEdit /></p>
              <p className="text-red-600  mx-1 px-1"><MdDelete /></p>
            </div>
            <h3 className="font-bold mb-2 text-black">{date}</h3>
            <ul>
              {groupedByDate[date].items.map((item, index) => (
                <li key={index} className="mb-1">
                  {item.ExpenditureName} - ₹{item.ExpenditureAmount}
                </li>
              ))}
            </ul>
            <p className="text-black font-bold text-md">
              Total = ₹{groupedByDate[date].total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
