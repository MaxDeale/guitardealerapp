import React, { useEffect, useState } from "react";
import Axios from "axios";

function HistoryPage() {
  const [History, setHistory] = useState([]);
  //using hook to retreive specific users history then setting values to state using hook
  useEffect(() => {
    Axios.get("/api/users/getHistory").then((response) => {
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        alert("There was an error fetching the user history");
      }
    });
  }, []);

  return (
    <div style={{ width: "80%", margin: "8rem auto " }}>
      <div
        style={{
          textAlign: "center",
          fontFamily: "pacifico",
          fontSize: "1.5rem",
        }}
      >
        <h1>History</h1>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {History.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentId}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.dateOfPurchase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
