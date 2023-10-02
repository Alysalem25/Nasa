import { motion } from "framer-motion";

// import { styles } from "../styles";
// // import { ComputersCanvas } from "./canvas";
// import { GlobeComponent } from "./canvas";
// // import {Header} from "./Header"
// import "./Header.css"
// import { Image } from "@react-three/drei";

import hero from "../assets/hereo.jpg"
// import hero from "./hero-2.jpeg"
import herobg from "../assets/213-Underwater-loop-background-YouTube.mp4"
const Hero = () => {
  return (
    <div className="relative ">
      <section className="showcase  min-w-full h-screen mx-auto ">
        <video src={herobg} muted loop autoPlay></video>
        <div className="overlay"></div>
        <div className="text">
          <svg>
            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
              Aqua Guard
            </text>
          </svg>
          <p>
            "What's Up With This Water" website Whether you are a curious
            individual, an environmental enthusiast, or a concerned citizen,
            this website is designed to provide you with a wealth of knowledge
            about marine creatures and water quality. Explore our resources,
            discover fascinating facts, and learn how you can contribute to the
            preservation of these vital ecosystems. Join us on this exciting
            journey of exploration, education, and conservation. Together, let's
            make a positive impact on the well-being of our marine creatures and
            the quality of our waters.
          </p>
          <a href="/species" className="text-align">
            <span>Explore</span>
            <div className="liquid"></div>
          </a>
        </div>
        <div className="inside_img">
          <img src={hero} alt="" />
        </div>
      </section>
      {/* <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#globe" className="transition scroll-smooth">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Hero;
