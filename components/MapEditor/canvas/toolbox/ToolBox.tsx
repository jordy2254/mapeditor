import React, {useEffect, useState} from "react";
import {Map} from "data/RestApiData"
import MoveTool from "./moveTool"
import Tool from "./Tool";
import ToolOption from "./ToolOption";
type Props = {
    handleSelectTool: (tool: Tool) => void;
    selectedTool: Tool | undefined;
    tools:Tool[]
}



const ToolBox:React.FC<Props> = ({tools, handleSelectTool, selectedTool}) => {

    return (
        <div className="canvasToolbox">
            <h1 className={"smallHeader"}>Tools</h1>
            {tools?.map(value =>
                <ToolOption key={value.getName()} tool={value} selectedTool={selectedTool} handleSelectTool={handleSelectTool}/>
                )}
        </div>
    );
};

export default ToolBox;
