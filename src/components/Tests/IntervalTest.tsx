import React, { useState, useEffect } from "react";

type damageFn = {
  damage: () => void;
};

function IntervalTest({ damage }: damageFn) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => damage(), 1000);

      return () => clearInterval(interval);
    }
  }, [damage, start]);

  return (
    <div>
      <button onClick={() => setStart(true)}> start </button>
    </div>
  );
}

export default IntervalTest;
