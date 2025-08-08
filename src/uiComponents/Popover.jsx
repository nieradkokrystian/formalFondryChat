import * as React from "react";
import { Popover } from "radix-ui";
import { GearIcon, Cross2Icon } from "@radix-ui/react-icons";
import "../uiComponents/popover.css";
import { useState, useEffect } from "react";
import axiosInstance from "./axios-cache";

const PopoverSettings = () => {
  const [llmProviders, setLlmProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  const API_LINK = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchLlmList = async () => {
      try {
        const response = await axiosInstance.get(`${API_LINK}/llm_list`);
        setLlmProviders(response.data);
        if (response.data.length > 0) {
          setSelectedProvider(response.data[0].provider_name);
          setAvailableModels(response.data[0].models);
          setSelectedModel(response.data[0].models[0]);
        }
      } catch (error) {
        console.error("Failed to fetch LLM list:", error);
      }
    };
    fetchLlmList();
  }, [API_LINK]);

  const handleProviderChange = (e) => {
    const providerName = e.target.value;
    setSelectedProvider(providerName);
    const provider = llmProviders.find((p) => p.provider_name === providerName);
    if (provider) {
      setAvailableModels(provider.models);
      setSelectedModel(provider.models[0]);
    }
  };

  return (
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
              <select
                className="Input"
                id="provider"
                onChange={handleProviderChange}
                value={selectedProvider}>
                {llmProviders.map((provider) => (
                  <option
                    key={provider.provider_name}
                    value={provider.provider_name}>
                    {provider.provider_name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="model">
                LLM model:
              </label>
              <select
                className="Input"
                id="model"
                onChange={(e) => setSelectedModel(e.target.value)}
                value={selectedModel}>
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
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
};

export default PopoverSettings;
