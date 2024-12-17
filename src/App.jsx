import { useState } from "react";
import axios from "axios";
import { encryptPayload } from "./crypto";

function App() {
  const [userData, setUserData] = useState({});

  const secretKey =
    "cc8c82f863ebef860de235244fa77d283e25d97f17ea036242d3237b39e3dbfe";

  const onSubmitHandler = async () => {
    if (!userData?.email || !userData?.name) {
      alert("Email and Name are required.");
      return;
    }

    const encryptedPayload = encryptPayload(userData, secretKey);

    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        data: encryptedPayload,
      });

      alert(JSON.stringify(response?.data));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          style={{ maxWidth: "250px", padding: "5px", borderRadius: "20px" }}
          value={userData?.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          style={{ maxWidth: "250px", padding: "5px", borderRadius: "20px" }}
          value={userData?.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <button
        style={{ width: "100px", padding: "5px", borderRadius: "20px" }}
        onClick={onSubmitHandler}
      >
        Send Data
      </button>
    </div>
  );
}

export default App;
