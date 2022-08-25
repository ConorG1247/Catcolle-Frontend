import React from "react";

type props = {
  health: {
    initial: number;
    health: number;
    percentage: number;
  };
};

function PlayerHealth({ health }: props) {
  return (
    <div>
      <div className="healthbar">
        <div
          className="inner"
          style={{
            width: health.percentage * 2,
            backgroundColor:
              health.percentage > 75
                ? "#4DDF76"
                : health.percentage > 50
                ? "#DDDF4D"
                : health.percentage > 30
                ? "#DFB14D"
                : "#DF4D4D",
          }}
        />
      </div>
    </div>
  );
}

export default PlayerHealth;
