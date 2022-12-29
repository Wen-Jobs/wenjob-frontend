import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import db from '../Firebase/FirebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { setConnectionsData } from '../../Store/slices/connections';


const LogoutButton = () => {

  const { logout, user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  const readConnectionsData = async () => {

    const docRef = doc(db, "users", user.email);
    let docSnap = await getDoc(docRef);
    let data;

    if (docSnap.exists()) {
      data = docSnap.data().connections
    } else {
      // doc.data() will be undefined in this case
      let docSnap = await getDoc(docRef);
      data = docSnap.data().connections
      console.log("No such document!");
    }

    console.log(data)
    dispatch(setConnectionsData(data));
  }

  useEffect(() => {
    if (isAuthenticated) {
      readConnectionsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])


  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;