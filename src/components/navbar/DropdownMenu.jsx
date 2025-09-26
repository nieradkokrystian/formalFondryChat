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
        <button className="navbar-btn">
          <HamburgerMenuIcon width={25} height={25} />
          <UserAvatar name={username} />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className="DropdownMenuContent"
          sideOffset={10}
          side="bottom"
          align="start"
        >
          <Dropdown.Item className="DropdownMenuItem">
            <span>{username}</span>
            <span className="RightSlot">
              <PersonIcon />
            </span>
          </Dropdown.Item>

          <Dropdown.Separator />

          <Dropdown.Item onClick={handleLogout} className="DropdownMenuItem">
            <span className="text-sm">Logout</span>
            <span className="RightSlot">
              <ExitIcon />
            </span>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

export default DropdownMenu;
