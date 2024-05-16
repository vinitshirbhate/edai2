
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


function Signup() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [fullname, setfullname] = useState("")

	const handleRegister= async (e)=>{
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			console.log(user);
			if(user){
				await setDoc(doc(db,"Users",user.uid), {
					email: user.email,
					fullname: fullname,

				})
			}
			console.log("User is Registered Successfully");
			toast.success("User Registered Successfully", {
				position: "top-center"
			})
		} catch (error) {
			console.log(error.message);
			toast.success(error.message, {
				position: "top-right"
			})
		}
	}

    return (

		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-800'>
					Sign Up
				</h1>

				<form onSubmit={handleRegister}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' onChange={(e) => setfullname(e.target.value)} required placeholder='John Doe' className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input type='email' onChange={(e) => setEmail(e.target.value)} required placeholder='johndoe@gmail.com' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>


          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* <GenderCheckbox /> */}

					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='/login'>
						Already have an account?
					</a>

					<div className="flex justify-center items-center mt-2   ">
                    <button type="submit" class="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button>
					</div>
                    {/* <div>

						<button className='btn btn-block btn-sm mt-2 border border-slate-700' >
							SignUp
						</button>
					</div> */}
        </form>
      </div>
    </div>
  );
};
export default Signup;
