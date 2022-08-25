import { enemyStats } from "libs/types";
import { useState } from "react";

type props = {
  enemyStats: enemyStats;
};

function Enemy({ enemyStats }: props) {
  const [stats, setStats] = useState(enemyStats);
  return (
    <div>
      <div className="healthbar">
        <div
          className="inner"
          style={{
            width: stats.health.percentage * 2,
            backgroundColor:
              stats.health.percentage > 75
                ? "#4DDF76"
                : stats.health.percentage > 50
                ? "#DDDF4D"
                : stats.health.percentage > 30
                ? "#DFB14D"
                : "#DF4D4D",
          }}
        />
      </div>
      <div>Enemy: {stats.health.health}</div>
      <button
        onClick={() =>
          setStats({
            ...stats,
            health: {
              ...stats.health,
              health: stats.health.health - 10,
              percentage: stats.health.percentage - 10,
            },
          })
        }
      >
        Attack
      </button>
    </div>
  );
}

export default Enemy;
