import apiConfig from "config/apiconfig.json"
import {Building, Floor, Room, Map, Indent} from "../data/RestApiData";

export async function getCurrentUserMaps(token:any) {
    return await (await fetch(apiConfig.domain + "/maps", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).json()
}

export async function createNewMap(token:any) {
    return await (await fetch(apiConfig.domain + "/maps", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).json()
}

export async function getCurrentUserMapById(token:any, id:number) {
    return await (await fetch(apiConfig.domain + "/maps/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).json()
}
export async function deleteMap(token:any, id:number) {
    await (await fetch(apiConfig.domain + "/maps/" + id, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }))
}

export async function updateMap(token:any, map:Map) {
    return await (await fetch(apiConfig.domain + "/maps/" + map.id, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(map)
    })).json()
}

export async function createNewBuilding(token:any, mapId:number) {
    let b:Building = <Building>{buildingName: "Unnamed", mapId: mapId}
    return await (await fetch(apiConfig.domain + "/Buildings/" + mapId, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    })).json()
}

export async function updateBuilding(token:any, building:Building) {
    return await (await fetch(apiConfig.domain + "/Buildings/" + building.mapId + "/" + building.id, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(building)
    })).json()
}

export async function createNewFloor(token:any, mapId:number, buildingId:number) {
    let b:Floor = <Floor>{mapId:mapId, floorName:"Unnamed", floorNumber:1, location:{x:0, y:0}}

    return await (await fetch(apiConfig.domain + "/Floors/"  + buildingId, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    })).json()
}

export async function updateFloor(token:any, building:Floor) {
    return await (await fetch(apiConfig.domain + "/Floors/" + building.buildingId + "/" + building.id, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(building)
    })).json()
}

export async function createNewRoom(token:any, floorId:number) {
    let b:Room = <Room>{floorId:floorId, name:"Unnamed", location:{x:0, y:0}, dimensions:{x:0, y:0}}

    return await (await fetch(apiConfig.domain + "/Rooms/"  + floorId, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    })).json()
}

export async function updateRoom(token:any, room:Room) {
    return await (await fetch(apiConfig.domain + "/Rooms/"  + room.floorId + "/" + room.id, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })).json()
}

export async function updateIndent(token:any, indent:Indent) {
    return await (await fetch(apiConfig.domain + "/Indents/" + indent.id, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(indent)
    })).json()
}

export async function createIndent(token:any, roomId:any) {
    console.log(roomId)
    let b:Indent = <Indent>{wallKeyA:"TOP", wallKeyB:"LEFT", dimensions:{x:0, y:0}, roomId:roomId}
    return await (await fetch(apiConfig.domain + "/Indents", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    })).json()
}

export async function deleteIndent(token:any, indentId:any) {
    return await (await fetch(apiConfig.domain + "/Indents/"+indentId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })).json()
}