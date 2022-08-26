import { useState } from "react";

type deadt = {
  dead: () => void;
};

function ClickTest({ dead }: deadt) {
  const [enemyHealth, setEnemyHealth] = useState(100);

  const attack = () => {
    if (enemyHealth - 5 <= 0) {
      dead();
    }
    setEnemyHealth(enemyHealth - 5);
  };

  return (
    <div>
      <div>{enemyHealth}</div>
      <button onClick={() => attack()}>Click</button>
    </div>
  );
}

export default ClickTest;
