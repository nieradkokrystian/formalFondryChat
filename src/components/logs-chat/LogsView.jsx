import "./LogsView.css";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { getAvTags, getLogs } from "../../store/features/logSlice";
import { logsBgColor } from "../../utils/logsBgColor";
import LogsFilters from "./LogsFilters";

const LogsView = ({ containerRef }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const logs = useSelector((s) => s.log.logs);
  const isLoading = useSelector((s) => s.log.isLoadingLogs);
  const filters = useSelector((s) => s.log.filters);

  const sortedLogs = [...logs].sort((a, b) => {
    const dateA = new Date(a.logTimestamp);
    const dateB = new Date(b.logTimestamp);

    if (filters.sortOrder === "desc") {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

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

  useEffect(() => {
    if (chatId) {
      dispatch(getLogs(chatId));
    }
  }, [dispatch, chatId, filters.level, filters.tags]);

  return (
    <>
      {!logs.length && !isLoading && (
        <div className="logs-empty">
          <h1>The logs are empty.</h1>
          <p>Change filters or add messages to chat to fill in logs.</p>
        </div>
      )}

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
              className={`log-item ${logsBgColor(log.logLevel)} `}
            >
              <Accordion.Header>
                <Accordion.Trigger className="log-item-header">
                  <div className="log-item-header-data">
                    <span>{formatTimestamp(log.logTimestamp)}</span>
                    <span>Level: {log.logLevel}</span>
                    <span>Tags: {log?.logTags?.join(", ")}</span>
                  </div>

                  <div className="log-item-header-icon">
                    <ChevronDownIcon className="log-item-chevron" aria-hidden />
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
    </>
  );
};

export default LogsView;
