import { useContext, useEffect, useState } from "react";
import { CreateDataContext } from "../../Context/DataContext/CreateDataContext";
import { CreateAuthContext } from "../../Context/AuthContext/CreateAuthContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { HiBackspace } from "react-icons/hi2";

const Home = () => {
  const context = useContext(CreateDataContext);
  const authContext = useContext(CreateAuthContext);

  const {
    handleChange,
    submitExpenditureDetails,
    expenditureDetails,
    expenditureData,
    fetchExpenditureData,
    deleteItem,
    editItem,
    
  } = context;

  const { userDetailsData } = authContext;

  const [groupedByMonth, setGroupedByMonth] = useState({});
  const [editData, setEditData] = useState({});
  const [showEditItemOption, setShowEditItemOption] = useState({});

  // Fetch user and expenditure data on component mount
  useEffect(() => {
    userDetailsData();
    fetchExpenditureData();
  }, []);

  // Group expenditures by month and calculate daily and monthly totals
  useEffect(() => {
    const groupDataByMonth = expenditureData.reduce((acc, { ExpenditureDate, ExpenditureName, ExpenditureAmount, _id }) => {
      const [day, month, year] = ExpenditureDate.split("-");
      const monthYear = `${new Date(year, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { days: {}, monthlyTotal: 0 };
      }

      if (!acc[monthYear].days[ExpenditureDate]) {
        acc[monthYear].days[ExpenditureDate] = { items: [], dailyTotal: 0 };
      }

      acc[monthYear].days[ExpenditureDate].items.push({ ExpenditureName, ExpenditureAmount, _id });
      acc[monthYear].days[ExpenditureDate].dailyTotal += parseFloat(ExpenditureAmount);
      acc[monthYear].monthlyTotal += parseFloat(ExpenditureAmount);

      return acc;
    }, {});

    const sortedGroupedData = Object.keys(groupDataByMonth)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, key) => {
        acc[key] = groupDataByMonth[key];
        return acc;
      }, {});

    setGroupedByMonth(sortedGroupedData);
  }, [expenditureData]);

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditItemToggle = (itemId, item) => {
    setShowEditItemOption((prev) => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle edit option for the specific item
    }));
    
  };

  const handleEditButton = (itemId) => {
    editItem(itemId, 
     editData.itemname,
      editData.itemprice,
    );
    setShowEditItemOption((prev) => ({ ...prev, [itemId]: false }));
  };

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
          required
          value={expenditureDetails.ExpenditureName}
        />
        <input
          type="text"
          className="border-2 border-black outline-none px-2 py-1 my-1 text-black rounded-md"
          placeholder="Expenditure Amount"
          onChange={handleChange}
          name="ExpenditureAmount"
          value={expenditureDetails.ExpenditureAmount}
          required
        />
        <input
          type="date"
          onChange={handleChange}
          name="ExpenditureDate"
          className="text-black rounded-md my-1 px-2"
          value={expenditureDetails.ExpenditureDate}
          required
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
            <h3 className="font-bold text-lg text-center text-black mb-2 bg-gray-200 p-1 rounded-md">
              {monthYear} - Total: ₹{groupedByMonth[monthYear].monthlyTotal.toFixed(2)}
            </h3>
            <div className="bg-white shadow rounded-md p-2 text-black grid md:grid-cols-3 grid-cols-2">
              {Object.keys(groupedByMonth[monthYear].days).map((date) => (
                <div key={date} className="flex flex-col items-center justify-center border-b py-2">
                  <div className="flex items-center text-black font-bold mb-2">
                    <span>{date}</span>
                  </div>
                  <div className="flex flex-col">
                    {groupedByMonth[monthYear].days[date].items.map((item) => (
                      <div key={item._id} className="flex justify-between mb-1 mx-1 items-center">
                        {showEditItemOption[item._id] ? (
                          <div className="border-2 border-black m-1 flex items-center rounded-md">
                            <input
                              type="text"
                              className="w-[5rem] p-1 outline-none"
                              placeholder="Name"
                              name="itemname"
                              onChange={handleEditChange}
                              value={editData.itemname}
                              required
                            />
                            <input
                              type="text"
                              className="w-[2.4rem] p-1 outline-none"
                              placeholder="₹"
                              name="itemprice"
                              onChange={handleEditChange}
                              value={editData.itemprice}
                              required
                            />
                            <span
                              className="text-2xl text-red-600 mx-1 cursor-pointer"
                              onClick={() => handleEditItemToggle(item._id)}
                            >
                              <HiBackspace />
                            </span>
                            <span
                              className="text-2xl text-green-600 mx-1 cursor-pointer"
                              onClick={() => handleEditButton(item._id)}
                            >
                              <TiTick />
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="">{item.ExpenditureName} - ₹{item.ExpenditureAmount}</span>
                            <div className="flex items-center justify-end">
                              <p
                                className="text-green-600 mx-1 px-1 text-xl cursor-pointer"
                                onClick={() => handleEditItemToggle(item._id, item)}
                              >
                                <FaEdit />
                              </p>
                              <p
                                className="text-red-600 mx-1 px-1 text-xl cursor-pointer"
                                onClick={() => handleDeleteItem(item._id)}
                              >
                                <MdDelete />
                              </p>
                            </div>
                          </>
                        )}
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
