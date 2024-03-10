import { useNavigate } from "react-router-dom";

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
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'rgba(0, 0, 3, 0.35) 0px 5px 15px' }}>
      <h1 style={{ color: 'red', marginBottom: '20px', fontSize: '2rem' }}>Logout</h1>
      <button
        onClick={signOut}
        style={{
          background: 'limegreen',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background 0.3s, transform 0.3s',
          animation: 'bounce 0.5s ease-out',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Log Out
      </button>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Logout;



