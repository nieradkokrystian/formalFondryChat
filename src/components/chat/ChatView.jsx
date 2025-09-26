import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InputComponent from "./InputComponent";
import EmptyChat from "./EmptyChat";
import ActiveChat from "./ActiveChat";
import {
  getLatestTaskState,
  getTaskEnvironment,
  getMessagesHistory,
  sendUserResponse,
} from "../../api/tasks";

const ChatView = ({ scrollBottom }) => {
  const { chatId } = useParams();
  const isLimitTo100 = useSelector((s) => s.chat.limitTo100);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLLMThinking, setIsLLMThinking] = useState(false);
  const [exceeded, setExceeded] = useState(false);
  const [taskNumber, setTaskNumber] = useState("");
  const [steps, setSteps] = useState("20");
  const [currentSteps, setCurrentSteps] = useState(0);
  const [llm, setLlm] = useState("gpt-3");

  const pollingInterval = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const fetchInitialData = async () => {
      try {
        const taskStateData = await getLatestTaskState(chatId);
        setCurrentSteps(taskStateData.stateData?._stepCount);
      } catch (error) {
        console.error("Error fetching task state:", error);
      }

      try {
        const envData = await getTaskEnvironment(chatId);
        setSteps(envData._maxSteps);
        setLlm(envData._llmModel);
      } catch (error) {
        console.error("Error fetching task environment:", error);
      }
    };

    fetchInitialData();
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
    const lastMsgStatus = lastMessage?.taskStatWS;

    if (lastMsgStatus === "exceeded" || lastMsgStatus === "resolved") {
      return false;
    }

    return lastMessage?.cmCmdWS?.tag === "UserReq";
  };

  const shouldStopPolling = (messageList) => {
    if (!messageList || messageList.length === 0) return false;
    const lastMessage = messageList[messageList.length - 1];
    const lastMsgStatus = lastMessage?.taskStatWS;
    return lastMsgStatus === "exceeded" || lastMsgStatus === "resolved";
  };

  const startPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }

    pollingInterval.current = setInterval(async () => {
      try {
        const newMessages = await getMessagesHistory(chatId);

        const filteredNewMessages = newMessages.filter(
          (msg) => msg.cmMsgWS?.tag !== "LLM_Thinking"
        );
        setMessages(filteredNewMessages);
        setIsLLMThinking(false);

        if (chatId) {
          try {
            const taskData = await getLatestTaskState(chatId);
            setCurrentSteps(taskData.stateData._stepCount);
          } catch (error) {
            console.error("Error fetching task state during polling:", error);
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
      await sendUserResponse(chatId, inputValue);
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
        const messagesData = await getMessagesHistory(chatId);

        const initialMessages = messagesData.filter(
          (msg) => msg.cmMsgWS?.tag !== "LLM_Thinking"
        );
        setMessages(initialMessages);

        const lastMessage = messagesData[messagesData.length - 1];
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
        } else if (!shouldStopPolling(messagesData)) {
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
  }, [chatId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lastMessageIsUserReq =
    messages.length > 0 &&
    messages[messages.length - 1]?.cmCmdWS?.tag === "UserReq";

  const displayedMessages = isLimitTo100 ? messages.slice(-100) : messages;

  return (
    <>
      {!messages.length && <EmptyChat />}
      {messages.length > 0 && (
        <ActiveChat
          taskNumber={taskNumber}
          messages={displayedMessages}
          ref={chatContainerRef}
        />
      )}

      <InputComponent
        exceeded={exceeded}
        LLM={llm}
        steps={steps}
        currentSteps={currentSteps}
        onSend={handleSend}
        lastMsgIsUserReq={lastMessageIsUserReq}
      />
    </>
  );
};

export default ChatView;
