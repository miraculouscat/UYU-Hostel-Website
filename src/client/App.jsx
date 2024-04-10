import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "tailwindcss/tailwind.css"

//components
import LaporanTable from "./components/LaporanTable";

function App() {
  const [userType, setUserType] = useState(null);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  }

  if (userType === null) {
    return (
      <div>
        <button onClick={() => handleUserTypeSelection('admin')}>Admin</button>
        <button onClick={() => handleUserTypeSelection('user')}>User</button>
      </div>
    );
  }

  if (userType === 'admin') {
    return <LaporanTable />;
  }

  if (userType === 'user') {
    return <h1>You are a user</h1>;
  }
}

export default App;
