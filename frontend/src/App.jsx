import { BrowserRouter,Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
      </Route>
      </Routes>
      </BrowserRouter>
    </>
);
}

export default App;
