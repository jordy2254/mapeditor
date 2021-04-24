import {MainEditorState} from "../../MapEditor";
import {CanvasState} from "../MapCanvas";
import {Building, Floor, Map, Pair2f, Point2f, Room} from "data/RestApiData"
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

function renderRoomPoly(floor: Floor, building: Building, canvasState: CanvasState, ctx: CanvasRenderingContext2D, renderPoints: Point2f[], mainEditorState: MainEditorState) {
    floor.rooms.forEach(room => {

        let location: Point2f = {
            x: building.location.x + floor.location.x + room.location.x,
            y: building.location.y + floor.location.y + room.location.y
        }

        //Clone and scale & translate room poly
        let polyPoints: Point2f[] = JSON.parse(JSON.stringify(room.polygon))
        polyPoints.forEach(point => {
            //Calculate the true location of the room by adding all ofsets for building, floor and room location
            point.x = (point.x + location.x) * canvasState.scale + canvasState.offSetX;
            point.y = (point.y + location.y) * canvasState.scale + canvasState.offSetY;
        })

        //render the polygon to the screen
        ctx.moveTo(polyPoints[0].x, polyPoints[0].y);
        ctx.beginPath();
        polyPoints.forEach(point => {
            ctx.lineTo(point.x, point.y)
            renderPoints.push(point)
        })
        ctx.fillStyle = mainEditorState.selectedRoomId === room.id ? '#FDBF30' : '#FED77E';
        ctx.closePath();
        ctx.fill()
    })
}

function renderRoomWalls(floor: Floor, building: Building, canvasState: CanvasState, ctx: CanvasRenderingContext2D, renderPoints: Point2f[], mainEditorState: MainEditorState) {
    floor.rooms.forEach(room => {
        let location: Point2f = {
            x: building.location.x + floor.location.x + room.location.x,
            y: building.location.y + floor.location.y + room.location.y
        }
        //Render the walls to the screen
        let roomPoints: Pair2f[] = JSON.parse(JSON.stringify(room.walls))
        roomPoints.forEach(point => {
            //Calculate the true location of the room by adding all ofsets for building, floor and room location
            point.fst.x = (point.fst.x + location.x) * canvasState.scale + canvasState.offSetX;
            point.fst.y = (point.fst.y + location.y) * canvasState.scale + canvasState.offSetY;
            point.snd.x = (point.snd.x + location.x) * canvasState.scale + canvasState.offSetX;
            point.snd.y = (point.snd.y + location.y) * canvasState.scale + canvasState.offSetY;

            ctx.strokeStyle = '#000000'

            ctx.beginPath();
            ctx.moveTo(point.fst.x, point.fst.y)
            ctx.lineTo(point.snd.x, point.snd.y)
            ctx.stroke()
        })
    })
}

function renderSelectedRoom(floor: Floor, building: Building, canvasState: CanvasState, ctx: CanvasRenderingContext2D, renderPoints: Point2f[], mainEditorState: MainEditorState) {
    floor.rooms.forEach(room => {
        if(mainEditorState.selectedRoomId !== room.id){
            return
        }
        let location: Point2f = {
            x: building.location.x + floor.location.x + room.location.x,
            y: building.location.y + floor.location.y + room.location.y
        }
        room.entrances.forEach(value => {
            let p1 = JSON.parse(JSON.stringify(value.start))
            let p2 = JSON.parse(JSON.stringify(value.end))
            p1.x = (p1.x) * canvasState.scale + canvasState.offSetX;
            p1.y = (p1.y) * canvasState.scale + canvasState.offSetY;
            p2.x = (p2.x) * canvasState.scale + canvasState.offSetX;
            p2.y = (p2.y) * canvasState.scale + canvasState.offSetY;

            ctx.strokeStyle = '#ff0000'
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
        })


    })
}

function renderMap(ctx:CanvasRenderingContext2D, map:Map, mainEditorState:MainEditorState, canvasState:CanvasState): Point2f[]{
    let renderPoints:Point2f[] = [];

    map.buildings.forEach(building =>{
        building.floors.
        filter(floor => floor.floorNumber === canvasState.selectedFloorIndex).
        forEach(floor =>{
            renderRoomPoly(floor, building, canvasState, ctx, renderPoints, mainEditorState);
            renderRoomWalls(floor, building, canvasState, ctx, renderPoints, mainEditorState);
            renderSelectedRoom(floor, building, canvasState, ctx, renderPoints, mainEditorState)
            if(floor.sensors != undefined){
                floor.sensors.forEach(value => {
                    ctx.fillStyle = '#333333';
                    ctx.beginPath();
                    ctx.arc(value.location.x * canvasState.scale + (floor.location.x + building.location.x + canvasState.offSetX), value.location.y * canvasState.scale + (floor.location.y + building.location.y + canvasState.offSetY), 10, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath()

                })
            }

        })
    })

    return renderPoints
}

