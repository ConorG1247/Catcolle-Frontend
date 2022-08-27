import { useState } from "react";

function ColourOptions() {
  const [coloursOptionsOpen, setColoursOptionsOpen] = useState(false);
  const [colourSelectionIndex, setColourSelectionIndex] = useState<
    number | undefined
  >();
  let colourChoices = ["tan", "blue", "green", "tan", "blue", "green"];

  const confirmColourSelection = () => {
    setColoursOptionsOpen(false);
  };

  const cancelColourSelection = () => {
    setColoursOptionsOpen(false);
  };

  return (
    <div>
      <button
        className="colour-selection"
        onClick={() => setColoursOptionsOpen(true)}
      >
        Colour
      </button>
      <div
        className={
          coloursOptionsOpen
            ? "colours-selection-popup-dim popup-open"
            : "colours-selection-popup-dim "
        }
        onClick={() => setColoursOptionsOpen(false)}
      ></div>
      <div
        className={
          coloursOptionsOpen
            ? "colours-selection-popup  popup-open"
            : "colours-selection-popup"
        }
      >
        <div className="colour-selection-popup-container">
          {colourChoices.map((colour, index) => {
            return (
              <div className="colour-selection-container" key={index}>
                <div
                  className={
                    colourSelectionIndex === index
                      ? "colour-selection-choice colour-selection-choice-selected"
                      : `colour-selection-choice ${"colour-" + colour}`
                  }
                  onClick={() => setColourSelectionIndex(index)}
                >
                  {colour[0].toLocaleUpperCase() + colour.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="colour-selection-button-container">
          <div
            className="colour-selection-button"
            onClick={confirmColourSelection}
          >
            Confirm
          </div>
          <div
            className="colour-selection-button"
            onClick={cancelColourSelection}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColourOptions;
