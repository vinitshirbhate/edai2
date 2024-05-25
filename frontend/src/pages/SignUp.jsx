import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Alert } from "@mui/material";

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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Sign Up
        </h1>

        <form onSubmit={handleRegister}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="johndoe@gmail.com"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="/login"
          >
            Already have an account?
          </a>

          <div className="flex justify-center items-center mt-2">
            <button
              type="submit"
              className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              SignUp
            </button>
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
              {alertMessage}.
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
