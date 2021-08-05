import { dbService } from "fbase";
import React, { useState } from "react";

const Eweet = ({ eweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newEweet, setNewEweet] = useState(eweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this eweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`eweets/${eweetObj.id}`).delete();
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
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit you eweet"
              value={newEweet}
              required
            />
            <input type="submit" value="Update eweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4> {eweetObj.text} </h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Eweet</button>
              <button onClick={toggleEditing}>Edit Eweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Eweet;
