import { useState } from "react";
import Enemy from "./Enemy/Enemy";
import Player from "./Player/Player";
import { playerStats, enemyStats } from "libs/types";
import { enemyStatsData, playerStatsData } from "libs/data";

function Battle() {
  const [playerStats, setPlayerStats] = useState<playerStats>(playerStatsData);
  const [enemyStats, setEnemyStats] = useState<enemyStats>(enemyStatsData);
  const [resetStats, setResetStats] = useState(false);
  const [battleCheck, setBattleCheck] = useState(false);
  const [playerCharge, setPlayerCharge] = useState(0);

  const changeBattleCheck = () => {
    setBattleCheck(false);
  };

  // allows player health to change and passed down through props to enemy component
  // allows stats and health of player to change and effect damage
  const playerHealthChangeGlobal = (changes: number) => {
    setPlayerStats({
      ...playerStats,
      health: {
        ...playerStats.health,
        health: changes,
      },
    });
  };

  const playerStatsChangeGlobal = (changes: playerStats) => {
    setPlayerStats({
      ...playerStats,
      stats: {
        ...playerStats.stats,
        ...changes.stats,
      },
    });
  };

  const addCharge = () => {
    const charge = Math.floor(
      playerCharge +
        playerStats.level * 0.2 +
        playerStats.stats.intelligence * 0.3 +
        7 +
        Math.random() * 6
    );
    if (charge >= playerStats.stats.intelligence * 1.5 + 100) {
      setPlayerCharge(playerStats.stats.intelligence * 1.5 + 100);
      return;
    }
    setPlayerCharge(charge);
  };

  const removeCharge = (cost: number) => {
    setPlayerCharge(playerCharge - cost);
  };

  const reset = () => {
    setResetStats(!resetStats);
    setBattleCheck(false);
    setPlayerCharge(0);
  };

  console.log(playerStats.stats.dexterity);

  return (
    <div>
      <Player
        pStats={playerStats}
        eStats={enemyStats}
        reset={resetStats}
        changeBattleCheck={changeBattleCheck}
        battleCheck={battleCheck}
        playerCharge={playerCharge}
        playerHealthChangeGlobal={playerHealthChangeGlobal}
      />
      <Enemy
        pStats={playerStats}
        eStats={enemyStats}
        reset={resetStats}
        battleCheck={battleCheck}
        changeBattleCheck={changeBattleCheck}
        addCharge={addCharge}
        playerCharge={playerCharge}
        removeCharge={removeCharge}
        playerStatsChangeGlobal={playerStatsChangeGlobal}
      />
      <button className="reset" onClick={() => setBattleCheck(!battleCheck)}>
        Start
      </button>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Battle;
