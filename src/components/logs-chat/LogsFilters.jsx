import "./LogsFilters.css";
import LogsFiltersItem from "./LogsFiltersItem";
import LogsFiltersTags from "./LogsFiltersTags";
import LogsFiltersLevel from "./LogsFiltersLevel";
import LogsFiltersTimestamp from "./LogsFiltersTimestamp";

const LogsFilters = () => {
  return (
    <div className="logs-filters-root">
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
