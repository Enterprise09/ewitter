import React from "react";

const Eweet = ({ eweetObj, isOwner }) => (
  <div key={eweetObj.id}>
    <h4> {eweetObj.text} </h4>
    {isOwner && (
      <>
        <button>Delete Eweet</button>
        <button>Edit Eweet</button>
      </>
    )}
  </div>
);

export default Eweet;
