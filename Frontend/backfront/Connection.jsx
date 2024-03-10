import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import WelcomeUser from "../Component/Welcome";

function DoorList() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchData = async () => {
    try {
      const token = getCookie('token');
      const response = await axios.get("https://squad51-googlemeetclone.onrender.com/getallusers", { headers: { authorization: `Bearer ${token}` } });
      setData(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const filteredData = data.filter((item)=>{
    if(filter === "All"){
      return item
    }
    else if(item.CreatedBy.includes(filter)){
      return item
    }
  })

  const handleDelete = (id) => {
    const token = getCookie('token');
    axios.delete(`https://squad51-googlemeetclone.onrender.com/deleteuser/${id}`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <nav style={{ background: "red", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{padding: '10px',borderRadius: '8px',overflow: 'hidden',boxShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',transition: 'box-shadow 0.5s ease-in-out',}}><p style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>Link Locker</p></div>
        <div  style={{ textAlign: 'center',marginRight:'43vw' }}>
          <WelcomeUser />
        </div>
      </nav>

      {isLoggedIn ? (
        <>
          <div>
            <p style={{textAlign:'center'}}> Created By :   </p>
            <select style={{marginLeft:'47vw'}} name="createdBy" id="CreatedBy" onChange={(e) => { setFilter(e.target.value) }}>
              <option value="All">All</option>
              <option value="venkat">venkat</option>
              <option value="raman">raman</option>
              <option value="sudhan">sudhan</option>
              <option value="jhon">jhon</option>
            </select>
          </div>
          <div style={{ overflowX: "auto",boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'  }}>
            <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px"}}>
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>ID</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>Name</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>Last Name</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>Video Title</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>CreatedBy</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>Links</th>
                  <th style={{ fontWeight: "bold", border: "1px solid #ddd", padding: "8px",fontFamily:'cursive',backgroundColor:'red',color:'white'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} style={{ border: "1px solid #ddd" }}>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>{item.id}</td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>{item.name}</td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>{item.lastname}</td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>{item.Title}</td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>{item.CreatedBy}</td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}><a target="_blank" rel="noopener noreferrer" href={item.Link}>{item.Link}</a></td>
                    <td style={{ padding: "8px", textAlign: "center",fontFamily:'monospace',backgroundColor:'limegreen',color:'white' }}>
                      <Link to={`/update/${item._id}`}><button style={{ marginRight: '5px',background:'pink'}}>Update</button></Link>
                      <button style={{background:'lightblue'}} onClick={(e) => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <div id="login" style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(33, 150, 243, 0.7)", overflow: "hidden", width: "800px", maxWidth: "100%", textAlign: "center", padding: "80px", transition: "transform 0.3s", cursor: "pointer", }} onClick={() => alert("Box Clicked!")}>
            <p style={{ color: "#333", fontSize: "3rem", fontFamily: 'fantasy' }}>Please Signup to continue</p>
          </div>
          <style>
            {`
          #login:hover {
            transform: scale(1.05);
          }
        `}
          </style>
        </div>
      )}
      {isLoggedIn && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2vw", marginLeft: '5px' }}>
          <Link to='/Add'><button style={{ padding: "10px", backgroundColor: "red", borderRadius: '5px', width: '15vw', border: "none", }}>Add</button></Link>
        </div>
      )}
    </div>
  );
}

export default DoorList;
