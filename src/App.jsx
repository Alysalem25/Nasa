import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {
//   Globe,
//   Hero,
//   Navbar,
//   Creatures,
// } from "./components";
import Earth from "./pages/Earth"
import Home from "./pages/Home"
import Saveus from "./pages/Saveus";
import Animalinfo from "./pages/Animalinfo";
import Animals from "./pages/Animals"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/saveus" element={<Saveus />} />
        <Route path="/species" element={<Animals />} />
        <Route path="/species/:animalid" element={<Animalinfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
