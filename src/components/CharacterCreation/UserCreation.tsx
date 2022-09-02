import getAllUsernames from "api/getAllUsernames";
import { useState, useEffect } from "react";
import AvatarBorder from "./AvatarBorder/AvatarBorder";
import AvatarSelection from "./AvatarSelection/AvatarSelection";
import ConfirmSelection from "./ConfirmSelection/ConfirmSelection";
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
  const [avatarSelectCheck, setAvatarSelectCheck] = useState<
    number | undefined
  >();
  const [selectedAvatarPath, setSelectedAvatarPath] = useState<
    string | undefined
  >();
  const [avatarErrorMessage, setAvatarErrorMessage] = useState<
    string | undefined
  >();
  const [selectedBorder, setSelectedBorder] = useState<string | undefined>();

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
    if (selectedUsername && currentPage === 0) {
      setCurrentPage(currentPage + 1);
      setSubTitleMessage(
        "Select an avatar and preferred colour to be displayed on your profile."
      );
      return;
    } else if (!selectedUsername) {
      usernameError("Please enter a valid username.");
      return;
    }

    if (selectedAvatarPath && currentPage === 1) {
      setCurrentPage(currentPage + 1);
      setSubTitleMessage(
        "Select a border for your avatar picture to finish customising your profile."
      );
      return;
    } else if (selectedAvatarPath === undefined) {
      setAvatarErrorMessage("Please select an avatar to continue.");
      return;
    }

    if (selectedBorder && currentPage === 2) {
      setCurrentPage(currentPage + 1);
      setSubTitleMessage("Confirm your choices.");
      return;
    } else if (selectedBorder === undefined) {
      setAvatarErrorMessage("Please select a border to continue.");
      return;
    }
  };

  const prevPage = () => {
    if (currentPage - 1 === 2) {
      setSubTitleMessage(
        "Select a border for your avatar picture to finish customising your profile."
      );
      setAvatarErrorMessage(undefined);
      setSelectedBorder(undefined);
    } else if (currentPage - 1 === 1) {
      setSubTitleMessage(
        "Select an avatar and preferred colour to be displayed on your profile."
      );
      setSelectedAvatarPath(undefined);
      setAvatarSelectCheck(undefined);
      setAvatarErrorMessage(undefined);
      setSelectedBorder(undefined);
    } else if (currentPage - 1 === 0) {
      setSubTitleMessage(
        "Your main character creation, this can be customized and changed later."
      );
      setUsernameErrorMessage(undefined);
      setSelectedUsername(undefined);
      setAvatarErrorMessage(undefined);
    }

    setCurrentPage(currentPage - 1);
  };

  const usernameError = (errorMessageCheck: string | undefined) => {
    if (errorMessageCheck) {
      setUsernameErrorMessage(errorMessageCheck);
      return;
    }
    setUsernameErrorMessage(undefined);
  };

  const changeSelectedAvatar = (
    index: number | undefined,
    avatarPath: string | undefined
  ) => {
    if (index === undefined) {
      setAvatarSelectCheck(index);
      setSelectedAvatarPath(undefined);
      setAvatarErrorMessage(undefined);
      return;
    }
    setAvatarSelectCheck(index);
    setSelectedAvatarPath(avatarPath);
    setAvatarErrorMessage(undefined);
  };

  const changeSelectedBorder = (selection: string) => {
    setSelectedBorder(selection);
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
        {currentPage === 1 && (
          <AvatarSelection
            avatarSelectCheck={avatarSelectCheck}
            changeSelectedAvatar={changeSelectedAvatar}
            avatarErrorMessage={avatarErrorMessage}
          />
        )}
        {currentPage === 2 && (
          <AvatarBorder
            selectedAvatarPath={selectedAvatarPath}
            avatarErrorMessage={avatarErrorMessage}
            changeSelectedBorder={changeSelectedBorder}
          />
        )}
        {currentPage === 3 && (
          <ConfirmSelection
            selectedUsername={selectedUsername}
            selectedAvatarPath={selectedAvatarPath}
            selectedBorder={selectedBorder}
          />
        )}
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
