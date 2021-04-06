export type Point2f = {
    x: number
    y: number
}

export type Pair2f = {
    fst: Point2f
    snd: Point2f
}

export type Map = {
    id: number
    password: string
    name: string
    buildings: Building[]
    nodes: MapNode[]
    edges: NodeEdge[]
}

export type Building = {
    id: number
    mapId: number
    buildingName: string
    location: Point2f
    floors: Floor[]
}
export type Entrance = {
    id:        number
    start: Point2f
    end: Point2f
}

export type Floor = {
    id: number
    buildingId: number
    floorNumber: number
    floorName: string
    mapId: number
    location: Point2f
    rooms: Room[]
    sensors: Sensor[]
}

export type Room = {
    id: number
    floorId: number
    mapId: number
    buildingId: number
    rotation: number
    name: string
    location: Point2f
    dimensions: Point2f
    indents: Indent[]
    polygon: Point2f[]
    walls: Pair2f[]
    entrances:  Entrance[]
}

export type Indent = {
    id: number
    roomId: number
    mapId: number
    buildingId: number
    floorId: number
    wallKeyA: string
    wallKeyB: string
    location: number
    dimensions: Point2f
}

export type Sensor = {
    id: string
    buildingId: number
    floorId: number
    location: Point2f
}

export type MapNode = {
    id: number
    mapId: number
    location: Point2f
    rootNode: boolean
    floorIndex: number
}

export type NodeEdge = {
    id: number
    mapId: number
    node1Id: number
    node2Id: number
}



export {}
