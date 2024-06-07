import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Alert, Button, TextField } from "@mui/material";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      setAlertType("error");
      setIsAlert(true);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullname: fullname,
        });
      }
      console.log("User is Registered Successfully");
      setAlertMessage("User Signup Successful");
      setAlertType("success");
      setTimeout(() => {
        setIsAlert(false);
        navigate("/dashboard");
      }, 2000);
      setIsAlert(true);
    } catch (error) {
      console.log(error.message);
      setAlertMessage("Invalid Login Credentials");
      setAlertType("error");
      setIsAlert(true);
    }
  };

  return (
    <div className="signup-bg h-4/5 w-4/5 rounded-3xl grid grid-cols-4 bg-black ">
      <div className=" p-8 col-span-1 font-md text-2xl text-white text-left flex-grow z-40 hidden md:block">
        Unlock the secrets of your soil. Sign up Now!
      </div>
      <>
        <img
          src="../../assets/AuthPage.jpg"
          alt=""
          className="absolute top-2/3 w-1/5  ml-12 h-3/5 transform -translate-y-2/3 place-content-center rounded-xl hidden md:block"
        />
      </>
      <div className=" p-6 col-span-3 bg-white rounded-3xl flex flex-col justify-center items-center flex-grow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-14">
          Sign Up
        </h1>

        <form
          onSubmit={handleRegister}
          className=" w-full flex flex-col justify-center items-center text-black"
        >
          <div className="mb-4 w-1/2">
            <TextField
              id="fullname"
              label="Full Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setFullname(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>

          <div className="mb-4 w-1/2">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>

          <div className="mb-4 w-1/2">
            <TextField
              id="confirm-password"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
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
            >
              Sign Up
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

export default Signup;
