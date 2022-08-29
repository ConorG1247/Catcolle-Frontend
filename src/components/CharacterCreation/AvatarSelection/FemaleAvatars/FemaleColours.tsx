import { femaleAvatars, avatarColours } from "libs/avatarData";

type props = {
  avatarIndex: number;
};

function FemaleColours({ avatarIndex }: props) {
  return (
    <div className="avatar-image-selection-container">
      {femaleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container ">
            <img
              className="avatar-image"
              src={require(`Avatars/${
                femaleAvatars[avatarIndex] + avatarColours[index]
              }`)}
              alt="Guy"
            />
          </div>
        );
      })}
    </div>
  );
}

export default FemaleColours;
