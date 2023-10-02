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
      <div className="AnimalsDiv flex justify-center pt-24">
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
        className={`mt-20 flex justify-center flex-wrap gap-3 ${
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
        className={`mt-20 flex flex-wrap justify-center gap-7 ${
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
