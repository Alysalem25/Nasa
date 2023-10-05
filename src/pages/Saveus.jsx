/* eslint-disable react/prop-types */


// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";
import { Navbar} from "../components";

import { styles } from "../styles";
import { saveus } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import hero from "../assets/hereo.jpg";
// import corals from "../assets/corals.jpg"
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        // width: "",
        margin: "0 25px 0 25px",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[100%] h-[100%] object-contain bg-cover rounded"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
      <div className="m-2 mt-4">
        <img src={experience.pic} alt="" className="rounded-2xl" />
      </div>
    </VerticalTimelineElement>
  );
};

const Saveus = () => {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <motion.div variants={textVariant()}>
        {/* <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p> */}
        <h2 className="text-secondary font-bold md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] text-center pt-24">
          How do we protect endangered <br />
          marine species?
        </h2>
        <div className="w-full flex items-center justify-center">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-[#eef2ff] text-[17px] max-w-5xl leading-[30px] "
          >
            Human development, and man's contributions to all areas of life, are
            considered to have made him forget how to maintain the balance of
            the planet, and that development must be in our interest and in the
            interest of our planet, and not in our interest only. Among the
            living organisms affected by human production waste are marine
            organisms.
          </motion.p>
          <div />
        </div>
        <div className="w-full flex items-center justify-center">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-[#eef2ff] text-[17px] max-w-5xl leading-[30px] "
          >
            But it's not too late to fix what we've done. These are some of the
            solutions we have thought of that could help these poor creatures
            escape the brink of extinction:
          </motion.p>
        </div>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="custom-timeline">
          {saveus.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Saveus