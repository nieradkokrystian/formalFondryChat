import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import "../uiComponents/dropdown.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext"; // Import useUser hook
// import { extractNameFromEmail } from "../utils/extractName";

const DropdownMenuDemo = () => {
  const navigate = useNavigate();
  const { username, logout } = useUser();

  function getInitials(name) {
    if (!name) return "";
    const nameParts = name.split(" ");
    let initials = "";

    if (nameParts[0] && nameParts[0].length > 0) {
      initials += nameParts[0][0].toUpperCase();
    }

    if (nameParts.length > 1 && nameParts[nameParts.length - 1].length > 0) {
      initials += nameParts[nameParts.length - 1][0].toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 1) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }

    if (initials.length === 0 && name.length > 0) {
      initials = name[0].toUpperCase();
    }

    return initials;
  }

  function getColorFromName(name) {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
      "#607D8B",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  }

  function UserAvatar({ name }) {
    const initials = getInitials(name);
    // Use the color from the helper function
    const bgColor = getColorFromName(name);

    return (
      <div className="mock-icon" style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
    );
  }

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
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
