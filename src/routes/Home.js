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
        <input type="submit" value="EWeet" />
      </form>
      <div>
        {eweets.map((eweet, index) => (
          //<div key={eweet.id} /> //This is not working... Why?
          <div key={eweet.id}>
            <h4> {eweet.text} </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
