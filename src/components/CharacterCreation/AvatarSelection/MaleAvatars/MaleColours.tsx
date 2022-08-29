import { maleAvatars, avatarColours } from "libs/avatarData";

type props = {
  avatarIndex: number;
  changeSelectedAvatar: (index: number, avatarPath: string) => void;
  avatarSelectCheck: number | undefined;
};

function MaleColours({
  avatarIndex,
  changeSelectedAvatar,
  avatarSelectCheck,
}: props) {
  return (
    <div className="avatar-image-selection-container">
      {maleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container">
            <img
              className={
                avatarSelectCheck === index
                  ? "avatar-image  avatar-image-selected"
                  : "avatar-image"
              }
              src={require(`Avatars/${
                maleAvatars[avatarIndex] + avatarColours[index]
              }`)}
              alt="Guy"
              onClick={() =>
                changeSelectedAvatar(
                  index,
                  maleAvatars[avatarIndex] + avatarColours[index]
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default MaleColours;
