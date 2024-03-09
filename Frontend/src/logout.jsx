import { useNavigate, Link } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
      name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  const signOut = () => {
    setCookie('username', '', 0);
    setCookie('token', '', 0);
    navigate('/');
  };

  return (
    <div id='Body' style={{ background: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div id='Navbar' style={{ background: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div id='Navbar-left'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 style={{ margin: 0 }}>gmeetlibrary</h1>
          </Link>
        </div>
        <div></div>
      </div>
      <div id='Body-content' style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Log Out</h1>
        <button
          onClick={signOut}
          style={{
            background: '#e44d26',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.3s',
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Logout;
