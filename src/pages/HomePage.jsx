import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { GridIcon } from "@radix-ui/react-icons";
import {
  QuestionMarkCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import Logo from "../components/ui/Logo";
import CreateTaskScreen from "../components/navbar/CreateTaskScreen";
import FadeContent from "../components/animations/FadeContent";
import Separator from "../components/ui/Separator";
import GradientText from "../components/animations/GradientText";
import Carousel from "../components/animations/Carousel";
import TextType from "../components/animations/TextType";

const HomePage = () => {
  const navigate = useNavigate();
  const { username, isAuthReady } = useUser();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (isAuthReady && !username) {
      navigate("/login");
    }
  }, [username, isAuthReady, navigate]);

  if (!isAuthReady) {
    return <div>Loading authentication state...</div>;
  }

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
    <div className="landing-page mx-auto p-8 rounded-2xl border-1 border-gray-400 shadow-lg w-3xl mt-20">
      <div className="title-block flex justify-between items-center p-2">
        <GradientText
          colors={["#4f46e5", "#aebac7", "#4338ca", "#4f46e5"]}
          animationSpeed={7}
          className="text-4xl "
          showBorder={false}
        >
          <TextType
            className=" text-3xl mb-1"
            text={[
              "Welcome to Formal Foundry",
              "This is a home page",
              "Let's get started!",
            ]}
            loop={true}
            typingSpeed={50}
            showCursor={true}
            pauseDuration={1500}
            textColors={"#000000"}
            startOnVisible={true}
            onSentenceComplete={() => {
              setDisplay(true);
            }}
          />
        </GradientText>

        <Logo />
      </div>
      <Separator orientation={"horizontal"} decorative={true} />

      {display && (
        <FadeContent
          className="fade-content"
          blur={false}
          duration={700}
          easing="ease-in-out"
          delay={100}
          threshold={0.1}
          initialOpacity={0}
        >
          <div
            className={`introduction ${display ? "opacity-100" : "opacity-10"}`}
          >
            <h1 className="w-full  p-2 flex justify-start items-center">
              <GradientText
                colors={[
                  "#4338ca",
                  "#4338ca",
                  "#4f46e5",
                  "#aebac7",
                  "#4338ca",
                  "#4338ca",
                  "#4338ca",
                ]}
                animationSpeed={3}
                className="text-4xl "
                showBorder={false}
              >
                Quick Introduction
              </GradientText>
            </h1>
            <p className="text-md p-2 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
              inventore corrupti ullam provident amet esse vitae, deserunt
              doloremque sequi, quos quaerat libero dignissimos odit molestiae,
              aspernatur magni optio sint? Maxime.
            </p>
            <div className="tips flex w-full p-2 bg-gray-100 mt-4 mb-4 rounded-lg gap-1.5 justify-around">
              <div className="tip flex flex-col p-3 bg-white rounded-lg">
                <h1 className="text-lg m-3">
                  To initiate task creation, click:
                </h1>
                <div className="wrap mx-auto">
                  <CreateTaskScreen text={"Create Task"} />
                </div>
              </div>
              <div className="tip flex flex-col p-3 bg-white rounded-lg">
                <h1 className="text-lg m-3">
                  To access your existing Tasks, press:
                </h1>
                <div className="wrap mx-auto">
                  <button className="Sidebar-toggle cursor-target aspect-square ">
                    <GridIcon width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-md p-2 text-gray-600">
              You will find them in the{" "}
              <span className="bg-purple-300 p-1 rounded-md text-violet-700 italic">
                top-left corner
              </span>{" "}
              of your screen. <br /> <br />
              <span className="bg-gray-100 p-1 rounded-md font-semibold text-gray-600">
                Create Task
              </span>{" "}
              allows you to create a new task, which can be modified with
              according settings: <br />
            </p>
            <ul className="p-2 gap-1 flex flex-col text-gray-600">
              <li>
                {" "}
                <span className="bg-gray-100 p-1 rounded-md font-semibold text-gray-600">
                  Task Name
                </span>
                : The name of your task.
              </li>
              <li>
                <span className="bg-gray-100 p-1 rounded-md font-semibold text-gray-600">
                  Task Type
                </span>
                : The type of your task.
              </li>
              <li>
                {" "}
                <span className="bg-gray-100 p-1 rounded-md font-semibold text-gray-600">
                  LLM Provider
                </span>
                : The LLM provider you want to use for your task.
              </li>
              <li>
                {" "}
                <span className="bg-gray-100 p-1 rounded-md font-semibold text-gray-600">
                  Agent Model
                </span>
                : The Agent model you want to use for your task.
              </li>
            </ul>
            {/* !LINK */} {/* !LINK */}
            <Link to="/docs/introduction">
              For more detailed explanation, as well as additional infromatin
              about the whole project, visit{" "}
              <span className="bg-purple-300 p-1 rounded-md text-violet-700 italic underline">
                Docs
              </span>{" "}
            </Link>
            {/* !LINK */} {/* !LINK */}
            <Separator></Separator>
            <div className="info">
              <h1 className="p-2">
                <GradientText
                  colors={[
                    "#4338ca",
                    "#4338ca",
                    "#4f46e5",
                    "#aebac7",
                    "#4338ca",
                    "#4338ca",
                    "#4338ca",
                  ]}
                  animationSpeed={3}
                  className="text-4xl "
                  showBorder={false}
                >
                  {" "}
                  Feeling Lost? Check this out!
                </GradientText>
              </h1>
              <div className="card-wrap w-full mx-auto flex justify-center gap-4 p-2 mt-2 overflow-x-visible ">
                <Carousel
                  items={CardContent}
                  baseWidth={`600`}
                  pauseOnHover={true}
                  round={false}
                  itemWidth={300}
                  dragConstraints={{ left: -1000, right: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  dragElastic={0.2}
                  dragPropagation={true}
                  initialIndex={0}
                  showArrows={true}
                  showDots={true}
                  showIndicators={true}
                />
              </div>
            </div>
          </div>
        </FadeContent>
      )}
    </div>
  );
};

export default HomePage;
