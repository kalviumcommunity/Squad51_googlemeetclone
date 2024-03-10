import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const updateContainerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const labelStyle = {
  color: '#555',
  fontSize: '14px',
  fontFamily: 'cursive',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid red',
  borderRadius: '4px',
  boxSizing: 'border-box',
  width: '100%',
  fontSize: '14px',
};

const submitButtonStyle = {
  backgroundColor: 'limegreen',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '16px',
};
const submitButtonStyles = {
  backgroundColor: 'red',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '16px',
};

const headingStyle = {
  color: '#333',
  fontSize: '1.8rem',
  marginBottom: '20px',
  fontFamily: 'cursive',
};

function Update() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    email: '',
    Title: '',
    Link: '',
    CreatedBy: '', 
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
      .patch(
        `https://squad51-googlemeetclone.onrender.com/updateuser/${formData.id}`,
        {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          Title: formData.Title,
          Link: formData.Link,
          CreatedBy: formData.CreatedBy, 
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        alert('Update successful');
      })
      .catch((err) => console.log(err));

    console.log('Updated Data:', formData);
  };

  return (
    <div style={updateContainerStyle}>
      <h2 style={headingStyle}>Update Form</h2>
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
        <label style={labelStyle}>
          Created By:
          <input type="text" name="CreatedBy" value={formData.CreatedBy} onChange={handleChange} style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>
          Update
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

export default Update;
