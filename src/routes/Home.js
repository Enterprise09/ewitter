import Eweet from "components/Eweet";
import EweetFactory from "components/EweetsFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
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
  return (
    <div>
      <EweetFactory userObj={userObj} />
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
