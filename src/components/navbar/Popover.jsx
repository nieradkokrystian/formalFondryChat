import "./Popover.css";
import { Popover as PopoverCMP } from "radix-ui";
import { GearIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { fetchLlmList } from "../../api/app";

const Popover = ({ setModel, setProvider, setPrompt, prompt }) => {
  const [llmProviders, setLlmProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const getLlmList = async () => {
      try {
        const listData = await fetchLlmList();
        setLlmProviders(listData);

        if (listData.length > 0) {
          const firstProvider = listData[0];
          setSelectedProvider(firstProvider.provider_name);
          setAvailableModels(firstProvider.models);
          const firstModel = firstProvider.models[0];
          setSelectedModel(firstModel);

          setProvider(firstProvider.provider_name);
          setModel(firstModel);
        }
      } catch (error) {
        console.error("Failed to fetch LLM list:", error);
      }
    };
    getLlmList();
  }, [setModel, setProvider]);

  const handleProviderChange = (e) => {
    const providerName = e.target.value;
    setSelectedProvider(providerName);
    setProvider(providerName);

    const provider = llmProviders.find((p) => p.provider_name === providerName);
    if (provider) {
      setAvailableModels(provider.models);
      const newSelectedModel = provider.models[0];
      setSelectedModel(newSelectedModel);
      setModel(newSelectedModel);
    }
  };

  const handleModelChange = (e) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    setModel(modelName);
  };

  return (
    <PopoverCMP.Root>
      <PopoverCMP.Trigger asChild>
        <button className="IconButtonPopover" aria-label="Update dimensions">
          <GearIcon />
        </button>
      </PopoverCMP.Trigger>
      <PopoverCMP.Portal>
        <PopoverCMP.Content
          className="PopoverContent "
          sideOffset={5}
          align="end"
        >
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
                value={selectedProvider}
              >
                {llmProviders.map((provider) => (
                  <option
                    key={provider.provider_name}
                    value={provider.provider_name}
                  >
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
                onChange={handleModelChange}
                value={selectedModel}
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="Fieldset flex flex-col">
              <label className="Label" htmlFor="Prompt">
                Your Custom Prompt (JSON format):
              </label>
              <textarea
                className="Input min-w-4/5 w-full h-fit min-h-30 p-2 pt-1"
                id="prompt"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                value={prompt}
              />
            </fieldset>
          </div>
          <PopoverCMP.Close className="PopoverClose" aria-label="Close">
            <Cross2Icon />
          </PopoverCMP.Close>
          <PopoverCMP.Arrow className="PopoverArrow" />
        </PopoverCMP.Content>
      </PopoverCMP.Portal>
    </PopoverCMP.Root>
  );
};

export default Popover;
