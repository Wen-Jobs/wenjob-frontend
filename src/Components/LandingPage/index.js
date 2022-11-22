import { Typography, Image } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';

const { Title, Text } = Typography;

const heroSection = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '2rem',
}

const heroTextStyle = {
  width: '30rem',
  marginLeft: '5rem',
  height: 'fit-content',
  padding: '1rem',
}

const titleStyle = {
  marginTop: '0',
  fontSize: '4rem',
}

const textStyle = {
  fontSize: '1.25rem',
}

const optionStyle = {
  marginLeft: '6rem',
}

const optionItemStyle = {
  color: '#1890ff',
  margin: '.5rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem',
}

function LandingPage() {

  const { isAuthenticated } = useAuth0();

  return (
    <div style={heroSection}>
      <div>
        <div style={heroTextStyle}>
          <Title level={1} style={titleStyle}>Your Job Search. Optimized.</Title>
          <Text style={textStyle}>WenJobs gives you the tools to find in-network Web3 opportunities and identify the connections that can help you land your next role.</Text>
        </div>
        { 
        isAuthenticated ?
        <div style={optionStyle}>
          <Text>Search By:</Text>
          <Button type='text' style={optionItemStyle}>Connections</Button>
          <Button type='text' style={optionItemStyle}>Roles</Button>
          <Button type='text' style={optionItemStyle}>Companies</Button>
        </div> :
        null
        }
      </div>
      <Image
        width={700}
        src='https://img.freepik.com/free-vector/successful-partnership-negotiation-partners-handshaking_335657-2453.jpg?w=740&t=st=1669081435~exp=1669082035~hmac=8059dd027dd3c834df7a452354f321fc5246ad57438168f79ce47c195da8079c'
        preview={false}
      />
    </div>
  )
}

export default LandingPage;