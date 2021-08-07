import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); //redirect to home
  };
  const getMyEwwets = async () => {
    const eweets = await dbService
      .collection("eweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();
    console.log(eweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyEwwets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
