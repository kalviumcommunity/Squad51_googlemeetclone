import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

function DoorList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });

      const response = await fetch("http://localhost:3000/getallusers",  { headers: header });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("res", result);
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      <nav style={{ background: "#333", padding: "10px", textAlign: "center" }}>
        <button style={{ marginRight: "10px", background: "#4CAF50", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}>Sign In</button>
        <button style={{ background: "#008CBA", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}>Sign Up</button>
      </nav>

      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Last Name</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Video Title</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Links</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ border: "1px solid #ddd" }}>
              <td style={{ padding: "8px",textAlign:"center" }}>{item.id}</td>
              <td style={{ padding: "8px",textAlign:"center" }}>{item.name}</td>
              <td style={{ padding: "8px",textAlign:"center" }}>{item.lastname}</td>
              <td style={{ padding: "8px",textAlign:"center" }}>{item.Title}</td>
              <td style={{ padding: "8px",textAlign:"center" }}><a target="blank" href={item.Link}>{item.Link}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/Add'><button>Add</button></Link>
    </div>
  );
}

export default DoorList;