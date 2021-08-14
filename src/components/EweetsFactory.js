import { faClosedCaptioning } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/EweetsFactory.css";

const EweetFactory = ({ userObj }) => {
  const [eweet, setEweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const eweetObj = {
      text: eweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("eweets").add(eweetObj);
    setEweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <div className="eweetsfactory_container">
      <form className="eweetsfactory_form" onSubmit={onSubmit}>
        <div className="eweets_inputTextBox">
          <input
            className="eweets_input"
            value={eweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind"
            maxLength={120}
          />
          <input className="eweets_submit" type="submit" value="&rarr;" />
        </div>
        <label className="attach_file_label" for="attach-file" value="&rarr;">
          <span>Add photos</span> <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          className="eweets_photoBtn"
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        {attachment && (
          <div className="preview_photo_box">
            <img className="preview_photo" src={attachment} />
            <button className="photo_clearBtn" onClick={onClearAttachment}>
              Clear Photo
              {/* <FontAwesomeIcon icon={faWindowClose} color="grey" /> */}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EweetFactory;
