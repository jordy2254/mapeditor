import {MainEditorState} from "../../MapEditor";
import {CanvasState} from "../MapCanvas";
import React from "react";
import {Point2f} from "../../../../data/RestApiData";
import {Map} from "data/RestApiData";

export type ToolProps = {
    mainEditorState: MainEditorState
    updateEditorState: (mainEditorState: MainEditorState) => void
    canvasState: CanvasState
    updateCanvasState: (canvasState: CanvasState) => void
    map: Map
}

class Tool  {

    private readonly name: string;
    protected props:ToolProps | undefined

    constructor(name: string) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

    mousePress(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    }

    mouseRelease(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    }

    mouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    }

    mouseWheel(event: React.WheelEvent<HTMLCanvasElement>) {
    }

    select() {
    }

    unSelect() {
    }

    render(ctx: CanvasRenderingContext2D, renderPoints: Point2f[]) {
    }

    setProps(props:ToolProps){
        this.props = props
    }
}

export default Tool;
