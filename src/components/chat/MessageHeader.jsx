const MessageHeader = ({ tag, icon, error, success }) => {
  const titles = {
    LLMRes: "LLM Response",
    TCReq: "TC Request",
    LLMReq: "LLM Request",
    TCRes: "TC Response",
    UserReq: "Clarifications Requested",
    LLM_Thinking: "LLM Thinking",
  };

  return (
    <div className="message-header">
      {tag !== "UserReq" && (
        <h1 className="message-header-text">
          {icon}
          {titles[tag]}
        </h1>
      )}

      {tag === "UserReq" && (
        <>
          {icon}
          <h1 className="message-header-text clarification">{titles[tag]}</h1>
        </>
      )}

      {error && (
        <h1 className="message-header-text error">
          Error occurred in Agda code
        </h1>
      )}

      {success && <h1 className="message-header-text success">Success</h1>}
    </div>
  );
};

export default MessageHeader;
