import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [eweet, setEweet] = useState("");
  const [eweets, setEweets] = useState([]);
  const getEweets = async () => {
    const dbEweets = await dbService.collection("nweets").get();
    dbEweets.forEach((document) => {
      const eweetObject = {
        ...document.data(),
        id: document.id,
      };
      setEweets((prev) => [eweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getEweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      eweet,
      createAt: Date.now(),
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
            <h4> {eweet.eweet} </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
