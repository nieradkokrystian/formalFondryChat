import "./EmptyChat.css";

const EmptyChat = () => {
  return (
    <div className="empty-chat">
      <h1>The chat is empty.</h1>
      <p>
        An error may have occurred, please reload page or start a new task...
      </p>
    </div>
  );
};
export default EmptyChat;
