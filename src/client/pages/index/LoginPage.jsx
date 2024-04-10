import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import backgroundImage from '../../assets/UYUBg.jpg'; // Adjust the path to your image
import Cookies from "js-cookie";
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const redir = useNavigate();

  const handleLogin = async () => {
    const resp = await fetch("/auth/login", {method : "POST", headers : {
      "Content-Type": "application/json"
    }, body : JSON.stringify({username : username, password : password}), credentials : 'same-origin'})
    const json = await resp.json()
    localStorage.setItem('user',json.name)
    localStorage.setItem("id" , json.id)
    if (resp.ok) {
      if (Cookies.get("role") == "admin"){
        redir("/admin")
      } else {
        redir("/user")
      }
    } else {
      setShowBanner(true);
      console.log("wrong login info")
      
    }

  };

  return (
    // <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url(../../assets/UYUBg.jpg)"}}>
    <div className="flex items-center justify-center w-screen h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className="p-10 bg-[#444444] rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"> 
        <h2 className="text-white text-2xl mb-6">Silakan masuk ke akun Anda</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded border border-gray-200"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 mb-6 rounded border border-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {showBanner && (
        <div className="mt-2 mb-8 px-4 py-2 text-white bg-red-500 rounded">
          Username atau password salah!
        </div>
      )}
        <button
          className="w-full p-2 bg-[#D2154E] text-white rounded"
          onClick={handleLogin}
        >
          Masuk
        </button>

      </div>
    </div>
  );
}

export default LoginPage;
