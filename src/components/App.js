import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser());
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="App">
      <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy; Ewitter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
