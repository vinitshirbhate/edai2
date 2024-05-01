import React, { useState }from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);
const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const loginUser = () => {
		signInWithEmailAndPassword(auth, email, password)
		.then((value) => window.alert("Login Successful"))
		.catch((err) => console.log(err))
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-black'>
					Login
				</h1>

				<form>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Enter your email' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							onChange={e => setPassword(e.target.value)} 
							value={password}
							type='password'
							placeholder='Enter your Password'
							className='w-full input input-bordered h-10'
						/>
					</div>
					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</a>

                    <div className="flex justify-center items-center mt-3">
                    <button onClick={loginUser} type="button" class="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
					</div>
				</form>
			</div>      
		</div>
	);
};
export default Login;