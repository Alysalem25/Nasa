// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navbar } from "../components";
import { useParams } from "react-router-dom";
import { creatures } from "../constants";
import { styles } from "../styles";
const Animalinfo = () => {
const { animalid } = useParams();

// Filter creatures based on the selected ocean
const filteredCreatures = creatures.filter(
  (creature) => creature.id === animalid
);

return (
  <div className="bg-primary">
    <Navbar />
    <div
      className={`${styles.padding} flex justify-center flex-row h-full pt-28 max-w-7xl mx-auto relative z-0`}
    >
      {filteredCreatures.length > 0 ? (
        filteredCreatures.map((creature) => (
          <div key={creature.id}>
            <div className="MainInfo">
              <div className="col ColInfo">
                {/* <h1>{creature.id}</h1> */}
                <h1 className="text-secondary">{creature.name}</h1>
                <p>
                  <span className="text-secondary "> Ocean:</span>{" "}
                  {creature.ocean}
                </p>
                <p>
                  <span className="text-secondary ">Kingdom:</span>{" "}
                  {creature.Kingdom}
                </p>
                <p>
                  <span className="text-secondary ">Description:</span>{" "}
                  {creature.description}
                </p>
              </div>
              <div className="col">
                <img
                  src={creature.image}
                  alt={creature.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="VideoDiv">
              <iframe
                className="video"
                width="1000"
                height="700"
                src={creature.VideoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="AllInfo">
              <h2>More Info:</h2>
              <p>{creature.MoreInfo}</p>
              <br />
              <h2>Spread Areas:</h2>
              <p>{creature.SpreadAreas}</p>
              <br />
              <h2>The Risk Of Extinction And Its Causes:</h2>
              <p>{creature.TheRiskOfExtinctionAndItsCauses}</p>
              <br />
              <h2>How To Protect Them:</h2>
              <p>
                <ul className="mt-5 list-disc ml-5 space-y-2">
                  {creature.HowToProtectThem.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className="text-white-100 text-[20px] pl-1 tracking-wider"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </p>
            </div>

            {/* Render other information about the creature */}
            <hr />
          </div>
        ))
      ) : (
        <p>No creatures found for the selected ocean and ID</p>
      )}
    </div>
  </div>
);
};

export default Animalinfo;
