import React, {useEffect, useState} from "react";
import {Map} from "data/RestApiData"
import ToolBox from "./toolbox/ToolBox";
import Tool from "./toolbox/Tool";
import MoveTool from "./toolbox/moveTool";
import render from "./renderer/renderer";
import {MainEditorState} from "../MapEditor";
import RoomSelectionTool from "./toolbox/RoomSelectionTool";
import FloorList from "./FloorList";
import PathsTool from "./toolbox/PathsTool";

type Props = {
    map: Map
    mainEditorState: MainEditorState
    updateEditorState: (mainEditorState: MainEditorState) => void
}

const tools:Tool[] = [
    new MoveTool(),
    new RoomSelectionTool(),
    new PathsTool()
]

export type CanvasState = {
    scale: number
    offSetX: number
    offSetY: number
    selectedFloorIndex: number
    canvas: HTMLCanvasElement | undefined
    selectedTool: Tool
}

const initialState:CanvasState = {
    canvas: undefined,
    scale: 1,
    offSetX: 0,
    offSetY: 0,
    selectedFloorIndex:0,
    selectedTool: tools[0]
}


const MapCanvas:React.FC<Props> = ({map, mainEditorState, updateEditorState}) => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    initialState.canvas =canvasRef.current == null ? undefined : canvasRef.current;
    let x:number[] = map.buildings
        .flatMap(value => value.floors)
        .map(value => value.floorNumber)

    if(x.length > 0){
        let uniqueArr = Array.from(new Set(x));
        initialState.selectedFloorIndex = uniqueArr[0]
    }


    const [canvasState, setCanvasState] = useState<CanvasState>(initialState as CanvasState)

    const handleSelectTool = (tool:Tool) =>{
        setCanvasState({...canvasState, selectedTool:tool})
    }


    useEffect(() => {
        const canvas:HTMLCanvasElement | null = canvasRef.current
        tools?.forEach(value => {
            value.setProps({
                mainEditorState:mainEditorState,
                updateEditorState:updateEditorState,
                canvasState:canvasState,
                updateCanvasState:setCanvasState,
            map:map});
        });
        if(canvas != null){
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const context:CanvasRenderingContext2D | null = canvas.getContext('2d')
            if(context != null){
                render(context, map, mainEditorState, canvasState)
            }
        }
    }, [canvasState, map]);

    const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        canvasState.selectedTool?.mousePress(event);
    }

    const handleCanvasMouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        canvasState.selectedTool?.mouseRelease(event);
    }

    const handleCanvasDrag = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        canvasState.selectedTool?.mouseMove(event);
    }

    const handleCanvasMouseWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
        canvasState.selectedTool?.mouseWheel(event);
    }

    return (
        <div className="canvasContainer">
            <ToolBox tools={tools} selectedTool={canvasState.selectedTool} handleSelectTool={handleSelectTool}/>
            <FloorList map={map} canvasState={canvasState} updateCanvasState={setCanvasState}/>
            <canvas className={"renderCanvas"} id="renderCanvas" ref={canvasRef}
                    onWheel={handleCanvasMouseWheel}
                    onMouseMove={handleCanvasDrag}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseDown={handleCanvasMouseDown}>
                Sorry your browser doesn't support canvas
            </canvas>
        </div>
    );
};

export default MapCanvas;
