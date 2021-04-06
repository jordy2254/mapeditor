import {MainEditorState} from "../../MapEditor";
import {CanvasState} from "../MapCanvas";
import {Map, Point2f} from "data/RestApiData"
import {calculatePolygonPoints} from "./RoomRenderer";

export default function render(ctx:CanvasRenderingContext2D, map:Map, mainEditorState:MainEditorState, canvasState:CanvasState){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)
    ctx.fillStyle = '#989898';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    ctx.fillStyle = '#000000';
    ctx.ellipse(10,10,10,10,20,0,0,false);
    // ctx.fillRect(100 + canvasState.offSetX, 100 + canvasState.offSetY, 100 * canvasState.scale,100 * canvasState.scale);
    //Render all rooms for the selected Floor

   let renderPoints = renderMap(ctx, map, mainEditorState, canvasState)

    canvasState.selectedTool.render(ctx, renderPoints);
}

function renderMap(ctx:CanvasRenderingContext2D, map:Map, mainEditorState:MainEditorState, canvasState:CanvasState): Point2f[]{
    let renderPoints:Point2f[] = [];

    map.buildings.forEach(building =>{
        building.floors.
        filter(floor => floor.floorNumber === canvasState.selectedFloorIndex).
        forEach(floor =>{
            floor.rooms.forEach(room => {
                //TODO this could be optimised to ignore out of bounds rooms.
                let points:Point2f[] = calculatePolygonPoints(room)
                points.forEach(point =>{
                    //Calculate the true location of the room by adding all ofsets for building, floor and room location
                    let location:Point2f = {x:building.location.x + floor.location.x + room.location.x, y:building.location.y + floor.location.y + room.location.y}
                    point.x = (point.x+ location.x) * canvasState.scale + canvasState.offSetX;
                    point.y = (point.y+ location.y) * canvasState.scale + canvasState.offSetY;
                })

                //render the polygon to the screen

                ctx.moveTo(points[0].x, points[0].y);
                ctx.beginPath();
                points.forEach(point =>{
                    ctx.lineTo(point.x , point.y)
                    renderPoints.push(point)
                })
                ctx.strokeStyle = '#000000'
                ctx.fillStyle = '#FED77E'
                ctx.closePath();

                ctx.fill()
                ctx.stroke()
            })
        })
    })
    return renderPoints
}

