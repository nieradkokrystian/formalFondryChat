const MessageHeader = ({ tag, icon, isError }) => {
  const titles = {
    LLMRes: "LLM Response",
    TCReq: "TC Request",
    LLMReq: "LLM Request",
    TCRes: "TC Response",
    UserReq: "Clarifications Requested",
    LLM_Thinking: "LLM Thinking",
  };

  const isUserReq = tag === "UserReq";

  return (
    <div className="message-header">
      {!isUserReq && (
        <h1 className="message-header-text">
          {icon}
          {titles[tag]}
        </h1>
      )}

      {isUserReq && (
        <>
          {icon}
          <h1 className="message-header-text clarification">{titles[tag]}</h1>
        </>
      )}

      {isError && (
        <h1 className="message-header-text error">
          Error occurred in Agda code
        </h1>
      )}
    </div>
  );
};

export default MessageHeader;
