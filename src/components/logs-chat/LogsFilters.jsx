import "./LogsFilters.css";
import { NavigationMenu } from "radix-ui";
import LogsFiltersItem from "./LogsFiltersItem";
import LogFiltersTags from "./LogFiltersTags";
import LogFiltersLevel from "./LogFiltersLevel";
import { useDispatch } from "react-redux";
import { getLogs } from "../../store/features/logSlice";
import { useParams } from "react-router";

const LogsFilters = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();

  return (
    <NavigationMenu.Root
      className="logs-filters-root"
      // onValueChange={() => console.log("Value Changed")}
      onMouseLeave={() => dispatch(getLogs(chatId))}
    >
      <NavigationMenu.List className="logs-filters-list">
        {/* <LogsFiltersItem name="Timestamp">
          <ul className="logs-filters-dropdown">
            <li>Ostatnia godzina</li>
            <li>Ostatni dzień</li>
          </ul>
        </LogsFiltersItem> */}
        <LogsFiltersItem name="Level">
          <LogFiltersLevel />
        </LogsFiltersItem>
        <LogsFiltersItem name="Tag">
          <LogFiltersTags />
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
