import { useState } from "react";
import ColourOptions from "./ColourOptions";
import GenderSelection from "./GenderSelection";

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

  const colourSelection = (selection: string) => {
    setCharacterOptions({ ...characterOptions, colour: selection });
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
      <GenderSelection
        characterOptions={characterOptions.gender}
        genderSelection={genderSelection}
      />
      <ColourOptions
        characterOptions={characterOptions.colour}
        colourSelection={colourSelection}
      />
      <button className="colour-selection">Generate</button>
    </div>
  );
}

export default GenerateCharacter;
