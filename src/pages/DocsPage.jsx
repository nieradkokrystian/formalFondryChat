// import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  QuestionMarkCircledIcon,
  MagnifyingGlassIcon,
  GridIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import GradientText from "../components/animations/GradientText";
import TextType from "../components/animations/TextType";
import FadeContent from "../components/animations/FadeContent";
import Separator from "../components/ui/Separator";
import CreateTaskScreen from "../components/tasks/CreateTaskScreen";
import Logo from "../components/ui/Logo";
import Carousel from "../components/animations/Carousel";
import DocsSidebar from "../components/docs/DocsSidebar";

const Docs = ({ page }) => {
  const [open, setOpen] = useState(false);

  const Card = ({ text, icon, title }) => {
    return (
      <div className="card flex flex-col p-4 bg-white rounded-lg shadow-md min-w-64 w-fit">
        <div className="card-icon mx-auto text-gray-600 mb-4">{icon}</div>
        <div className="card-title text-md lg:text-2xl whitespace-nowrap">
          {title}
        </div>
        <Separator></Separator>
        <div className="card-text text-gray-500">{text}</div>
      </div>
    );
  };

  const CardContent = [
    {
      title: "What is a Task?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      id: 1,
      icon: <QuestionMarkCircledIcon width={50} height={50} />,
    },
    {
      title: "What are Task Types?",

      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: <MagnifyingGlassIcon width={50} height={50} />,
      id: 2,
    },
    {
      id: 3,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      icon: <MagnifyingGlassIcon width={50} height={50} />,
      title: "What is it even for?",
    },
  ];
  return (
    <div className="docs-page  h-full w-full bg-yellow-100 flex">
      <div className="side relative w-[15%] h-full overflow-y-scroll">
        <DocsSidebar
          className={`fixed top-0 left-0 ${
            open ? "scale-x-100" : "scale-x-10"
          }`}
        />
      </div>
      <div className="main-docs w-[70%] h-full max-h-full  overflow-y-scroll flex flex-col items-start justify-start ">
        <div className="MainBlock overflow-y-scroll bg-white h-fit min-h-full min-w-[50%] max-w-[100%] p-4 rounded-lg shadow-lg pl-30 pt-30">
          {page}
        </div>
      </div>
    </div>
  );
};
export default Docs;
