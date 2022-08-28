import { useState } from "react";

type props = {
  allUsers: string[];
};

function UsernameInput({ allUsers }: props) {
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >();

  const userInputValidation = () => {};

  return (
    <div className="usercreation-input-contianer">
      <div className="usercreation-input">Username</div>
      <input
        placeholder="Between 2 and 16 characters"
        className="usercreation-input-input"
      />
      <div className="usercreation-input-validation">{validationMessage}</div>
    </div>
  );
}

export default UsernameInput;
