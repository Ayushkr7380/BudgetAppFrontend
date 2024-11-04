import { useContext, useEffect, useState } from "react";
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";

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
      <h2>Write your daily expenditure here</h2>
      
      <div className="flex flex-col m-2 border-2 border-white min-h-48 p-4">                        
        <input
          type="text"
          className="border-2 border-black p-2 text-black"
          placeholder="Expenditure Name"
          onChange={handleChange}
          name="ExpenditureName"
          value={expenditureDetails.ExpenditureName}
        />
        <input
          type="text"
          className="border-2 border-black p-2 text-black"
          placeholder="Expenditure Amount"
          onChange={handleChange}
          name="ExpenditureAmount"
          value={expenditureDetails.ExpenditureAmount}
        />   
        <input
          type="date"
          onChange={handleChange}
          name="ExpenditureDate"
          className="text-black"
          value={expenditureDetails.ExpenditureDate}
        />        
      </div>
      
      <button
        className="border-white border-2 p-2 rounded-md"
        onClick={submitExpenditureDetails}
      >
        Add
      </button>
      
      <div className="grid grid-cols-4 mt-4">
        {Object.keys(groupedByDate).map((date) => (
          <div key={date} className="mb-4 border p-3 text-black m-2 bg-slate-300 rounded-md">
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
