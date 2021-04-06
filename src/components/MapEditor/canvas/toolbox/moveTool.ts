import Tool from "./Tool";
import {Point2f} from "../../../../data/RestApiData";
import React from "react";
import {calculateTrueInputCoordinate, calculateTrueMapCoordinate} from "../UtilFunctions";
import {useMutation} from "react-query";

class MoveTool extends Tool {

    private dragging:boolean = false;
    private startLocation:Point2f = {x: 0, y: 0}
    private initialOffset:Point2f = {x: 0, y: 0}

    constructor() {
        super("Move Tool");
    }

    mousePress(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if(this.props === undefined){
            return
        }
        console.log(calculateTrueMapCoordinate(event.clientX, event.clientY, this.props.canvasState));

        if(event.buttons === 4){
            this.dragging = true
            this.startLocation= calculateTrueInputCoordinate(event.clientX, event.clientY, this.props.canvasState.canvas)
            this.initialOffset= {x:this.props.canvasState.offSetX, y:this.props.canvasState.offSetY}
        }
    }

    mouseRelease(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if(this.props === undefined){
            return
        }
        this.dragging = false
    }

    mouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if(this.props === undefined){
            return
        }
        if(!this.dragging){
            return;
        }
        let nPoint:Point2f = calculateTrueInputCoordinate(event.clientX, event.clientY, this.props.canvasState.canvas)
        let pointDiff:Point2f = {x:nPoint.x - this.startLocation.x, y:nPoint.y - this.startLocation.y}
        let nOffx = this.initialOffset.x + pointDiff.x;
        let nOffy = this.initialOffset.y + pointDiff.y;
        this.props.updateCanvasState({...this.props.canvasState, offSetX:nOffx, offSetY:nOffy} )
    }

    mouseWheel(event: React.WheelEvent<HTMLCanvasElement>) {
        if(this.props === undefined){
            return
        }
        if(event.deltaY > 0){
            //scroll down
            let nScale = this.props.canvasState.scale - 0.3;
            this.props.updateCanvasState({...this.props.canvasState, scale:nScale} )
        }else if(event.deltaY < 0){
            //scroll up
            let nScale = this.props.canvasState.scale + 0.3;
            this.props.updateCanvasState({...this.props.canvasState, scale:nScale} )
        }
    }

    select() {

    }
}

export default MoveTool;
