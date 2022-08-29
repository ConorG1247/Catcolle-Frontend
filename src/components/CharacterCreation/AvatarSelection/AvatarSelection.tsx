import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FemaleAvatars from "./FemaleAvatars/FemaleAvatars";
import FemaleColours from "./FemaleAvatars/FemaleColours";
import MaleAvatars from "./MaleAvatars/MaleAvatars";
import MaleColours from "./MaleAvatars/MaleColours";

type props = {
  avatarSelectCheck: number | undefined;
  changeSelectedAvatar: (
    index: number | undefined,
    avatarPath: string | undefined
  ) => void;
  avatarErrorMessage: string | undefined;
};

function AvatarSelection({
  avatarSelectCheck,
  changeSelectedAvatar,
  avatarErrorMessage,
}: props) {
  const [avatarOptions, setAvatarOptions] = useState<number>(0);
  const [avatarIndex, setAvatarIndex] = useState<number>(99);

  const changeAvatarIndex = (index: number) => {
    setAvatarIndex(index);
  };

  const genderSelection = (selection: number) => {
    setAvatarOptions(selection);
    setAvatarIndex(99);
    changeSelectedAvatar(undefined, undefined);
  };

  return (
    <div className="avatar-container">
      <div
        className={
          avatarErrorMessage
            ? "avatar-error-message visible"
            : "avatar-error-message avatar-error-hidden"
        }
      >
        {avatarErrorMessage}
      </div>
      <div className="avatar-button-container">
        <FontAwesomeIcon
          className={
            avatarIndex === 99
              ? "avatar-button avatar-back-hidden"
              : "avatar-button"
          }
          icon={faArrowLeftLong}
          style={{ height: 20 }}
          onClick={() => genderSelection(avatarOptions)}
        />
        <button
          onClick={() => genderSelection(0)}
          className={
            avatarIndex !== 99
              ? "avatar-button avatar-back-hidden"
              : "avatar-button"
          }
        >
          Male
        </button>
        <button
          onClick={() => genderSelection(1)}
          className={
            avatarIndex !== 99
              ? "avatar-button avatar-back-hidden"
              : "avatar-button"
          }
        >
          Female
        </button>
      </div>
      {avatarIndex === 99 && avatarOptions === 0 && (
        <MaleAvatars changeAvatarIndex={changeAvatarIndex} />
      )}
      {avatarIndex === 99 && avatarOptions === 1 && (
        <FemaleAvatars changeAvatarIndex={changeAvatarIndex} />
      )}
      {avatarIndex !== 99 && avatarOptions === 1 && (
        <FemaleColours
          avatarIndex={avatarIndex}
          changeSelectedAvatar={changeSelectedAvatar}
          avatarSelectCheck={avatarSelectCheck}
        />
      )}
      {avatarIndex !== 99 && avatarOptions === 0 && (
        <MaleColours
          avatarIndex={avatarIndex}
          changeSelectedAvatar={changeSelectedAvatar}
          avatarSelectCheck={avatarSelectCheck}
        />
      )}
    </div>
  );
}

export default AvatarSelection;
