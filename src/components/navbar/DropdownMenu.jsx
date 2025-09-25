import "./DropdownMenu.css";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import UserAvatar from "./UserAvatar";

const DropdownMenu = () => {
  const navigate = useNavigate();
  const { username, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="IconButton cursor-target" aria-label="Create Task">
          <HamburgerMenuIcon width={25} height={25} />
          {username && <UserAvatar name={username} />}
        </button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className="DropdownMenuContent"
          sideOffset={15}
          side="bottom"
          align="start"
        >
          {username && (
            <Dropdown.Item className="DropdownMenuItem">
              <span className=" ">{username}</span>
              <span className="RightSlot">
                <PersonIcon />
              </span>
            </Dropdown.Item>
          )}
          {username && <Dropdown.Separator />}{" "}
          {username ? (
            <Dropdown.Item
              onClick={handleLogout}
              className="DropdownMenuItem cursor-target"
            >
              <span className="text-sm">Logout</span>{" "}
              <span className="RightSlot">
                <ExitIcon />
              </span>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              onClick={() => navigate("/login")}
              className="DropdownMenuItem"
            >
              <span className="text-sm">Login</span>{" "}
              <span className="RightSlot">
                <PersonIcon />
              </span>
            </Dropdown.Item>
          )}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

export default DropdownMenu;
