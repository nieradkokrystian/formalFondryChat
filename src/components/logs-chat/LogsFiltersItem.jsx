import { NavigationMenu } from "radix-ui";
import { CaretDownIcon } from "@radix-ui/react-icons";

const LogsFiltersItem = ({ name, children }) => {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="logs-filters-trigger">
        {name}
        <CaretDownIcon className="logs-filters-caret" aria-hidden />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="logs-filters-content">
        {children}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

export default LogsFiltersItem;
