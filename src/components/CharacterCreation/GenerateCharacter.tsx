import { useState } from "react";

function GenerateCharacter() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [usernameInputConfirm, setUsernameInpurtConfirm] = useState<
    string | undefined
  >();
  const [usernameInputError, setUsernameInputError] = useState<
    string | undefined
  >();
  const [characterOptions, setCharacterOptions] = useState({
    name: "",
    gender: "",
    colour: "",
  });
  const [coloursOptionsOpen, setColoursOptionsOpen] = useState(false);

  const updateCharName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        !/^[a-zA-Z]+$/g.test(usernameInput) ||
        usernameInput.length > 16 ||
        usernameInput.length < 1
      ) {
        setTimeout(() => {
          setUsernameInputError(undefined);
        }, 4000);

        setUsernameInputError(
          "Please input a username between 1 - 16 alphabetical characters."
        );
        setUsernameInpurtConfirm(undefined);

        return;
      }

      setCharacterOptions({ ...characterOptions, name: usernameInput });

      setTimeout(() => {
        setUsernameInpurtConfirm(undefined);
      }, 4000);

      setUsernameInpurtConfirm(
        `Name successfully changed to ${usernameInput}.`
      );
      return;
    }

    setUsernameInputError(undefined);
  };

  const genderSelection = (selection: string) => {
    setCharacterOptions({ ...characterOptions, gender: selection });
  };

  return (
    <div>
      <input
        onKeyDown={(e) => updateCharName(e)}
        onChange={(input) => setUsernameInput(input.target.value)}
        style={{ marginTop: 10 }}
      />
      <div className={usernameInputError ? "username-input-error" : "hidden"}>
        {usernameInputError}
      </div>
      <div
        className={usernameInputConfirm ? "username-input-confirm" : "hidden"}
      >
        {usernameInputConfirm}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button
          className={
            characterOptions.gender === "male"
              ? "gender-selection selected"
              : "gender-selection"
          }
          onClick={() => genderSelection("male")}
        >
          Male
        </button>
        <button
          className={
            characterOptions.gender === "female"
              ? "gender-selection selected"
              : "gender-selection"
          }
          onClick={() => genderSelection("female")}
        >
          Female
        </button>
        <button
          className={
            characterOptions.gender === "neither"
              ? "gender-selection selected"
              : "gender-selection"
          }
          onClick={() => genderSelection("neither")}
        >
          Neither
        </button>
      </div>
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
        test
      </div>

      <br />
      <button className="colour-selection">Generate</button>
    </div>
  );
}

export default GenerateCharacter;
