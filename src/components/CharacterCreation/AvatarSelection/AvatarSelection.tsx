import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FemaleAvatars from "./FemaleAvatars/FemaleAvatars";
import FemaleColours from "./FemaleAvatars/FemaleColours";
import MaleAvatars from "./MaleAvatars/MaleAvatars";
import MaleColours from "./MaleAvatars/MaleColours";

function AvatarSelection() {
  const [avatarSelectCheck, setAvatarSelectCheck] = useState<
    number | undefined
  >();
  const [selectedAvatarPath, setSelectedAvatarPath] = useState();
  const [avatarOptions, setAvatarOptions] = useState<number>(0);
  const [avatarIndex, setAvatarIndex] = useState<number>(99);

  const changeAvatarIndex = (index: number) => {
    setAvatarIndex(index);
  };

  const genderSelection = (selection: number) => {
    setAvatarOptions(selection);
    setAvatarIndex(99);
  };

  return (
    <div className="avatar-container">
      <div className="avatar-button-container">
        <FontAwesomeIcon
          className={
            avatarIndex === 99
              ? "avatar-button avatar-back-hidden"
              : "avatar-button"
          }
          icon={faArrowLeftLong}
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
        <FemaleColours avatarIndex={avatarIndex} />
      )}
      {avatarIndex !== 99 && avatarOptions === 0 && (
        <MaleColours avatarIndex={avatarIndex} />
      )}
    </div>
  );
}

export default AvatarSelection;
