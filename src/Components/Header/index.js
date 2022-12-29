import { Typography } from 'antd';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import Profile from '../Profile';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import './Header.css'
const { Title } = Typography;

function Header() {

  const { isAuthenticated } = useAuth0();

  return (
    <header className='header'>
      <Title level={3} className='title'>WenJobs</Title>
      {
        isAuthenticated ?
          <div className='options'>
            <Link className='linkButton' to='/'>Home</Link>
            <Link className='linkButton' to='/Companies'>Companies</Link>
            <Link className='linkButton' to='/Jobs'>Jobs</Link>
            <Link className='linkButton' to='/Connections'>Connections</Link>
          </div> :
          null
      }
      <div className='user-info'>
        <Profile className='profile'/>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  )
}

export default Header;