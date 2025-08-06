import * as React from "react";
import { Popover } from "radix-ui";
import { GearIcon, Cross2Icon } from "@radix-ui/react-icons";
import "../uiComponents/popover.css";

const PopoverSettings = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="IconButtonPopover" aria-label="Update dimensions">
        <GearIcon />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5} align="end">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p className="Text" style={{ marginBottom: 10 }}>
            Additional Settings
          </p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="provider">
              LLM provider:
            </label>
            <select className="Input" id="provider" defaultValue={"OpenAi"}>
              <option value="OpenAi">OpenAi (chatGPT)</option>
              <option value="Anthrophic">Anthrophic (claude)</option>
              <option value="Google">Google (gemini)</option>
              <option value="DeepSeek">DeepSeek</option>
            </select>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="model">
              LLM model:
            </label>
            <select className="Input" id="model" defaultValue={"gpt-4o"}>
              <option value="gpt-4o">gpt-4o</option>
            </select>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="Prompt">
              Your Custom Prompt:
            </label>
            <textarea className="Input" id="prompt" />
          </fieldset>
        </div>
        <Popover.Close className="PopoverClose" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverSettings;
