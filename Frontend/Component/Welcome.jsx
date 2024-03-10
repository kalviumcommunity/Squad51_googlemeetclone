import {Link} from 'react-router-dom'

function WelcomeUser() {
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    if(getCookie('username')!=undefined) {return(
        <>
        <h3 style={{fontFamily:'cursive',color:'white',}}>Welcome {getCookie('username')}</h3>
        <Link to="/logout"><button style={{backgroundColor:'limegreen',color:'white',padding:'8px'}} id='Navbar-button'>Logout</button></Link>
        </>)}
    
      else{return(
        <Link to="/login">
        <button
          style={{
            backgroundColor: 'limegreen',
            color: 'white',
            padding: '12px', 
            width: '150px', 
            border: 'none',
            cursor: 'pointer',
            borderRadius:'5px',
            transition: 'background-color 0.3s ease', 
          }}
          id='Navbar-button'
        >
          Login
        </button>
      </Link>
      )}}



export default WelcomeUser