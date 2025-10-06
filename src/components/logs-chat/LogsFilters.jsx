import "./LogsFilters.css";
import { NavigationMenu } from "radix-ui";
import LogsFiltersItem from "./LogsFiltersItem";
import LogsFiltersTags from "./LogsFiltersTags";
import LogsFiltersLevel from "./LogsFiltersLevel";
import LogsFiltersTimestamp from "./LogsFiltersTimestamp";

const LogsFilters = () => {
  return (
    <NavigationMenu.Root className="logs-filters-root">
      <NavigationMenu.List className="logs-filters-list">
        <LogsFiltersItem name="Timestamp">
          <LogsFiltersTimestamp />
        </LogsFiltersItem>
        <LogsFiltersItem name="Level">
          <LogsFiltersLevel />
        </LogsFiltersItem>
        <LogsFiltersItem name="Tag">
          <LogsFiltersTags />
        </LogsFiltersItem>

        <NavigationMenu.Indicator className="logs-filters-indicator">
          <div className="logs-filters-arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="logs-filters-viewport-position">
        <NavigationMenu.Viewport className="logs-filters-viewport" />
      </div>
    </NavigationMenu.Root>
  );
};

export default LogsFilters;
