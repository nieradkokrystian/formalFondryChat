import "./LogsView.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import LogsFilters from "./LogsFilters";

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

const LogsView = ({ containerRef }) => {
  const logs = useSelector((s) => s.log.logs);

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format("HH:mm:ss DD/MM/YYYY");
  };

  useEffect(() => {
    const scrollElement = containerRef?.current;
    if (!scrollElement) return;

    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [containerRef]);

  return (
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
            key={log.timestamp}
            value={String(log.id)}
            className={`log-item ${getBackgroundColor(log.level)} `}
          >
            <Accordion.Header>
              <Accordion.Trigger className="log-item-header">
                <div className="log-item-header-data">
                  <span>{formatTimestamp(log.timestamp)}</span>
                  <span>Level: {log.level}</span>
                  <span>Tags: {log.tag.join(", ")}</span>
                </div>

                <div className="log-item-header-icon">
                  <ChevronDownIcon className="log-item-chevron" aria-hidden />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="log-item-content">
              <div className="log-item-content-text">{log.text}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

export default LogsView;
