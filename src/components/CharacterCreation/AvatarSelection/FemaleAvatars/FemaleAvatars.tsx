import { femaleAvatars, avatarColours } from "libs/avatarData";

type props = {
  changeAvatarIndex: (index: number) => void;
};

function FemaleAvatars({ changeAvatarIndex }: props) {
  return (
    <div className="avatar-image-selection-container">
      {femaleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container ">
            <img
              className="avatar-image"
              src={require(`Avatars/${path + avatarColours[0]}`)}
              alt={`${path}`}
              onClick={() => changeAvatarIndex(index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FemaleAvatars;
