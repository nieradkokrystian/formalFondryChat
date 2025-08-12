import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../AuthContext";
import InputComponent from "../uiComponents/InputComponent";
import EmptyChat from "../uiComponents/EmptyChat";
import ChatActive from "../uiComponents/ChatWithMessages";
import axios from "axios";

const Chat = ({ id }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { username, isAuthReady } = useUser();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLLMThinking, setIsLLMThinking] = useState(false);
  const [exceeded, setExceeded] = useState(false);
  const [taskNumber, setTaskNumber] = useState("");
  const pollingInterval = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesRef = useRef(messages); // Use a ref to store the latest messages
  const API_LINK = import.meta.env.VITE_API_BASE;

  // Update the ref whenever the messages state changes
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const checkExceededOrUserRegLast = (messages) => {
    messages = [...messages];
    let last = messages.length - 1;

    if (
      messages[last]?.taskStatWS == "exceeded" ||
      messages[last]?.taskStatWS == "resolved" ||
      messages[last]?.cmCmdWS.tag != "UserReq"
    ) {
      return true;
    }
    return false;
  };

  const handleSend = (inputValue) => {
    if (inputValue.trim() === "") return;
    const exceeded = checkExceededOrUserRegLast(messages);
    if (exceeded) return;
    "input value, id", inputValue, chatId;

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

    axios
      .put(`${API_LINK}/tasks/${chatId}/messages/latest/user-response`, {
        content: inputValue,
        task_id: chatId,
      })
      .then(() => {
        // Start a short polling interval
        pollingInterval.current = setInterval(() => {
          // Use the ref to get the latest messages
          if (checkExceededOrUserRegLast(messagesRef.current)) {
            clearInterval(pollingInterval.current);
            return;
          }
          if (!exceeded) {
            axios
              .get(`${API_LINK}/taskmsg/${chatId}/messages-history`) ///! TO SWAP HERE (DEBUG)
              .then((res) => {
                if (res.data.length > messagesRef.current.length) {
                  setMessages(res.data);
                  setIsLLMThinking(false);
                  axios
                    .get(`${API_LINK}/tasks/${id}/states/latest}`)
                    .then((response) => {
                      setTaskNumber(response.data.stateData._stepCount);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                  if (pollingInterval.current) {
                    clearInterval(pollingInterval.current);
                  }
                }
              })
              .catch((error) => {
                console.log("Error fetching new messages:", error);
                if (pollingInterval.current) {
                  clearInterval(pollingInterval.current);
                }
              });
          }
        }, 5000);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.cmMsgWS?.tag !== "LLM_Thinking")
        );
        setIsLLMThinking(false);
      });
  };
  useEffect(() => {
    // This effect runs after every render where `messages` has changed
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  const fetchMessages = () => {
    if (chatId) {
      axios
        .get(`${API_LINK}/taskmsg/${chatId}/messages-history`)
        .then((res) => {
          setMessages(res.data);
          if (isLLMThinking && res.data.length > messages.length) {
            setIsLLMThinking(false);
          }
        })
        .catch((error) => {
          console.log("Error fetching chat messages:", error);
          setMessages([]);
        });
    }
  };

  useEffect(() => {
    if (isAuthReady && !username) {
      navigate("/");
    }
  }, [username, isAuthReady, navigate]);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages();
    setIsLoading(false);

    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }
    pollingInterval.current = setInterval(fetchMessages, 5000);

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [chatId, API_LINK]);

  if (!isAuthReady || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Chat relative mx-auto w-full max-w-[700px] max-h-[100%] ">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        <ChatActive
          taskNumber={taskNumber}
          messages={messages}
          ref={chatContainerRef}
        />
      )}
      <InputComponent exceeded={exceeded} onSend={handleSend} />
    </div>
  );
};

export { Chat };
