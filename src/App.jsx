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
import News from "./pages/News"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact index path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/saveus" element={<Saveus />} />
        <Route path="/species" element={<Animals />} />
        <Route path="/species/:animalid" element={<Animalinfo />} />
        <Route  path='/news'element={ <News/>}></Route >
      </Routes>
    </BrowserRouter>
  );
};

export default App;
