import React, { useState } from "react";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import CreatureCard from "./CreatureCard";

const Creatures = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFiltration, setShowFiltration] = useState(true);

  const oceans = [...new Set(projects.map((project) => project.ocean))];

  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
    setShowFiltration(e.target.value !== "all");
  };

  return (
    <>
      <div className="AnimalsDiv flex justify-center mt-24">
        <div className="radio-buttons-container">
          <div className="radio-button mr-1" key="all">
            <input
              name="radio-group"
              id="all"
              className="radio-button__input"
              type="radio"
              value="all"
              onChange={handleRadioChange}
              checked={selectedFilter === "all"}
            />
            <label htmlFor="all" className="radio-button__label">
              <span className="radio-button__custom"></span>
              all
            </label>
          </div>
        </div>
        <div className="radio-buttons-container flex justify-center">
          {oceans.map((ocean) => (
            <div className="radio-button" key={ocean}>
              <input
                name="radio-group"
                id={`radio-${ocean}`}
                className="radio-button__input"
                type="radio"
                value={ocean}
                checked={selectedFilter === ocean}
                onChange={handleRadioChange}
              />
              <label htmlFor={`radio-${ocean}`} className="radio-button__label m-1">
                <span className="radio-button__custom"></span>
                {ocean}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Render the filtered projects */}
      <div id="FiltrationAnimals" className={`mt-20 flex justify-center flex-wrap gap-3 ${showFiltration ? "" : "hidden"}`}>
        {projects
          .filter((project) => {
            return selectedFilter === "all" || project.ocean === selectedFilter;
          })
          .map((project, index) => (
            <CreatureCard key={`project-${index}`} index={index} {...project} />
          ))}
      </div>
      <div id="AllAnimals" className={`mt-20 flex flex-wrap justify-center gap-3 ${showFiltration ? "hidden" : ""}`}>
        {projects.map((project, index) => (
          <CreatureCard 
          key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
   {/* <div> */}
    </>
  );
};

export default Creatures ;
