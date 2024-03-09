import React, { useState } from 'react';
import axios from "axios";

const updateContainerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const labelStyle = {
  color: '#555',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const submitButtonStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

function Update() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    email: '',
    Title: '',
    Link: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}

  const token = getCookie('token')

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch(`https://squad51-googlemeetclone.onrender.com/updateuser/${formData.id}`,{name:formData.name,lastname:formData.lastname,email:formData.email,Title:formData.Title,Link:formData.Link},{headers:{authorization:`Bearer ${token}`}})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))

    console.log('Updated Data:', formData);
  };

  return (
    <div style={updateContainerStyle}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '1.5rem', marginBottom: '20px' }}>Update Form</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          ID:
          <input type="text" name="id" value={formData.id} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Lastname:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Video Title:
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Links:
          <input type="text" name="Link" value={formData.Link} onChange={handleChange} style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
