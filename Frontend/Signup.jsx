import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signupp() {
  const [username, setUserName] = useState(getCookie('username'));
  const [password, setPassword] = useState(getCookie('password'));
  const [buttonClicked, setButtonClicked] = useState(false); // State for button animation
  const navigate = useNavigate();

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }

  const submit = (e) => {
    e.preventDefault();
    setButtonClicked(true); // Trigger button animation
    axios
      .post('https://squad51-googlemeetclone.onrender.com/signup', {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setCookie('token', response.data.accessToken, 365);
        setCookie('username', username, 365);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'blue', fontFamily:"cursive" }}>Signup</h1>
        </Link>
      </div>
      <div style={{ backgroundColor: '#f0f0f0', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '300px' }}>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '20px' }}>
            <label>User Name:</label>
            <input type='text' onChange={(e) => setUserName(e.target.value)} style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password:</label>
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <button
            type='submit'
            onClick={submit}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
              padding: '15px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '18px',
              transition: 'background 0.3s',
            }}
          >
            {buttonClicked ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <button style={{marginTop:"2vw", padding:"10px",width:"7vw"}}><Link to='/login' style={{ textDecoration: 'none', color: 'blue', marginTop: '20px', fontSize: '16px' }}>
          Login
        </Link></button>
      </div>
    </div>
  );
}

export default Signupp;



