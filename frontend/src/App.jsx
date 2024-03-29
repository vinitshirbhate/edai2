import { BrowserRouter,Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import Dashboard from "./pages/dashboard";
import Compatibility from "./pages/compatibility";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
      <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/compatiblity' element={<Compatibility />}></Route>
      </Route>
      </Routes>
      </div>
      </BrowserRouter>
    </>
);
}

export default App;
