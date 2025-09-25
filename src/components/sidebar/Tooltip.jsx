import "./Tooltip.css";
import { Tooltip as TooltipCMP } from "radix-ui";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const Tooltip = ({ status, type }) => {
  return (
    <TooltipCMP.Provider delayDuration={100}>
      <TooltipCMP.Root>
        <TooltipCMP.Trigger asChild>
          <button className="IconButtonTooltip">
            <InfoCircledIcon height={"50%"} width={"30"} />
          </button>
        </TooltipCMP.Trigger>
        <TooltipCMP.Portal>
          <TooltipCMP.Content
            className="TooltipContent"
            sideOffset={0}
            side="right"
          >
            {status} <br />
            {type}
            <TooltipCMP.Arrow className="TooltipArrow" />
          </TooltipCMP.Content>
        </TooltipCMP.Portal>
      </TooltipCMP.Root>
    </TooltipCMP.Provider>
  );
};

export default Tooltip;
