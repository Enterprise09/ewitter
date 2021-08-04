import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [eweet, setEweet] = useState("");
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
    </div>
  );
};

export default Home;
