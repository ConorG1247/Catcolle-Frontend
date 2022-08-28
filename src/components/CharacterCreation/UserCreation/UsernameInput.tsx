import { useState } from "react";
import { CheckIcon, InfoOutlineIcon } from "@chakra-ui/icons";

type props = {
  allUsers: string[];
};

function UsernameInput({ allUsers }: props) {
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >("test");
  const [validationClassChange, setValidationClassChange] = useState(0);

  const userInputValidation = (input: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = input.target.value;

    if (allUsers.includes(userInput.toLocaleLowerCase())) {
      setValidationClassChange(2);
      setValidationMessage("Username already taken.");
      return;
    }

    if (userInput.length === 0) {
      setValidationClassChange(0);
      return;
    }

    if (userInput.length < 2) {
      setValidationClassChange(2);
      setValidationMessage("Username too short!");
      return;
    }

    if (userInput.length > 16) {
      setValidationClassChange(2);
      setValidationMessage("Username too long. ");
      return;
    }

    setValidationClassChange(1);
    setValidationMessage("Username available!");
  };

  return (
    <div className="usercreation-input-contianer">
      <div className="usercreation-input">Username</div>
      <input
        placeholder="Between 2 and 16 characters"
        className={
          validationClassChange === 2
            ? "usercreation-input-input input-error"
            : validationClassChange === 1
            ? "usercreation-input-input input-confirm"
            : "usercreation-input-input"
        }
        onChange={(input) => userInputValidation(input)}
      />
      {validationClassChange === 1 && <CheckIcon className="checkIcon" />}
      {validationClassChange === 2 && <InfoOutlineIcon className="infoIcon" />}
      <div
        className={
          validationClassChange === 1
            ? "input-validation-confirm visible"
            : validationClassChange === 2
            ? "input-validation-error visible"
            : "input-validation-error hidden"
        }
      >
        {validationMessage}
      </div>
    </div>
  );
}

export default UsernameInput;
