import { useAuth0 } from "@auth0/auth0-react";

const profileStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  // backgroundColor: '#333',
}

const imgStyle = {
  borderRadius: '50%',
  height: '40px',
  marginLeft: '1rem',
}

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={profileStyle}>
        <img src={user.picture} alt={user.name} style={imgStyle}/>
      </div>
    )
  );
};

export default Profile;
