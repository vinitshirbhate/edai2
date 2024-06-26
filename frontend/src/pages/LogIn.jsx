import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Alert, Button, TextField } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully");
      navigate("/dashboard");
      setAlertMessage("User Login Successful");
      setAlertType("success");
      setIsAlert(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setAlertMessage("Invalid Login Credentials");
      setAlertType("error");
      setIsAlert(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-bg h-4/5 w-4/5 rounded-3xl grid grid-cols-4 bg-black ">
      <div className="p-6 col-span-1 font-md text-2xl text-white text-left flex-grow z-40 hidden md:block">
        Reconnect with your garden. LOGIN NOW!
      </div>
      <>
        <img
          src="../../assets/AuthPage.jpg"
          alt=""
          className="absolute top-2/3 w-1/5 ml-12 h-3/5 transform -translate-y-2/3 place-content-center rounded-xl hidden md:block"
        />
      </>
      <div className="p-6 col-span-3 bg-white rounded-3xl flex flex-col justify-center items-center flex-grow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-14">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center text-black"
        >
          <div className="mb-4 w-1/2">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-left"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>

          <div className="mb-4 w-1/2">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-left"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-left"
            to="/signup"
          >
            Don't have an account? Sign up
          </Link>

          <div className="flex justify-center items-center mt-4">
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #a8e063, #56ab2f)",
                color: "black",
                fontWeight: "bold",
              }}
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>Login</p>
              )}
            </Button>
          </div>

          {isAlert && (
            <Alert
              sx={{
                margin: "10px",
              }}
              severity={alertType}
              onClose={() => {
                setIsAlert(false);
              }}
            >
              {alertMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
