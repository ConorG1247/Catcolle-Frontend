type props = {
  characterOptions: string;
  genderSelection: (selection: string) => void;
};

function GenderSelection({ characterOptions, genderSelection }: props) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <button
        className={
          characterOptions === "male"
            ? "gender-selection gender-male selected"
            : "gender-selection gender-male"
        }
        onClick={() => genderSelection("male")}
      >
        Male
      </button>
      <button
        className={
          characterOptions === "female"
            ? "gender-selection gender-female selected"
            : "gender-selection gender-female"
        }
        onClick={() => genderSelection("female")}
      >
        Female
      </button>
      <button
        className={
          characterOptions === "neither"
            ? "gender-selection gender-neither selected"
            : "gender-selection gender-neither"
        }
        onClick={() => genderSelection("neither")}
      >
        Neither
      </button>
    </div>
  );
}

export default GenderSelection;
