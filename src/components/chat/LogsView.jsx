import { useEffect } from "react";
import LOGS from "./TEMP-LOGS";
import dayjs from "dayjs";

const LogsView = ({ scrollBottom }) => {
  const getBackgroundColor = (code) => {
    switch (code) {
      case 10:
        return "bg-green-100";
      case 20:
        return "bg-yellow-100";
      case 30:
        return "bg-red-100";
      case 40:
        return "bg-blue-100";
      case 50:
        return "bg-violet-100";
      default:
        return "bg-gray-100";
    }
  };

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format("HH:mm:ss DD/MM/YYYY");
  };

  const scrollToBottom = () => {
    const scrollElement = scrollBottom?.current;
    if (!scrollElement) return;

    scrollElement.scrollTop = scrollElement.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sortedLogs = [...LOGS].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="mt-[60px] p-4 space-y-3">
      {sortedLogs.map((log) => (
        <div
          key={log.timestamp}
          className={`${getBackgroundColor(
            log.code
          )} rounded-lg px-4 py-2 shadow-sm`}
        >
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600 font-mono whitespace-nowrap">
              {formatTimestamp(log.timestamp)}
            </span>
            <span className="font-medium text-gray-700 whitespace-nowrap">
              Code: {log.code}
            </span>
            <span className="text-gray-800 flex-1 truncate">{log.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogsView;
