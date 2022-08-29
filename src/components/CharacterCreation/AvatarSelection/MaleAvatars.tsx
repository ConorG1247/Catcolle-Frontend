import { maleAvatars, avatarColours } from "libs/avatarData";

function MaleAvatars() {
  return (
    <div className="avatar-image-selection-container">
      {maleAvatars.map((path, index) => {
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

export default MaleAvatars;
