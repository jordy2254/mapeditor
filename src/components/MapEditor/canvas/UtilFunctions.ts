import {Point2f} from "../../../data/RestApiData";
import {CanvasState} from "./MapCanvas";

export  {}

export function calculateTrueInputCoordinate(eventx:number, eventy:number, canvas:HTMLCanvasElement | undefined):Point2f{
    if(canvas === undefined){
        return {x:eventx, y: eventy};
    }
    let rect = canvas.getBoundingClientRect();
    return {x:eventx - rect.left, y: eventy - rect.top};
}

export function calculateTrueMapCoordinate(eventx:number, eventy:number, canvasState:CanvasState):Point2f{
    let result:Point2f = calculateTrueInputCoordinate(eventx, eventy, canvasState.canvas)
    result.x -= canvasState.offSetX;
    result.x /= canvasState.scale;
    result.y -= canvasState.offSetY;
    result.y /= canvasState.scale;

    return result;
}