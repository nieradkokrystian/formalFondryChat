import { JsonEditor } from "json-edit-react";

function CreateTaskJsonEditor({ prompt, setPrompt }) {
  return (
    <JsonEditor
      className="Input-json"
      data={prompt}
      setData={setPrompt}
      maxWidth="100%"
      rootName="prompt"
      rootFontSize="13px"
    />
  );
}

export default CreateTaskJsonEditor;
