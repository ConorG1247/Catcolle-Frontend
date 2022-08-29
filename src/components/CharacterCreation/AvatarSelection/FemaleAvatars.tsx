import { femaleAvatars, avatarColours } from "libs/avatarData";

function FemaleAvatars() {
  return (
    <div className="avatar-image-selection-container">
      {femaleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container ">
            <img
              className="avatar-image"
              src={require(`../../../Avatars/${path + avatarColours[index]}`)}
              alt="Guy"
            />
          </div>
        );
      })}
    </div>
  );
}

export default FemaleAvatars;
