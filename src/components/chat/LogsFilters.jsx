import "./LogsFilters.css";
import { NavigationMenu } from "radix-ui";
import { CaretDownIcon } from "@radix-ui/react-icons";

const LogsFilters = () => {
  return (
    <NavigationMenu.Root className="logs-filters-root">
      <NavigationMenu.List className="logs-filters-list">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="logs-filters-trigger">
            Timestamp
            <CaretDownIcon className="logs-filters-caret" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="logs-filters-content">
            <ul className="logs-filters-dropdown">
              <li>Ostatnia godzina</li>
              <li>Ostatni dzień</li>
              <li>Ostatni tydzień</li>
              <li>Ostatni miesiąc</li>
              <li>Niestandardowy zakres</li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="logs-filters-trigger">
            Level <CaretDownIcon className="logs-filters-caret" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="logs-filters-content">
            <ul className="logs-filters-dropdown">
              <li>10</li>
              <li>20</li>
              <li>30</li>
              <li>40</li>
              <li>50</li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="logs-filters-trigger">
            Tag <CaretDownIcon className="logs-filters-caret" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="logs-filters-content">
            <ul className="logs-filters-dropdown">
              <li>Frontend</li>
              <li>Backend</li>
              <li>Database</li>
              <li>External API</li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

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
