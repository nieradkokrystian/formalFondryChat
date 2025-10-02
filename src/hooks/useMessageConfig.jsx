import {
  CheckIcon,
  CommitIcon,
  KeyboardIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

const STATUS_CONFIGS = {
  running: {
    bgColor: "bg-violet-200",
    icon: (
      <div className="bg-violet-500 rounded-full">
        <MagicWandIcon color="white" width={20} height={20} className="m-2" />
      </div>
    ),
  },
  pending: {
    bgColor: "bg-blue-300",
    icon: <CommitIcon width={20} height={20} />,
  },
  completed: {
    bgColor: "bg-green-300",
    icon: <CheckIcon width={20} height={20} />,
  },
};

const USER_REQUEST_CONFIG = {
  bgColor: "bg-blue-100",
  icon: (
    <div className="bg-blue-500 rounded-full">
      <KeyboardIcon className="m-2 text-white" width={20} height={20} />
    </div>
  ),
};

const DEFAULT_CONFIG = {
  bgColor: "bg-purple-100",
  icon: <MagicWandIcon color="black" width={20} height={20} />,
};

export const useMessageConfig = (isUserRequest, status) => {
  if (isUserRequest) return USER_REQUEST_CONFIG;
  return STATUS_CONFIGS[status] || DEFAULT_CONFIG;
};
