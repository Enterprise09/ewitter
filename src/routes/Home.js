import Eweet from "components/Eweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [eweet, setEweet] = useState("");
  const [eweets, setEweets] = useState([]);
  useEffect(() => {
    dbService.collection("eweets").onSnapshot((snapshot) => {
      const eweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEweets(eweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("eweets").add({
      text: eweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setEweet("");
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
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={eweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="EWeet" />
      </form>
      <div>
        {eweets.map((eweet) => (
          <Eweet
            key={eweet.id}
            eweetObj={eweet}
            isOwner={eweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
