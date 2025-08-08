import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import "../uiComponents/dropdown.css";

import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext";
import UserAvatar from "./userAvatar";
const DropdownMenuDemo = () => {
  const navigate = useNavigate();
  const { username, logout } = useUser();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Create Task">
          <HamburgerMenuIcon width={25} height={25} />
          {/* Display UserAvatar only if username exists */}
          {username && <UserAvatar name={username} />}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent"
          sideOffset={15}
          side="bottom"
          align="start">
          {/* Display username if available */}
          {username && (
            <DropdownMenu.Item className="DropdownMenuItem">
              <span className=" ">{username}</span>
              <span className="RightSlot">
                <PersonIcon />
              </span>
            </DropdownMenu.Item>
          )}
          {username && <DropdownMenu.Separator />}{" "}
          {/* Separator only if logged in */}
          {/* Logout button only if logged in */}
          {username ? (
            <DropdownMenu.Item
              onClick={handleLogout}
              className="DropdownMenuItem">
              <span className="text-sm">Logout</span>{" "}
              <span className="RightSlot">
                <ExitIcon />
              </span>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item
              onClick={() => navigate("/login")}
              className="DropdownMenuItem">
              <span className="text-sm">Login</span>{" "}
              <span className="RightSlot">
                <PersonIcon />
              </span>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
