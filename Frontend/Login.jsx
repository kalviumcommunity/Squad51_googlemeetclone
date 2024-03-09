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
      .post('http://localhost:3000/login', {
        name: userName,
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
      <div id='Body'>
        <div id='Navbar'>
          <div id='Navbar-left' style={{display:"flex",justifyContent:"center"}}>
            <h1 style={{fontFamily:"cursive", textAlign:"center"}}>Login</h1>
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
            }}
          >
            <form onSubmit={submit}>
              <div className='space-around' style={{ marginBottom: '20px' }}>
                <label>User Name : </label>
                <input
                  type='text'
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div className='space-around' style={{ marginBottom: '20px' }}>
                <label>Password : </label>
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
                  animation: buttonClicked ? 'fadeIn 0.5s' : '',
                }}
              >
                {buttonClicked ? 'Logging In...' : 'Log In'}
              </button>
            </form>
            <button style={{marginTop:"2vw", padding:"15px",width:"8vw"}}><Link to='/signup' style={{ textDecoration: 'none', color: 'blue', marginTop: '20px', fontSize: '16px' }}>
              SignUp
            </Link></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
