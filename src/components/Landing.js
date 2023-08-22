import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../constants";
/**
 * Landing page component
 * @returns
 */
export default function Landing({
  usersRented,
  setUsersRented,
  userId,
  setUserId,
}) {

  const [usersState] = useState(CONSTANTS.users);
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>Who's watching?</h1>
      <div className="usersState">
        {usersState.map((user) => (
          <button
            key={user.id}
            style={{ backgroundColor: user.color }}
            onClick={() => {
              setUserId(user.id);
              navigate("/catalog");
            }}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
}
