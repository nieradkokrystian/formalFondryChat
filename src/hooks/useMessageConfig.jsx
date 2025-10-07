import { CommitIcon, KeyboardIcon, MagicWandIcon } from "@radix-ui/react-icons";

const LLM_TAGS = ["LLMReq", "LLMRes", "LLM_Thinking"];
const TC_TAGS = ["TCReq", "TCRes"];
const USER_TAGS = ["UserReq", "UserRes"];

const USER_CONFIG = {
  bgColor: "bg-blue-100",
  icon: (
    <div className="bg-blue-500 rounded-full">
      <KeyboardIcon className="m-2 text-white" width={20} height={20} />
    </div>
  ),
};

const LLM_CONFIG = {
  bgColor: "bg-violet-200",
  icon: (
    <div className="bg-violet-500 rounded-full">
      <MagicWandIcon className="m-2 text-white" width={20} height={20} />
    </div>
  ),
};
const TC_CONFIG = {
  bgColor: "bg-slate-200",
  icon: (
    <div className="bg-slate-500 rounded-full">
      <CommitIcon className="m-2 text-white" width={20} height={20} />
    </div>
  ),
};

const DEFAULT_CONFIG = {
  bgColor: "bg-amber-100",
  icon: <MagicWandIcon color="black" width={20} height={20} />,
};

export const useMessageConfig = (tag) => {
  if (USER_TAGS.includes(tag)) return USER_CONFIG;
  if (LLM_TAGS.includes(tag)) return LLM_CONFIG;
  if (TC_TAGS.includes(tag)) return TC_CONFIG;
  return DEFAULT_CONFIG;
};
