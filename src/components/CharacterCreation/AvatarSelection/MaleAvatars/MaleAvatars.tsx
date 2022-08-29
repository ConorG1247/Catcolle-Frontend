import { maleAvatars, avatarColours } from "libs/avatarData";

type props = {
  changeAvatarIndex: (index: number) => void;
};

function MaleAvatars({ changeAvatarIndex }: props) {
  return (
    <div className="avatar-image-selection-container">
      {maleAvatars.map((path, index) => {
        return (
          <div key={index} className="avatar-image-container ">
            <img
              className="avatar-image"
              src={require(`Avatars/${path + avatarColours[0]}`)}
              alt="Guy"
              onClick={() => changeAvatarIndex(index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MaleAvatars;
