import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import hero from "../assets/hereo.jpg";
import dirty2 from "../assets/dirty_water2.jpg";
import clean_water from "../assets/clean_water.jpg";
import very_dirty_water from "../assets/very_dirty_water.jpg"; // Corrected import path

const Game = () => {
  const [elementCol, setElementCol] = useState(1);
  const [basketCol, setBasketCol] = useState(0);
  const [elementRow, setElementRow] = useState(0);
  const [score, setScore] = useState(0);
  const [failedScore, setFailedScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showLoseMessage, setShowLoseMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDroppingElement, setShowDroppingElement] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [timerValue, setTimerValue] = useState(60);
  const [succeeded, setSucceeded] = useState(false);
  const numRows = 5;
  const numCols = 10;

  // Define an array of image sources for the dropping element
  const elementImages = [hero, dirty2, clean_water, very_dirty_water];

  const startGame = () => {
    setGameActive(true);
    setShowDroppingElement(true);
    setShowLoseMessage(false);
    setShowSuccessMessage(false);
    setIsFrozen(false);
    setTimerValue(60);

    const timer = setInterval(() => {
      if (timerValue > 0) {
        setTimerValue((prevValue) => prevValue - 1);
      } else {
        clearInterval(timer);

        if (failedScore < 3) {
          // Change the condition to 3
          setScore((prevScore) => prevScore + 1);
        } else {
          setSucceeded(true);
        }

        resetGame();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  };

  const resetGame = () => {
    setGameActive(false);
    setShowDroppingElement(false);
    setShowLoseMessage(false);
    setShowSuccessMessage(false);
    setIsFrozen(false);
    setElementRow(0);
    setElementCol(1);
    setFailedScore(0);
    setTimerValue(60);
    setSucceeded(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameActive && !isFrozen) {
        if (e.key === "ArrowRight" && basketCol < numCols - 1) {
          setBasketCol((prevCol) => prevCol + 1);
        } else if (e.key === "ArrowLeft" && basketCol > 0) {
          setBasketCol((prevCol) => prevCol - 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [basketCol, gameActive, isFrozen]);

  useEffect(() => {
    if (gameActive && !isFrozen) {
      const timer = setInterval(() => {
        if (elementRow < numRows - 1) {
          setElementRow((prevRow) => prevRow + 1);
        } else {
          if (elementCol === basketCol) {
            setScore((prevScore) => prevScore + 1);
          } else {
            setFailedScore((prevFailedScore) => prevFailedScore + 1);
          }

          setElementRow(0);
          const randomCol = Math.floor(Math.random() * numCols);
          setElementCol(randomCol);

          if (failedScore >= 3) {
            // Change the condition to 3
            clearInterval(timer);
            setShowDroppingElement(false);
            setIsFrozen(true);
            setShowLoseMessage(true);
          } else if (timerValue <= 0) {
            clearInterval(timer);
            setShowDroppingElement(false);
            setIsFrozen(true);
            setShowLoseMessage(false);
            if (!succeeded) {
              // alert("Yo!");
            }
          }
        }
      }, 200);

      return () => {
        clearInterval(timer);
      };
    }
  }, [
    elementRow,
    basketCol,
    elementCol,
    numRows,
    numCols,
    failedScore,
    gameActive,
    isFrozen,
    timerValue,
    succeeded,
  ]);

  let tableBackground = clean_water; // Default background

  if (failedScore === 1) {
    tableBackground = clean_water;
  } else if (failedScore === 2) {
    tableBackground = dirty2;
  } else if (failedScore === 3) {
    tableBackground = very_dirty_water;
  }

  // State to store the image source for the dropping element
  const [droppingElementImage, setDroppingElementImage] = useState(
    elementImages[0] // Initial image source
  );

  // Use useEffect to change the image source when elementCol changes
  useEffect(() => {
    // Select a random image source for the dropping element
    const randomElementImage =
      elementImages[Math.floor(Math.random() * elementImages.length)];
    // Set the image source for the dropping element
    setDroppingElementImage(randomElementImage);
  }, [elementCol]);

  return (
    <div className="  h-full mb-0">
      <Navbar />
      <div className="game">
   
        <table
          style={{
            width: "80%",
            maxWidth: "600px",
            border: "3px solid #0391bf",
            // opacity: 0.5, // You can use opacity like this, but it will affect the entire element, not just the background image
            backgroundImage: `url(${tableBackground})`,
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Corrected syntax for opacity
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <tbody>
            {Array.from({ length: numRows }, (_, row) => (
              <tr key={row}>
                {Array.from({ length: numCols }, (_, col) => (
                  <td key={col}>
                    {row === elementRow && col === elementCol ? (
                      <div
                        className={`element ${
                          isFrozen ? "frozen" : "element-move"
                        }`}
                      >
                        <img src={droppingElementImage} alt="" />{" "}
                        {/* Use droppingElementImage */}
                      </div>
                    ) : null}
                    {row === numRows - 1 && col === basketCol ? (
                      <div className="basket">
                        <img src={hero} alt="" />
                      </div>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!gameActive && !showLoseMessage && !showSuccessMessage && (
          <button className="start_game" onClick={startGame}>
            {" "}
            <span className="text">Start Game</span>
          </button>
        )}
        <div className="game_data">
          <div className="score">Score: {score}</div>
          <div className="failed-score">Failed Score: {failedScore}</div>
          <div className="timer">Timer: {timerValue}</div>
          <div className="status">
            {gameActive ? "Playing" : "Not Playing"} {/* Status message */}
          </div>
        </div>
        {/* <div
          className="resultColor"
          style={{
            backgroundColor: bgColor,
            transition: "background-color 1s ease-in-out",
          }}
        >
          <img src={hero} alt="" />
        </div> */}
        {showLoseMessage && !succeeded && (
          <div className="lose-message">
            <h1 className="you_lose_msg">You Lose...!</h1>
            <p className="lose_msg_info">
              <h1>info About:</h1>
              Water pollution happens when harmful stuff gets into natural water
              sources because of things people do, like factories, farming, and
              getting rid of sewage. These bad things can be chemicals, garbage,
              and germs, and they are really bad for the environment and our
              health. Water pollution can make water places unhealthy for
              animals and even make our drinking water dirty,{" "}
            </p>
            <button onClick={resetGame}>
              <span className="text">Reset Game</span>
            </button>
            <button>
              <span className="text">More info..</span>
            </button>
          </div>
        )}
        {timerValue <= 0 && !succeeded && failedScore < 3 && (
          <div className="cogratolation-msg">
            <h1 className="you_win_msg">Congratulations, You Succeeded!</h1>
            <button onClick={resetGame}>
              <span className="text">Reset Game</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
