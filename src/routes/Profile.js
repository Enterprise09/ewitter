import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);
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
    console.log(eweets.docs.map((doc) => doc.value));
  };
  useEffect(() => {
    getMyEwwets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewDisplayName(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
