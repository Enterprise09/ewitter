import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Profile.css";

export default ({ refreshUser, userObj }) => {
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
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form className="profile_form" onSubmit={onSubmit}>
        <input
          className="profile_input_text"
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input
          className="profile_input_submit"
          type="submit"
          value="Update Profile"
        />
        <div className="solid_line" />
        <button className="profile_logoutBtn" onClick={onLogOutClick}>
          Log Out
        </button>
      </form>
    </>
  );
};
