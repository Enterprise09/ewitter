import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      <>
        {init ? (
          <AppRouter isLoggedIn={userObj} userObj={userObj} />
        ) : (
          "Initializing . . . "
        )}
      </>
    </div>
  );
}

export default App;
