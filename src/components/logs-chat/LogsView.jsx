import "./LogsView.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { getAvTags, getLogs } from "../../store/features/logSlice";
import LogsFilters from "./LogsFilters";
import Loader from "../ui/Loader";

const getBackgroundColor = (code) => {
  if (code < 0 || code >= 100 || typeof code !== "number") {
    return "bg-gray-100";
  }

  const colors = [
    "bg-green-100", // 0-9
    "bg-yellow-100", // 10-19
    "bg-red-100", // 20-29
    "bg-blue-100", // 30-39
    "bg-violet-100", // 40-49
    "bg-pink-100", // 50-59
    "bg-orange-100", // 60-69
    "bg-cyan-100", // 70-79
    "bg-lime-100", // 80-89
    "bg-amber-100", // 90-99
  ];

  const index = Math.floor(code / 10);
  return colors[index] || "bg-gray-100";
};

const LogsView = ({ containerRef }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const logs = useSelector((s) => s.log.logs);
  const isLoading = useSelector((s) => s.log.isLoadingLogs);

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.logTimestamp) - new Date(b.logTimestamp)
  );

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format("HH:mm:ss DD/MM/YYYY");
  };

  useEffect(() => {
    const scrollElement = containerRef?.current;
    if (!scrollElement) return;

    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [containerRef]);

  useEffect(() => {
    dispatch(getLogs(chatId));
    dispatch(getAvTags(chatId));
  }, [dispatch, chatId]);

  return (
    <>
      {isLoading && <Loader />}

      {!logs.length && !isLoading && (
        <div className="logs-empty">
          <h1>The logs are empty.</h1>
          <p>Add messages to chat to fill in logs.</p>
        </div>
      )}

      {logs.length > 0 && (
        <>
          <LogsFilters />
          <Accordion.Root
            className="logs-container"
            type="single"
            defaultValue={[]}
            collapsible="true"
          >
            {sortedLogs.map((log) => (
              <Accordion.Item
                key={log.logTimestamp}
                value={String(log.logTimestamp)}
                className={`log-item ${getBackgroundColor(log.logLevel)} `}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="log-item-header">
                    <div className="log-item-header-data">
                      <span>{formatTimestamp(log.logTimestamp)}</span>
                      <span>Level: {log.logLevel}</span>
                      <span>Tags: {log?.logTags?.join(", ")}</span>
                    </div>

                    <div className="log-item-header-icon">
                      <ChevronDownIcon
                        className="log-item-chevron"
                        aria-hidden
                      />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="log-item-content">
                  <div className="log-item-content-text">{log.logMessage}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </>
      )}
    </>
  );
};

export default LogsView;
