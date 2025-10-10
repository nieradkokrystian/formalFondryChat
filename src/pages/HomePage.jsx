import "./HomePage.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {
  QuestionMarkCircledIcon,
  MagnifyingGlassIcon,
  GridIcon,
} from "@radix-ui/react-icons";

import Logo from "../components/ui/Logo";
import CreateTaskScreen from "../components/tasks/CreateTaskScreen";
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
    <div className="home-page">
      {/* TITLE */}
      <div className="home-title">
        <GradientText
          colors={["#4f46e5", "#aebac7", "#4338ca", "#4f46e5"]}
          animationSpeed={7}
          className="gradient-text"
          showBorder={false}
        >
          <TextType
            className="text-type"
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

      {/* CONTENT */}
      {display && (
        <FadeContent
          className="home-content"
          blur={false}
          duration={700}
          easing="ease-in-out"
          delay={100}
          threshold={0.1}
          initialOpacity={0}
        >
          <div
            className={`home-content-introduction ${
              display ? "opacity-100" : "opacity-10"
            }`}
          >
            <h1>
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
                className="gradient-text"
                showBorder={false}
              >
                Quick Introduction
              </GradientText>
            </h1>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
              inventore corrupti ullam provident amet esse vitae, deserunt
              doloremque sequi, quos quaerat libero dignissimos odit molestiae,
              aspernatur magni optio sint? Maxime.
            </p>

            <div className="home-content-tips">
              <div className="home-content-tip">
                <h1>To initiate task creation, click:</h1>
                <div className="wrap">
                  <CreateTaskScreen text={"Create Task"} />
                </div>
              </div>
              <div className="home-content-tip">
                <h1>To access your existing Tasks, press:</h1>
                <div className="wrap">
                  <button className="">
                    <GridIcon width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
            <p>
              You will find them in the{" "}
              <span className="bg-purple-300">Sidebar</span>
              <br /> <br />
              <span className="bg-gray-100">Create Task</span> allows you to
              create a new task, which can be modified with according settings:{" "}
              <br />
            </p>
            <ul>
              <li>
                {" "}
                <span className="bg-gray-100">Task Name</span>: The name of your
                task.
              </li>
              <li>
                <span className="bg-gray-100">Task Type</span>: The type of your
                task.
              </li>
              <li>
                {" "}
                <span className="bg-gray-100">LLM Provider</span>: The LLM
                provider you want to use for your task.
              </li>
              <li>
                {" "}
                <span className="bg-gray-100">Agent Model</span>: The Agent
                model you want to use for your task.
              </li>
            </ul>
            <Link to="/docs/introduction">
              For more detailed explanation, about the whole project, visit{" "}
              <span className="bg-purple-300">Docs</span>{" "}
            </Link>
            <Separator></Separator>

            {/* INFO */}
            <div className="home-info">
              <h1>
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
                  className="gradient-text"
                  showBorder={false}
                >
                  {" "}
                  Feeling Lost? Check this out!
                </GradientText>
              </h1>
              <div className="home-card-wrap">
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
