import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  fontFamily: 'cursive',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  color: '#555',
  fontFamily: 'cursive',
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
  backgroundColor: 'limegreen',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const submitButtonStyles = {
  backgroundColor: 'red',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '20px',
};

function Add() {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    lastname: '',
    Title: '',
    Link: '',
    CreatedBy: '',
    email: '', // New email field
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

  const token = getCookie('token');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://squad51-googlemeetclone.onrender.com/adduser", {
        id: formData.id,
        name: formData.name,
        lastname: formData.lastname,
        Title: formData.Title,
        Link: formData.Link,
        CreatedBy: formData.CreatedBy,
        email: formData.email, // Include email in the request
      }, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log("res", result);
        alert('Data added successfully!');
      })
      .catch((err) => {
        console.log(err);
        alert('Error adding data. Please try again.');
      });

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
        <label style={labelStyle}>
          Created By:
          <input type="text" name="CreatedBy" value={formData.CreatedBy} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
        <Link to='/'>
          <button type="submit" style={submitButtonStyles}>
            Go back
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Add;


