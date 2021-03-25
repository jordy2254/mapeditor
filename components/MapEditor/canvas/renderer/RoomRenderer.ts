import {Indent, Point2f, Room} from "data/RestApiData";

type Pair2f = {
    first:Point2f,
    second:Point2f
}
export function isPointInRoom(point:Point2f, room:Room) {
    if (!(point.x >= room.location.x && point.x <= room.location.x + room.dimensions.x && point.y >= room.location.y && point.y <= room.location.y + room.dimensions.y)) {
        return false;
    }

    for (let index = 0; index < room.indents.length; index++) {
        let indent = room.indents[index];
        let startPoints = calculateStartPointsOfIndent(room, indent);
        if(startPoints === undefined){
            continue;
        }
        if ((point.x >= startPoints.x + room.location.x && point.x <= startPoints.x + room.location.x + indent.dimensions.x && point.y >= startPoints.y + room.location.y && point.y <= startPoints.y + room.location.y + indent.dimensions.x)) {
            return false;
        }
    }

    return true;
}

export function calculatePolygonPoints(room:Room):Point2f[]{
    let edgeData = calculatePolygonEdgePairs(room);

    let firstPair:Pair2f | undefined = undefined;
    let lastPair:Pair2f | undefined = undefined;
    let panic = 0;
    let points:Point2f[] = [];

    while (panic < edgeData.length * 2){
        panic++;

        if (firstPair === undefined || lastPair === undefined){
            firstPair = edgeData[0];
            lastPair = firstPair;
            points.push(firstPair.first)
            continue;
        }


        let current = undefined;

        for (let i = 0; i < edgeData.length; i++) {
            if (pointsEqual(edgeData[i].first, lastPair.second)){
                current = edgeData[i];
                break;
            }
        }

        if (current ===undefined){
            break;
        }

        points.push(current.first);
        lastPair = current;

        if (pointsEqual(lastPair.second, firstPair.first)){
            break;
        }
    }

    return points;
}

function calculatePolygonEdgePairs(room:Room){
    let roomEdges = calculateRectangleEdgePairs(0, 0, room.dimensions.x, room.dimensions.y);
    let indentEdges:Pair2f[] = [];

    room.indents.forEach(indent =>{
        let startPoints = calculateStartPointsOfIndent(room, indent);
        if(startPoints === undefined){
            return
        }
        indentEdges.push(...calculateRectangleEdgePairs(startPoints.x, startPoints.y, indent.dimensions.x, indent.dimensions.y))
    });

    let indentIndex;
    for (indentIndex = indentEdges.length - 1; indentIndex >= 0; indentIndex--){
        let indentWall = indentEdges[indentIndex];
        let roomIndex = 0;
        let found = undefined;

        for (roomIndex = 0; roomIndex <roomEdges.length; roomIndex++){
            let roomWall = roomEdges[roomIndex];
            if (linesIntersect(roomWall.first, roomWall.second, indentWall.first, indentWall.second)){
                found = roomWall
                break
            }
        }
        if(found === undefined){
            continue;
        }

        let tmp = found.second
        found.second = indentWall.first

        if(!pointsEqual(indentWall.second, tmp)){
            roomEdges.push(createEdgePair(indentWall.second, tmp));
        }

        if (pointsEqual(found.first, found.second)){
            roomEdges.splice(roomIndex, 1);
        }
        indentEdges.splice(indentIndex, 1);
    }


    for (let i = 0; i < indentEdges.length; i++) {
        let tmpWall = indentEdges[i];

        let allWalls = [];
        allWalls.push(...roomEdges);
        allWalls.push(...indentEdges);

        let firstPoints:Point2f[]=[];
        let secondPoints:Point2f[]=[];

        allWalls.forEach(wall =>{
            firstPoints.push(wall.first);
            secondPoints.push(wall.second);
        });

        let firstCount1 = 0;
        let firstCount2 = 0;
        let secondCount1 = 0;
        let secondCount2 = 0;

        firstPoints.forEach(point =>{
            if(pointsEqual(point, tmpWall.first)){
                firstCount1++;
            }
            if(pointsEqual(point, tmpWall.second)){
                firstCount2++;
            }
        });

        secondPoints.forEach(point =>{
            if(pointsEqual(point, tmpWall.first)){
                secondCount1++;
            }
            if(pointsEqual(point, tmpWall.second)){
                secondCount2++;
            }
        });

        if (firstCount1 != secondCount1 || firstCount2 != secondCount2){
            let tmp = tmpWall.first
            tmpWall.first = tmpWall.second
            tmpWall.second = tmp
        }
    }

    let allWalls = [];
    allWalls.push(...roomEdges);
    allWalls.push(...indentEdges);

    return allWalls;
}

function calculateRectangleEdgePairs(x:number, y:number, width:number, height:number):Pair2f[]{
    let points:Pair2f[] = [];

    let tl = createPoint(x,y);
    let tr = createPoint(x + width,y);
    let bl = createPoint(x,y + height);
    let br = createPoint(x + width,y + height);

    points.push(createEdgePair(tl, tr));
    points.push(createEdgePair(tr, br));
    points.push(createEdgePair(br, bl));
    points.push(createEdgePair(bl, tl));
    return points
}

/*Util functions*/
function pointsEqual(p1:Point2f, p2:Point2f){
    return p1.x === p2.x && p1.y === p2.y;
}

export function calculateStartPointsOfIndent(room:Room, indent:Indent) :Point2f | undefined {
    if (indent.wallKeyA !== "" && indent.wallKeyB !== "") {
        let xStart = 0;
        let yStart = 0;

        if (indent.wallKeyA === "BOTTOM") {
            yStart = room.dimensions.y - indent.dimensions.y;
        }

        if (indent.wallKeyB == "RIGHT") {
            xStart = room.dimensions.x - indent.dimensions.x;
        }

        return createPoint(xStart, yStart);
    } else if (indent.wallKeyA != "") {
        let xStart = 0;
        let yStart = 0;

        switch (indent.wallKeyA) {
            case "TOP":
                xStart = indent.location;
                yStart = 0;
                break
            case "BOTTOM":
                xStart = indent.location;
                yStart = room.dimensions.y - indent.dimensions.y;
                break
            case "LEFT":
                xStart = 0;
                yStart = indent.location;
                break
            case "RIGHT":
                xStart = indent.location;
                yStart = room.dimensions.x - indent.dimensions.x;
                break
            default:
                console.log("Something went wrong for" + indent.wallKeyA);
                return undefined;
        }

        return createPoint(xStart, yStart);
    }
}

function linesIntersect(p1:Point2f, p2:Point2f, p3:Point2f, p4:Point2f){
    //vertical line
    if(p1.x == p3.x && p2.x == p3.x && p4.x == p1.x){
        //posative increase
        if(p1.y - p2.y < 0){
            return p3.y >= p1.y && p3.y <= p2.y;
        }

        //negative increase
        if(p1.y - p2.y > 0){
            return p3.y <= p1.y && p3.y >= p2.y;
        }
    }

    //Horazontal line
    if(p1.y == p3.y && p2.y == p3.y && p4.y == p1.y){
        //posative increase
        if(p1.x - p2.x < 0){
            return p3.x >= p1.x && p3.x <= p2.x;
        }

        //negative increase
        if(p1.x - p2.x > 0){
            return p3.x <= p1.x && p3.x >= p2.x;
        }
    }
    return false
}

function createEdgePair(p1:Point2f,p2:Point2f):Pair2f{
    return {"first":p1, "second":p2};
}

export function createPoint(xp:number,yp:number):Point2f{
    return {x:xp, y:yp};
}