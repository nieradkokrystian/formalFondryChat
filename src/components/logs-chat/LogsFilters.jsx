import "./LogsFilters.css";
import { useSelector } from "react-redux";
import LogsFiltersItem from "./LogsFiltersItem";
import LogsFiltersTags from "./LogsFiltersTags";
import LogsFiltersLevel from "./LogsFiltersLevel";
import LogsFiltersTimestamp from "./LogsFiltersTimestamp";

const LogsFilters = () => {
  const isSidebarOpen = useSelector((s) => s.ui.isSidebarOpen);

  return (
    <div className={`logs-filters-root ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <ul className="logs-filters-list">
        <LogsFiltersItem name="Timestamp">
          <LogsFiltersTimestamp />
        </LogsFiltersItem>

        <LogsFiltersItem name="Level">
          <LogsFiltersLevel />
        </LogsFiltersItem>

        <LogsFiltersItem name="Tag">
          <LogsFiltersTags />
        </LogsFiltersItem>
      </ul>
    </div>
  );
};

export default LogsFilters;
