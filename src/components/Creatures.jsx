// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { creatures } from "../constants";
import CreatureCard from "./CreatureCard";

const Creatures = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFiltration, setShowFiltration] = useState(true);

  const oceans = [...new Set(creatures.map((creature) => creature.ocean))];

  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
    setShowFiltration(e.target.value !== "all");
  };

  return (
    <>
<<<<<<< HEAD
      <div className="AnimalsDiv flex flex-wrap justify-center pt-24">
=======
      <div className="AnimalsDiv flex justify-center pl-6 pt-24">
>>>>>>> 25898335edc6432c5774cd28d9275b179187bd1b
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
        <div className="radio-buttons-container flex flex-wrap justify-center text-center">
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
              <label
                htmlFor={`radio-${ocean}`}
                className="radio-button__label m-1"
              >
                <span className="radio-button__custom"></span>
                {ocean}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Render the filtered projects */}
      <div
        id="FiltrationAnimals"
        className={`md:m-20 mt-20 flex justify-center flex-wrap gap-3 ${
          showFiltration ? "" : "hidden"
        }`}
      >
        {creatures
          .filter((creature) => {
            return (
              selectedFilter === "all" || creature.ocean === selectedFilter
            );
          })
          .map((creature, index) => (
            <CreatureCard
              key={`project-${index}`}
              index={index}
              {...creature}
            />
          ))}
      </div>
      <div
        id="AllAnimals"
        className={`mt-20 flex flex-wrap justify-center gap-7 pb-4 ${
          showFiltration ? "hidden" : ""
        }`}
      >
        {creatures.map((creature, index) => (
          <CreatureCard key={`project-${index}`} index={index} {...creature} />
        ))}
      </div>
    </>
  );
};

export default Creatures ;
