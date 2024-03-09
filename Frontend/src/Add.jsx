import React, { useState } from 'react';
import axios from 'axios'


const addContainerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const addTitleStyle = {
  textAlign: 'center',
  color: '#333',
  fontSize: '1.5rem',
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
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

function Add() {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    lastname: '',
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
    console.log("gg", formData.id)
    axios.post("http://localhost:3000/adduser",{id : formData.id,name:formData.name,lastname:formData.lastname,Title:formData.Title,Link:formData.Link},{headers:{authorization:`Bearer ${token}`}})
    .then(result=>console.log("res", result))
    .catch(err=>console.log(err))

    console.log(formData);
  };

  return (
    <div style={addContainerStyle}>
      <h2 style={addTitleStyle}>Add Form</h2>
      <form onSubmit={handleSubmit}>
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
          Video Title:
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Links:
          <input type="text" name="Link" value={formData.Link} onChange={handleChange} style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
