import getAllUsernames from "api/getAllUsernames";
import { useState, useEffect } from "react";
import AvatarSelection from "./AvatarSelection/AvatarSelection";
import CreationButtons from "./CreationButtons";
import UsernameInput from "./Username/UsernameInput";

function UserCreation() {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [subTitleMessage, setSubTitleMessage] = useState(
    "Your main character creation, this can be customized and changed later."
  );
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | undefined
  >();
  const [selectedUsername, setSelectedUsername] = useState<
    string | undefined
  >();

  useEffect(() => {
    const getUsers = async () => {
      const userData = getAllUsernames();

      setAllUsers(await userData);
    };
    getUsers();
  }, []);

  const confirmUsername = (username: string | undefined) => {
    setSelectedUsername(username);
  };

  const nextPage = () => {
    if (selectedUsername) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 === 1) {
        setSubTitleMessage("Select an avatar to be displayed on your profile.");
      }
      return;
    }

    usernameError("Please enter a valid username.");
  };

  const prevPage = () => {
    if (currentPage - 1 === 1) {
      setSubTitleMessage("Select an avatar to be displayed on your profile.");
    } else if (currentPage - 1 === 0) {
      setSubTitleMessage(
        " Your main character creation, this can be customized and changed later."
      );
    }
    setCurrentPage(currentPage - 1);
    setUsernameErrorMessage(undefined);
    setSelectedUsername(undefined);
  };

  const usernameError = (check: string | undefined) => {
    if (check) {
      setUsernameErrorMessage(check);
      return;
    }
    setUsernameErrorMessage(undefined);
  };

  return (
    <div className="usercreation">
      <div className="usercreation-container">
        <div className="usercreation-title-container">
          <div className="usercreation-title">Character Creation</div>
          <div className="usercreation-subtitle">{subTitleMessage}</div>
        </div>
        {currentPage === 0 && (
          <UsernameInput
            allUsers={allUsers}
            confirmUsername={confirmUsername}
            usernameErrorMessage={usernameErrorMessage}
            usernameError={usernameError}
            nextPage={nextPage}
          />
        )}
        {currentPage === 1 && <AvatarSelection />}
        <CreationButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default UserCreation;
