import getAllUsernames from "api/getAllUsernames";
import { useState, useEffect } from "react";
import UsernameInput from "./UsernameInput";

function UserCreation() {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerClassname, setContainerClassname] = useState("usercreation");
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
      return;
    }
    usernameError("Please enter a valid username.");
  };

  const prevPage = () => {
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
    <div className={`${containerClassname}`}>
      <div className="usercreation-container">
        <div className="usercreation-title-container">
          <div className="usercreation-title">Character Creation</div>
          <div className="usercreation-subtitle">
            Your main character creation, this can be customized and changed
            later.
          </div>
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
        <div className="usercreation-continue-container">
          <div className="usercreation-continue" onClick={nextPage}>
            Continue
          </div>
          {currentPage > 0 && (
            <div className="usercreation-continue" onClick={prevPage}>
              Back
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCreation;
