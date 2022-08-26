import { attacks, playerStats } from "libs/types";

type props = {
  playerStats: playerStats;
  battleCheck: boolean;
  playerCharge: number;
  chargedAttack: (attacks: attacks) => void;
};

function ChargeAttacks({
  playerStats,
  battleCheck,
  playerCharge,
  chargedAttack,
}: props) {
  return (
    <div style={{ display: "flex" }}>
      {playerStats.attacks.map((attacks, index) => {
        return (
          <div key={index}>
            <button
              disabled={
                battleCheck
                  ? playerCharge > attacks.cost
                    ? false
                    : true
                  : false
              }
              onClick={() => chargedAttack(attacks)}
              className="attack"
            >
              {attacks.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ChargeAttacks;
