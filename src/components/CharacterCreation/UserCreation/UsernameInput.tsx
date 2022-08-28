import { useEffect, useState } from "react";
import { CheckIcon, InfoOutlineIcon } from "@chakra-ui/icons";

type props = {
  allUsers: string[];
  confirmUsername: (username: string | undefined) => void;
  usernameErrorMessage: string | undefined;
  usernameError: (check: string | undefined) => void;
  nextPage: () => void;
};

function UsernameInput({
  allUsers,
  confirmUsername,
  usernameErrorMessage,
  usernameError,
  nextPage,
}: props) {
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >("test");
  const [validationClassChange, setValidationClassChange] = useState(0);

  useEffect(() => {
    if (usernameErrorMessage) {
      setValidationClassChange(2);
      setValidationMessage(usernameErrorMessage);
      return;
    }
  }, [usernameErrorMessage]);

  const userInputValidation = (input: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = input.target.value;
    confirmUsername(undefined);
    usernameError(undefined);

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
    confirmUsername(userInput);
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
        onKeyDown={(e) => (e.key === "Enter" ? nextPage() : "")}
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
