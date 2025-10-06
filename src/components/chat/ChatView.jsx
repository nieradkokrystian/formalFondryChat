import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../ui/Loader";
import InputComponent from "./InputComponent";
import EmptyChat from "./EmptyChat";
import ActiveChat from "./ActiveChat";
import {
  getLatestTaskState,
  getTaskEnvironment,
  getMessagesHistory,
  sendUserResponse,
} from "../../api/tasks";
import { canUserRespond, shouldStopPolling } from "../../utils/chatHelpers";
import retryFetch from "../../utils/retryFetch";

const ChatView = ({ containerRef }) => {
  const { chatId } = useParams();
  const pollingInterval = useRef(null);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState(null);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [llm, setLlm] = useState("");

  const startPolling = useCallback(() => {
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
      }
    }, 3000);
  }, [chatId]);

  const handleSend = async (inputValue) => {
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

    try {
      await sendUserResponse(chatId, inputValue);
      startPolling();
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.cmMsgWS?.tag !== "LLM_Thinking")
      );
    }
  };

  // RESET STATE
  useEffect(() => {
    setMessages([]);
    setIsLoading(true);
    setSteps(null);
    setCurrentSteps(0);
    setLlm("");

    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  }, [chatId]);

  // FETCH INIT DATA
  useEffect(() => {
    if (!chatId) return;

    const fetchInitialData = async () => {
      try {
        const taskData = await retryFetch(() => getLatestTaskState(chatId));
        setCurrentSteps(taskData.stateData?._stepCount);
      } catch (error) {
        console.error("Error fetching task state:", error);
      }

      try {
        const envData = await retryFetch(() => getTaskEnvironment(chatId));
        setSteps(envData._maxSteps);
        setLlm(envData._llmModel);
      } catch (error) {
        console.error("Error fetching task environment:", error);
      }
    };

    const fetchInitialMessages = async () => {
      setIsLoading(true);
      try {
        const messagesData = await retryFetch(() => getMessagesHistory(chatId));
        const initialMessages = messagesData.filter(
          (msg) => msg.cmMsgWS?.tag !== "LLM_Thinking"
        );
        setMessages(initialMessages);

        const lastMessage = messagesData.at(-1);
        const shouldBeThinking =
          lastMessage?.cmCmdWS?.tag === "UserRes" &&
          lastMessage?.taskStatWS === "running";

        if (shouldBeThinking) {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    fetchInitialMessages();

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
    };
  }, [chatId, startPolling]);

  // SCROLL BOTTOM
  useEffect(() => {
    const scrollElement = containerRef?.current;
    if (!scrollElement) return;

    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [chatId, containerRef]);

  return (
    <>
      {isLoading && <Loader />}
      {!messages.length && !isLoading && <EmptyChat />}
      {messages.length > 0 && <ActiveChat messages={messages} />}

      {messages.length > 0 && (
        <InputComponent
          LLM={llm}
          steps={steps}
          currentSteps={currentSteps}
          onSend={handleSend}
          messages={messages}
        />
      )}
    </>
  );
};

export default ChatView;
