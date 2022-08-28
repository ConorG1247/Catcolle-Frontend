import getAllUsernames from "api/getAllUsernames";
import { useState, useEffect } from "react";
import UsernameInput from "./UsernameInput";

function UserCreation() {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [containerClassname, setContainerClassname] = useState("usercreation");
  const [selectedUsername, setSelectedUsername] = useState<
    string | undefined
  >();

  useEffect(() => {
    const getUsers = async () => {
      const userData = getAllUsernames();

      setAllUsers(await userData);
    };
    getUsers();
  }, []);

  return (
    <div className={`${containerClassname}`}>
      <div className="usercreation-container">
        <div className="usercreation-title-container">
          <div className="usercreation-title">Character Creation</div>
          <div className="usercreation-subtitle">
            Your main character creation, this can be customized and changed
            later.
          </div>
        </div>
        <UsernameInput allUsers={allUsers} />
        <div className="usercreation-continue-container">
          <div className="usercreation-continue">Continue</div>
        </div>
      </div>
    </div>
  );
}

export default UserCreation;
