import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';

const LoginButton = (props) => {

  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  }

  return <Button type='primary' onClick={handleLogin}>Log In</Button>;
};

export default LoginButton;