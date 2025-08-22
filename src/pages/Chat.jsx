import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../AuthContext";
import InputComponent from "../uiComponents/InputComponent";
import EmptyChat from "../uiComponents/EmptyChat";
import ChatActive from "../uiComponents/ChatWithMessages";
import axios from "axios";
import "../uiComponents/chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { username, isAuthReady, id: userId } = useUser();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLLMThinking, setIsLLMThinking] = useState(false);
  const [exceeded, setExceeded] = useState(false);
  const [taskNumber, setTaskNumber] = useState("");
  const pollingInterval = useRef(null);
  const chatContainerRef = useRef(null);
  const [steps, setSteps] = useState("20");
  const [currentSteps, setCurrentSteps] = useState(0);
  const [llm, setLlm] = useState("gpt-3");
  const scrollBottom = useRef(false);
  const [isChecked, setIsChecked] = useState(false)

  const API_LINK = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    axios
      .get(`${API_LINK}/taskstate/${chatId}/states/latest`)
      .then((response) => {
        setCurrentSteps(response.data.stateData._stepCount);
      });

    axios
      .get(`${API_LINK}/taskenv/${chatId}/env`)
      .then((response) => {
        setSteps(response.data._maxSteps);
        setLlm(response.data._llmModel);
        console.log("worked here", steps, llm);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chatId]);


const scrollToBottom = () => {
  const chatElement = scrollBottom.current;
  if (!chatElement) return;

  const isAtBottom =
    chatElement.scrollHeight - chatElement.scrollTop <=
    chatElement.clientHeight + 100; 

  if (isAtBottom) {
    setTimeout(() => {
      chatElement.scrollTo({
        top: chatElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }
};
  const canUserRespond = (messageList) => {
    if (!messageList || messageList.length === 0) return true;
    const lastMessage = messageList[messageList.length - 1];

    if (
      lastMessage?.taskStatWS === "exceeded" ||
      lastMessage?.taskStatWS === "resolved"
    ) {
      return false;
    }

    return lastMessage?.cmCmdWS?.tag === "UserReq";
  };

  const shouldStopPolling = (messageList) => {
    if (!messageList || messageList.length === 0) return false;
    const lastMessage = messageList[messageList.length - 1];
    return (
      lastMessage?.taskStatWS === "exceeded" ||
      lastMessage?.taskStatWS === "resolved"
    );
  };

  const startPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }

    pollingInterval.current = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/taskmsg/${chatId}/messages-history`
        );
        const newMessages = response.data;

        const filteredNewMessages = newMessages.filter(
          (msg) => msg.cmMsgWS?.tag !== "LLM_Thinking"
        );
        setMessages(filteredNewMessages);
        setIsLLMThinking(false);
        if (chatId) {
          try {
            const taskResponse = await axios.get(
              `${API_LINK}/taskstate/${chatId}/states/latest`
            );
            setCurrentSteps(taskResponse.data.stateData._stepCount);
          } catch (error) {
            console.error("Error fetching task state:", error);
          }
        }
        if (shouldStopPolling(newMessages)) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
      } catch (error) {
        console.error("Polling error:", error);
        setIsLLMThinking(false);
      }
    }, 3000);
  };

  const handleSend = async (inputValue) => {
    // if (inputValue.trim() === "") return;
    if (!canUserRespond(messages)) return;

    const userMessage = {
      cmCmdWS: { contents: inputValue, tag: "UserRes" },
      taskStatWS: "running",
    };

    const thinkingMessage = {
      cmMsgWS: { contents: "LLM is thinking...", tag: "LLM_Thinking" },
      taskStatWS: "running",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      thinkingMessage,
    ]);
    setIsLLMThinking(true);

    try {
      await axios.put(
        `${API_LINK}/tasks/${chatId}/messages/latest/user-response`,
        {
          content: inputValue,
          task_id: chatId,
        }
      );

      startPolling();
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.cmMsgWS?.tag !== "LLM_Thinking")
      );
      setIsLLMThinking(false);
    }
  };

  useEffect(() => {
    setExceeded(!canUserRespond(messages));
  }, [messages]);


  // ? SCROLL BOTTOM
  useEffect(() => {
    scrollToBottom(); 
  }, [chatId, messages]);

  useEffect(() => {
    if (!chatId) return;

    const fetchInitialMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_LINK}/taskmsg/${chatId}/messages-history`
        );
        const initialMessages = response.data.filter(
          (msg) => msg.cmMsgWS?.tag !== "LLM_Thinking"
        );
        setMessages(initialMessages);

        const lastMessage = response.data[response.data.length - 1];
        const shouldBeThinking =
          lastMessage?.cmCmdWS?.tag === "UserRes" &&
          lastMessage?.taskStatWS === "running";

        if (shouldBeThinking) {
          setIsLLMThinking(true);
          const thinkingMessage = {
            cmMsgWS: { contents: "LLM is thinking...", tag: "LLM_Thinking" },
            taskStatWS: "running",
          };
          setMessages((prev) => [...prev, thinkingMessage]);
          startPolling();
        } else if (!shouldStopPolling(response.data)) {
          startPolling();
        }
      } catch (error) {
        console.error("Error fetching initial messages:", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMessages();

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
    };
  }, [chatId, API_LINK]);

  useEffect(() => {
    if (isAuthReady && !username) {
      navigate("/");
    }
  }, [username, isAuthReady, navigate]);

  if (!isAuthReady || isLoading) {
    return <div>Loading...</div>;
  }
  const lastMessageIsUserReq =
    messages.length > 0 &&
    messages[messages.length - 1]?.cmCmdWS?.tag === "UserReq";

 const displayedMessages = isChecked ? messages.slice(-100): messages;

  const Checkbox = () => {
console.log(isChecked, displayedMessages)
      return (
       <div className="fixed flex-row  flex top-30 right-50 h-10 items-center rounded-full px-3 justify-center border-1 border-gray-400 text-gray-500 bg-white gap-1  w-fit"> <h1>Last Hundred Messages?</h1><input type="checkbox" name="" className="w-7 text-gray-500 aspect-square" id="checkTrimmedArray" checked = {isChecked ? true:false} onChange={(e)=>setIsChecked(!isChecked)} /></div>
         )
  }
  
return (
  <div
    className="Chat relative mx-auto w-full max-w-[750px] lg:w-[750px]   h-[90vh] overflow-y-scroll pb-[60px]   max-h-[100%]"
    ref={scrollBottom}>

    {messages.length === 0 ? (
      <EmptyChat />
    ) : (
      
      <ChatActive
        taskNumber={taskNumber}
        messages={displayedMessages}
        ref={chatContainerRef}
      />
    )}
    <InputComponent
        Checkbox = {Checkbox}
        exceeded={exceeded}
        LLM={llm}
        steps={steps}
        currentSteps={currentSteps}
        onSend={handleSend}
        chatId={chatId}
        lastMessageIsUserReq={lastMessageIsUserReq}
      />
    </div>
  );
};

export { Chat };
