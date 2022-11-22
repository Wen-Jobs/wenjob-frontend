import { Typography } from 'antd';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import Profile from '../Profile';
import { useAuth0 } from "@auth0/auth0-react";

const { Title } = Typography;

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '3rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
}

const titleStyle = {
  margin: '0',
}

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
}

function Header() {

  const { isAuthenticated } = useAuth0();

  return (
    <header style={headerStyle}>
      <Title level={3} style={titleStyle}>WenJobs</Title>
      <div style={userInfoStyle}>
      <Profile />
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  )
}

export default Header;