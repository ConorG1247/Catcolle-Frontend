import { femaleAvatars, avatarColours } from "libs/avatarData";

type props = {
  avatarIndex: number;
  changeSelectedAvatar: (index: number, avatarPath: string) => void;
  avatarSelectCheck: number | undefined;
};

function FemaleColours({
  avatarIndex,
  changeSelectedAvatar,
  avatarSelectCheck,
}: props) {
  return (
    <div className="avatar-image-selection-container">
      {femaleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container">
            <img
              className={
                avatarSelectCheck === index
                  ? "avatar-image  avatar-image-selected"
                  : "avatar-image"
              }
              src={require(`Avatars/${
                femaleAvatars[avatarIndex] + avatarColours[index]
              }`)}
              alt="Guy"
              onClick={() =>
                changeSelectedAvatar(
                  index,
                  femaleAvatars[avatarIndex] + avatarColours[index]
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default FemaleColours;
