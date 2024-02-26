import React from 'react'
import data from "./data.json"

function Frontpage() {
  const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '10px',
  };

  const textStyle = {
      margin: '5px 0',
  };

  return (
      <div>
          {data.map((datas, id) => (
              <div key={datas.id} style={containerStyle}>
                  <p style={textStyle}>{datas.id}</p>
                  <p style={textStyle}>{datas.name}</p>
                  <p style={textStyle}>{datas.lastname}</p>
                  <p style={textStyle}>{datas.email}</p>
                  <p style={textStyle}>{datas.Title}</p>
                  <p style={textStyle}>{datas.Link}</p>
              </div>
          ))}
      </div>
  );
}

export default Frontpage