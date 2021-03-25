import Tool from "./Tool";
import {Point2f} from "../../../../data/RestApiData";
import React from "react";
import {calculateTrueInputCoordinate} from "../UtilFunctions";
import {useMutation} from "react-query";

class RoomSelectionTool extends Tool {

    private dragging:boolean = false;
    private startLocation:Point2f = {x: 0, y: 0}
    private initialOffset:Point2f = {x: 0, y: 0}
        
    constructor() {
        super("Room Selection Tool");
    }

    mousePress(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if(this.props === undefined){
            return
        }
        let inputPosition:Point2f = calculateTrueInputCoordinate(event.clientX, event.clientY, this.props.canvasState.canvas)
        //
        // let xPoint = (event.pageX - offset.left - currentOffsets.offX) / currentScale;
        // let yPoint = (event.pageY - offset.top - currentOffsets.offY) / currentScale;
        //
        // let prevPoints = this.callBacks["getPreviousRenderPoints"]();
        // for (let i = 0; i <prevPoints.length; i++) {
        //     let point = prevPoints[i];
        //     if(Math.pow(xPointScreen - point.x, 2) + Math.pow(yPointScreen - point.y, 2) < Math.pow(10, 2)){
        //         //Normalise render point:
        //         let normX = (point.x - currentOffsets.offX) / currentScale;
        //         let normY = (point.y - currentOffsets.offY) / currentScale;
        //
        //         if(this.selectedRoom !== undefined){
        //             //Lets make this then:
        //             this.callBacks["roomRest"]({
        //                 Id: this.selectedRoom.Id,
        //                 FloorId: this.selectedRoom.FloorId,
        //                 Location:{x:normX, y:normY}
        //             });
        //         }
        //
        //         return;
        //     }
        // }
        //
        // let selectedRoom = undefined;
        // let map = this.callBacks["currentMap"]();
        // map.Buildings[0].Floors[0].Rooms.forEach((room) => {
        //     if (isPointInRoom(createPoint(xPoint, yPoint), room)) {
        //         if (selectedRoom !== undefined) {
        //             console.log("Warning multiple rooms in point: " + selectedRoom.Name);
        //         }
        //         selectedRoom = room;
        //     }
        // });
        // if (selectedRoom !== undefined) {
        //     this.selectedRoom = selectedRoom;
        //     this.callBacks["setRoom"](this.selectedRoom);
        //     console.log(selectedRoom.Name);
        // }
    }

    render(ctx: CanvasRenderingContext2D, renderPoints: Point2f[]) {
        super.render(ctx, renderPoints);
        ctx.fillStyle = '#ff00ff';
        renderPoints.forEach(point =>{
            ctx.fillStyle = '#333333';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath()
        })
    }
}

export default RoomSelectionTool;
