import React from "react";

type props = {
  selectedUsername: string | undefined;
  selectedAvatarPath: string | undefined;
  selectedBorder: string | undefined;
};

function ConfirmSelection({
  selectedUsername,
  selectedAvatarPath,
  selectedBorder,
}: props) {
  return (
    <div className="avatar-final-container">
      <div>{selectedUsername}</div>
      <img
        className={`avatar-image-final ${selectedBorder}`}
        src={require(`Avatars/${selectedAvatarPath}`)}
        alt="Avatar"
      />
    </div>
  );
}

export default ConfirmSelection;
