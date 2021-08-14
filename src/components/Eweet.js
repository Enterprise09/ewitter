import {
  faBackspace,
  faClosedCaptioning,
  faEdit,
  faTrash,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import "../css/Eweet.css";

const Eweet = ({ eweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newEweet, setNewEweet] = useState(eweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this eweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`eweets/${eweetObj.id}`).delete();
      await storageService.refFromURL(eweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(eweetObj, newEweet);
    await dbService.doc(`eweets/${eweetObj.id}`).update({
      text: newEweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewEweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <div className="eweet_form_container">
                <form className="eweet_edit_form" onSubmit={onSubmit}>
                  <input
                    className="eweet_edit_textInput"
                    onChange={onChange}
                    type="text"
                    placeholder="Edit you eweet"
                    value={newEweet}
                    required
                  />
                  <div className="edit_btns">
                    <input
                      className="eweetForm_submit"
                      type="submit"
                      value="&rarr;"
                    />
                    <button
                      className="eweetForm_cancel"
                      onClick={toggleEditing}
                    >
                      <FontAwesomeIcon icon={faWindowClose} color="grey" />
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="eweet_boxs">
            <div className="eweet_box">
              <span className="eweet_text">{eweetObj.text}</span>
              {eweetObj.attachmentUrl ? (
                <img
                  className="eweet_img"
                  src={eweetObj.attachmentUrl}
                  width="50px"
                  height="50px"
                />
              ) : (
                <img
                  className="eweet_img"
                  src={eweetObj.attachmentUrl}
                  width="50px"
                  height="50px"
                  style={{ visibility: "hidden" }}
                />
              )}
              {isOwner && (
                <>
                  <div className="iconBtn_box">
                    <button className="eweet_iconBtn" onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} color="grey" />
                    </button>
                    <button className="eweet_iconBtn" onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faEdit} color="grey" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Eweet;
