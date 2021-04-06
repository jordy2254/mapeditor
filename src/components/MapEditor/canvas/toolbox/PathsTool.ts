import Tool from "./Tool";
import {Point2f} from "../../../../data/RestApiData";
import React from "react";
import {calculateTrueInputCoordinate} from "../UtilFunctions";
import {useMutation} from "react-query";

class PathsTool extends Tool {

    private dragging:boolean = false;
    private startLocation:Point2f = {x: 0, y: 0}
    private initialOffset:Point2f = {x: 0, y: 0}
        
    constructor() {
        super("Paths");
    }

    mousePress(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if(this.props === undefined){
            return
        }
        let inputPosition:Point2f = calculateTrueInputCoordinate(event.clientX, event.clientY, this.props.canvasState.canvas)
    }

    render(ctx: CanvasRenderingContext2D, renderPoints: Point2f[]) {
        super.render(ctx, renderPoints);
       if(this.props == undefined){
           return;
       }
       this.props.map.nodes.forEach(node =>{
           if(this.props == undefined){
               return;
           }
           ctx.fillStyle = '#333333';
           ctx.beginPath();

           ctx.arc(node.location.x * this.props.canvasState.scale + this.props.canvasState.offSetX,
               node.location.y * this.props.canvasState.scale + this.props.canvasState.offSetY,
               5, 0, 2 * Math.PI);
           ctx.fill();
           ctx.closePath()
       })
    }
}

export default PathsTool;
