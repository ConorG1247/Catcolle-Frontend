import { maleAvatars, avatarColours } from "libs/avatarData";

type props = {
  avatarIndex: number;
};

function MaleColours({ avatarIndex }: props) {
  return (
    <div className="avatar-image-selection-container">
      {maleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container ">
            <img
              className="avatar-image"
              src={require(`Avatars/${
                maleAvatars[avatarIndex] + avatarColours[index]
              }`)}
              alt="Guy"
            />
          </div>
        );
      })}
    </div>
  );
}

export default MaleColours;
