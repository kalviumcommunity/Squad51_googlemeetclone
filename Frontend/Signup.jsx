import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signupp() {
  const [username, setUserName] = useState(getCookie('username'));
  const [password, setPassword] = useState(getCookie('password'));
  const [buttonClicked, setButtonClicked] = useState(false);
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
    setButtonClicked(true); 
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '2px', textAlign: 'center' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'red', fontFamily: "cursive", marginBottom: '18vw' }}>Signup</h1>
        </Link>
      </div>
      <div style={{ backgroundColor: '#f0f0f0', padding: '30px', boxShadow: '0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3)', textAlign: 'center', width: '300px', marginBottom: '20px' }}>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{fontFamily:'cursive'}}>User Name:</label>
            <input type='text' onChange={(e) => setUserName(e.target.value)} style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{fontFamily:'cursive'}}>Password:</label>
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
        <button style={{ marginTop: '1em', padding: '0.6em 1.0em', width: '7em', fontSize: '1.2em', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(0, 0, 255, 0.8), 0 0 20px rgba(0, 0, 255, 0.5)' }}><Link to='/login' style={{ textDecoration: 'none', color: 'white', fontSize: '16px', textAlign: 'center' }}>
          Login
        </Link></button>
      </div>
    </div>
  );
}

export default Signupp;





