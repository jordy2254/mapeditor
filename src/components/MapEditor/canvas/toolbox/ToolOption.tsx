import Tool from "./Tool";

type Props = {
    tool: Tool
    handleSelectTool: (tool: Tool) => void;
    selectedTool: Tool | undefined;
}


const ToolOption:React.FC<Props> = ({selectedTool, handleSelectTool, tool}) => {

    return (
        <button onClick={() => handleSelectTool(tool)}
                disabled={selectedTool !== undefined && selectedTool === tool}>
            {tool.getName()}
        </button>
    );
};

export default ToolOption;
