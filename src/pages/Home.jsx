// eslint-disable-next-line no-unused-vars
import React from "react";
import { Hero, Navbar, Creatures } from "../components";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div>
        <Navbar />
        <Hero />
      </div>
    </div>
  );
};

export default Home;
