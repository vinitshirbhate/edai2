import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Main } from "./pages/main";
import Dashboard from "./pages/dashboard";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import Compatibility from "./pages/compatibility";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { EspDataProvider } from "./pages/EspDataContext";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <img src="../assets/WeatherIcons.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <EspDataProvider>
        <div className="p-4 h-screen flex items-center justify-center">
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={user ? <Main /> : <Navigate to="/login" />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compatibility" element={<Compatibility />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </EspDataProvider>
    </BrowserRouter>
  );
}

export default App;
