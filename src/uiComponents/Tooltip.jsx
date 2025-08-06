import * as React from "react";
import { Tooltip } from "radix-ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./styles.css";

const TooltipSidebar = ({ running, type }) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButtonTooltip">
            <MagnifyingGlassIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            sideOffset={0}
            side="left">
            {(type, running)}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipSidebar;
