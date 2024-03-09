import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import WelcomeUser from "../Component/Welcome";

function DoorList() {
  const [data, setData] = useState([]);
  const [filter,setFilter]=useState("All")
  const [newData, setnewData] = useState(null)
  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}

  const token = getCookie('token')
  const fetchData = async () => {
    try {
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });

      const response = await fetch("https://squad51-googlemeetclone.onrender.com/getallusers", {headers:{authorization:`Bearer ${token}`}});
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
  useEffect(() => {
    const filteredData = data.filter(item => filter === "All" ? true : item["CreatedBy "] == filter )
    setnewData(filteredData)
  }, [filter])

  
  const handleUpdate = (userId) => {
    console.log("Update user with ID:", userId);
  };
  const filteredData = data.filter((item)=>{
    if(filter === "All"){
      return item
    }
    else if(item["CreatedBy "].includes(filter)){
      return item
    }
  })


const handleDelete = (id) => {
  axios.delete(`https://squad51-googlemeetclone.onrender.com/deleteuser/${id}`,{headers:{authorization:`Bearer ${token}`}})
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => console.log(err));
};



const handler=()=>{
  alert('logout')
}

  return (
    <div>
      <nav style={{ background: "#333", padding: "10px", textAlign: "center" }}>
        <div>
          <WelcomeUser></WelcomeUser>
        </div>
      </nav>

      


      {(data.length > 1) ?

      <><div>
      <p> Created By :   </p> 
            <select name="createdBy" id="CreatedBy" onChange={(e)=>{setFilter(e.target.value)}}>
              <option value="All">All</option>
              <option value="venkat">venkat</option>
              <option value="raman">raman</option>
              <option value="sudhan">sudhan</option>
              <option value="jhon">jhon</option>
            </select>
          </div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Last Name</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Video Title</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Links</th>
            <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredData.map((item) => (
            <tr key={item.id} style={{ border: "1px solid #ddd" }}>
              <td style={{ padding: "8px", textAlign: "center" }}>{item.id}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{item.name}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{item.lastname}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{item.Title}</td>
              <td>{item["CreatedBy "]}</td>
              <td style={{ padding: "8px", textAlign: "center" }}><a target="_blank" rel="noopener noreferrer" href={item.Link}>{item.Link}</a></td>
              <td style={{ padding: "8px", textAlign: "center" }}>
                <Link to={`/update/${item._id}`}><button style={{ marginRight: '5px' }}>Update</button></Link>
                <button onClick={(e) => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></>
      :<div id='Body-content'>
      <div id="login">
      <h1>Please Login To Continue</h1>
      </div>
    </div>
}
      <div style={{display:"flex", justifyContent:"center", marginTop:"2vw",marginLeft:'5px'}}>
        <Link to='/Add'><button style={{ padding:"10px",backgroundColor:"ligthblue",borderRadius:'5px',width:'10vw', border:"none",}}>Add</button></Link>
      </div>
    </div>
  );
}

export default DoorList;
