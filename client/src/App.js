import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Components/Home";
import AddCandidate from "./Components/AddCandidate";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route exact path="/add_candidate" element={<PrivateRoute> <AddCandidate /> </PrivateRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
