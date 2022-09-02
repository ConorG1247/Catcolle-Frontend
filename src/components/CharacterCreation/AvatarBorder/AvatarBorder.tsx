import { useState } from "react";
import { borderColour } from "libs/avatarData";

type props = {
  selectedAvatarPath: string | undefined;
  avatarErrorMessage: string | undefined;
  changeSelectedBorder: (selection: string) => void;
};

function AvatarBorder({
  selectedAvatarPath,
  avatarErrorMessage,
  changeSelectedBorder,
}: props) {
  const [selectedBorder, setSelectedBorder] = useState<number | undefined>();
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
      <div className="avatar-image-selection-container">
        {borderColour.map((colour, index) => {
          return (
            <div key={index} className="avatar-image-container">
              <img
                className={
                  selectedBorder === index
                    ? `avatar-image ${colour} avatar-border-selected`
                    : `avatar-image ${colour}`
                }
                src={require(`Avatars/${selectedAvatarPath}`)}
                alt={selectedAvatarPath}
                onClick={() => {
                  setSelectedBorder(index);
                  changeSelectedBorder(colour);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvatarBorder;
