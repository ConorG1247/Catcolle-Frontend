import { useState } from "react";
import FemaleAvatars from "./FemaleAvatars";
import MaleAvatars from "./MaleAvatars";

function AvatarSelection() {
  const [avatarImagePath, setAvatarImagePath] = useState<string>("Girl/3.png");
  const [avatarSelectCheck, setAvatarSelectCheck] = useState<
    number | undefined
  >();
  const [selectedAvatarPath, setSelectedAvatarPath] = useState();
  const [avatarOptions, setAvatarOptions] = useState<boolean>(false);

  return (
    <div className="avatar-container">
      <div className="avatar-button-container">
        <button>Male</button>
        <button>Female</button>
      </div>
      <MaleAvatars />
      <FemaleAvatars />
    </div>
  );
}

export default AvatarSelection;
