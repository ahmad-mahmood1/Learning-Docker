import axios from "axios";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [users, setUsers] = useState(null);
  const fetchActiveUsers = async () => {
    try {
      const users = await axios("/api/activeUsers");
      setUsers(users.data);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Dockerized React</h1>
      <div className="card">
        <button onClick={() => fetchActiveUsers()}>Get DB User</button>
        {users && (
          <>
            <p>{users[0].query}</p>
            <p>
              {users[0].usename} - {users[0].state}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
