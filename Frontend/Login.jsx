import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [userName, setUserName] = useState(getCookie('username'));
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
      .post('https://squad51-googlemeetclone.onrender.com/login', {
        username: userName,
        password: password,
      })
      .then((response) => {
        setCookie('token', response.data.accessToken, 365);
        setCookie('username', userName, 365);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div id='Body' style={{ background: 'white' }}>
        <div id='Navbar'>
          <div id='Navbar-left' style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: 'cursive', textAlign: 'center',color:'red' }}>Login</h1>
          </div>
        </div>
        <div
          id='Body-content'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <div
            id='form'
            style={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3)'
            }}
          >
            <form onSubmit={submit} >
              <div className='space-around' style={{ marginBottom: '20px' }}>
                <label style={{fontFamily:'cursive'}}>User Name:</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div className='space-around' style={{ marginBottom: '20px' }}>
                <label style={{fontFamily:'cursive'}}>Password:</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type='submit'
                onClick={submit}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '15px 30px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '18px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: buttonClicked ? '0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5)' : 'none',
                  animation: buttonClicked ? 'fadeIn 0.5s' : '',
                }}
              >
                {buttonClicked ? 'Logging In...' : 'Log In'}
              </button>
            </form>
            <button style={{ marginTop: '1em', padding: '0.6em 1.0em', width: '7em', fontSize: '1.2em', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(0, 0, 255, 0.8), 0 0 20px rgba(0, 0, 255, 0.5)' }}>
              <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;




