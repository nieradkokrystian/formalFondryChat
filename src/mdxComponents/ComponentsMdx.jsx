import TextType from "../animations/TextType";
import GradientText from "../animations/TextAnimations/GradientText/GradientText";
import { Link } from "react-router-dom";
import Carousel from "../animations/Components/Carousel/Carousel";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, okaidia, oneLight, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as React from "react";
import { Accordion } from "radix-ui";
import { ChevronDownIcon, InfoCircledIcon, CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Logo from "../uiComponents/Logo";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { IconContext } from "react-icons/lib";




// ***  @text => Array of strings ***
// ***  @className => Additional class names for styling ***/
// ***  @textColors => Color for the text in an ! ARRAY in hex***/
export const H1 = ({ text, className, textColors, isTyped, header }) => {
  return text && isTyped ? (
    <GradientText
      colors={textColors}
      animationSpeed={3}
      className={`text-4xl ${className} mb-4`}
      showBorder={false}>
      <TextType
        className={` text-4xl ${header ? "lg:text-5xl text-md" : "lg:text-4xl text-xl"}  `}
        text={text}
        loop={true}
        typingSpeed={50}
        showCursor={true}
        pauseDuration={1500}
        startOnVisible={true}
      />
      {console.log("Typed Text: ", textColors)}
    </GradientText>
  ) : (
    <GradientText
      colors={textColors}
      animationSpeed={3}
      className={`text-4xl ${className} mb-4 max-w-3/4 w-3/4 whitespace-break-spaces ${header ? "lg:text-5xl text-md" : "lg:text-4xl text-xl"}`}
      showBorder={false}>
      {text[0]}
    </GradientText>
  );
};

// *** @text => String ***
// *** @defaultColor => Boolean ***/
// *** @className => Additional class names for styling ***/
// *** @isLink => Boolean to check if the text is a link ***/
// *** @path => Path to navigate if isLink is true {/PATH} ***/

export const Span = ({ children, defaultColor, className, isLink, path }) => {
  return (
    <span
      className={` ${className}   ${
        defaultColor
          ? "bg-gray-100 p-1 rounded-md font-semibold text-gray-600"
          : "bg-purple-300 p-1 rounded-md text-violet-700 italic"
      }`}>
      {isLink ? (
        <Link about="_blank" target="_blank" to={path} className="underline">
          {children}
        </Link>
      ) : (
        <>
         { children }
        </>
       
      )}
    </span>
  );
};

/*** EXAMPLE CONTENT FOR CAROUSEL COMPONENT
 * 
 * 
  const content = [
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
  
  ***/

// *** @content => Array of objects with content for each card ***
// *** @className => Additional class names for styling ***/
// *** @baseWidth => Base width for the carousel ***/
// *** @round => Boolean to round the items to carousel's width ***/
// *** @itemWidth => Width of each item in the carousel ***/
// *** @showDots => Boolean to show dots in the carousel ***/

export const Carousel2 = ({
  content,
  className,
  baseWidth,
  round,
  itemWidth,
  showDots,
}) => {
  return (
    <div className="card-wrap w-full mx-auto flex justify-center gap-4 p-2 mt-2 overflow-x-visible ">
      <Carousel
        items={content}
        baseWidth={baseWidth}
        pauseOnHover={true}
        round={round}
        itemWidth={itemWidth}
        className={`carousel ${className}`}
        dragConstraints={{ left: -1000, right: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        dragElastic={0.2}
        dragPropagation={true}
        initialIndex={0}
        showArrows={true}
        showDots={showDots}
        showIndicators={true}
      />
    </div>
  );
};

// *** @Items => Array of objects with title and description ***
// *** @className => Additional class names for styling ***/
// *** @defaultColor => Boolean to check if the text should have default color ***/
// *** @isLink => Boolean to check if the text is a link ***/
// *** @path => Path to navigate if isLink is true {/PATH} ***/
// *** @text => String to display in the list ***/
// *** @description => String to display in the list item ***/
// *** @textColors => Array of colors for the text ***/
// *** @isTyped => Boolean to check if the text should be typed ***/

export const List = ({ Items, className, defaultColor, isLink, path }) => {
  return (
    <ul className={`list-disc ${className} list-decimal mb-10`}>
      {Items?.map((item, index) => (
        <li key={index} className={`flex items-center gap-2 mt-2 max-w-3/4`}>
          {console.log("Item: ", item.title)}
          <Span
            
            defaultColor={defaultColor}
            isLink={isLink}
            path={path}

          >{item.title}
            </Span>
          {item.description && (
            <span className="text-gray-500 text-md">{item.description}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
// *** @text => String to display in the paragraph ***/
// *** @className => Additional class names for styling ***/

export const Text = ({ className, children }) => {
  return <p className={`text-gray-600 ${className} text-lg max-w-[80%] lg:max-w-2/3 leading-9`}>{children}</p>;
};

// *** @code => String of code to display in the code block ***/
// *** @className => Additional class names for styling ***/
// *** @theme => Theme for the code block ***/
// *** @language => Language for syntax highlighting ***/
// *** Example: <CodeBlock code={codeString} className="my-code" theme={oneDark} language="javascript" /> ***/
//https://www.npmjs.com/package/react-syntax-highlighter   for styling options

export const CodeBlock = ({ code, className, theme, language }) => {
  {console.log("Code: ", theme)}
  return (
    <SyntaxHighlighter
      language={language}
      className={`code-block ${className}`}
      style={theme}
      >
        
      {code}
    </SyntaxHighlighter>
  );
};

export const AccordionDemo = ({ width, items, className }) => {
  const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={`
        "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-mauve12",
        ${className}
      )`}
      {...props}
      ref={forwardedRef}>
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={`
          "group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-2xl leading-none text-gray-500 shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-yellow-200",
          ${className}
        )`}
        {...props}
        ref={forwardedRef}>
        {children}
        <ChevronDownIcon
          className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={`
        "overflow-hidden bg-mauve2 text-lg  text-gray-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
        ${className}
      `}
      {...props}
      ref={forwardedRef}>
      <div className="px-5 py-[15px]">{children}</div>
    </Accordion.Content>
  )
);
  return(
  <Accordion.Root
    className={`w-[${width}] rounded-md bg-white border-1 p-1 border-gray-200 ${className}`}
    type="single"
    defaultValue="item-1"
    collapsible>
    {items && items.length > 0
      ? items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))
      : ""}
  </Accordion.Root>)
;}



export const Important = ({ warning, text, className }) => {
  return warning == "bad" ? (
    <span
      className={`bg-red-100 m-3 text-md lg:text-lg text-red-800 p-2 h-fit w-[60%] flex items-center justify-start rounded-md ${className}`}
    >
      <CrossCircledIcon height={50} width={50} className="m-3" />
      {text}
    </span>
  ) : warning == "mid" ? (
    <span
      className={`bg-yellow-100 m-3 text-md lg:text-lg text-yellow-800 p-2 h-fit w-[60%] flex items-center justify-start rounded-md ${className}`}
    >
      <InfoCircledIcon height={50} width={50} className="m-3" />
      {text}
    </span>
  ) : (
    <span
      className={`bg-green-100 m-3 text-md lg:text-lg text-green-800 p-2 h-fit w-[60%] flex items-center justify-start rounded-md ${className}`}
    >
      <CheckCircledIcon height={50} width={50} className="m-3" />
      {text}
    </span>
  );
};

export const CenterContainer = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg p-6 overflow-y-auto"></div>
    </div>
  );
};

export const H2 = ({ text, className }) => {
  return (
    <h2 className={`text-3xl font-bold text-gray-600 mb-10 ${className}`}>{text}</h2>
  );
};
export const Wrap = () => {
  return (
    <div className="p-8 rounded-2xl  bg-transparent border-1 border-gray-400 shadow-lg  h-2xl mt-20 min-h-fit max-h-9xl overflow-y-scroll flex items-center justify-center h-full w-full">
      <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg p-6 overflow-y-auto"></div>
    </div>
  );
};

export const NextButton =({children})=>{
  return (
    <Link to="/docs/getting-started" className="nav-buttons text-white  bg-custom-30 px-4 py-2 rounded-md hover:bg-gray-600 p-4">
      {children}
    </Link>
     
    
  );
}
export const PrevButton =({children})=>{
  return (
      <Link to="/docs/getting-started" className="nav-buttons bg-blue-500  text-white px-4 py-2 rounded-md hover:bg-gray-600 p-4">
      {children}
    </Link>
   

  );
}

export const Image = ({path})=>{
  return (
    <img src={path} alt="Placeholder" className="w-32 h-32 rounded-full shadow-lg" />
  );
}

export const Footer = () => {
  const [on, setOn] = React.useState(false)
  return (
    <div className="p-4 mt-10  border-t-2 border-gray-400 bg-white items-center gap-10 w-full flex flex-row h-100">
      <div className="column flex flex-col items-start  h-3/5 ">
        <h1 className="text-gray-600 text-lg flex w-fit gap-1"><Logo /></h1>
        <p className="text-gray-500 mt-2">Formal Foundry, LLC. </p>
        <p className="text-gray-500 mt-2">218 NW 24th Street, 2nd Floor</p>
        <p className="text-gray-500 mt-2">Miami FL 33127</p>
        <Link></Link>
        <button className="brave-button mt-8 text-gray-300" onClick={(e) => { setOn(!on) }}>Mystery?</button>
        {on && (
          <h1 className="text-sm text-gray-300"> Shameless plug? <br /> Yes it is! <br /> <Link target="_blank" className="text-purple-500" about="_blank" to={`https://github.com/exelenze`}> Find the brave Intern.</Link> </h1>
        )}
      </div>
      <div className="column flex flex-col items-start  h-3/5 ">
        <h1 className="text-3xl bold text-gray-800">Learn our tool</h1>
          <ul className="text-gray-500">
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Introduction</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Getting Started</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Features</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Faq</Link></li>
      </ul>
      </div>
      <div className="column flex flex-col items-start  h-3/5">
        <h1 className="text-3xl bold text-gray-800">API Reference</h1>
          <ul className="text-gray-500">
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Used API's</Link></li>
  
      </ul>
      </div>
      <div className="column flex flex-col items-start  h-3/5">
        <h1 className="text-3xl bold text-gray-800">More</h1>
          <ul className="text-gray-500">
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Terms of Service</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Formal Foundry</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Contact</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Legal </Link></li>
      </ul>
      </div>
      <div className="column flex flex-col items-start h-3/5">
        <h1 className="text-3xl bold text-gray-800">Community</h1>
          <ul className="text-gray-500">
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Terms of Service</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Formal Foundry</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Contact</Link></li>
        <li className="mt-1 hover:bg-purple-50 hover:text-purple-600"><Link>Legal </Link></li>
        </ul>
        <div className="socials flex flew-row mt-3 justify-start gap-2">
          <IconContext.Provider value={{color:"purple", className: "text-2xl "}}>
          <Link className=" aspect-square rounded-full p-3 border-1 border-purple-300 bg-purple-200 flex justify-center items-center hover:bg-purple-50 " to={`https://x.com/FormalFoundry`}><FiTwitter/></Link>
          <Link className=" aspect-square rounded-full p-3 border-1 border-purple-300 bg-purple-200 flex justify-center items-center hover:bg-purple-50 " to={`https://www.linkedin.com/company/formalfoundry/`}><FiLinkedin/></Link>
            <Link className=" aspect-square rounded-full p-3 border-1 border-purple-300 bg-purple-200 flex justify-center items-center hover:bg-purple-50 " to={`https://github.com/nieradkokrystian/`}><FiGithub /></Link>
            </IconContext.Provider>
        </div>
     </div>
    
     </div>
   )
}