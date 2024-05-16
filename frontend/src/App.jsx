import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import Dashboard from "./pages/dashboard";
import Compatibility from "./pages/compatibility";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { EspDataProvider } from "./pages/EspDataContext";

function App() {

  const [user,setUser] = useState();
  useEffect(()=> {
    auth.onAuthStateChanged((user)=> {
      setUser(user);
    })
  })

  return (
    <>
      <BrowserRouter>
      <EspDataProvider>
      <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path='/login' element={ user ? <Navigate to="/dashboard"/> : <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/compatiblity' element={<Compatibility />}></Route>
      </Route>
      </Routes>
      <ToastContainer/>
      </div>
      </EspDataProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
