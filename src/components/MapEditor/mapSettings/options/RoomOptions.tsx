import {Map, Building, Floor, Point2f, Room, Indent} from "data/RestApiData";
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import PointOptions from "./PointOptions";
import GenericOptionList from "../lists/GenericOptionList";
import IndentOptions from "./IndentOptions";

type Props = {
    room: Room
}

type RoomOptionsState = {
    room:Room
    selectedIndentId: number
}

const RoomOptions:React.FC<Props> = ({room}) =>{

    const [state, setState] = useState({room: room, selectedIndentId: -1} as RoomOptionsState)

    const [pendingUpdate, setPendingUpdate] = useState(false as boolean)

    const mutate = useMutation('UpdateRoom');

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name as keyof Room;
        let value: string | number;

        if(e.target.type == "number"){
            value = parseInt(e.target.value)
        }else{
            value = e.target.value
        }

        setState({...state, room: {...state.room, [name]:value}})

    }

    useEffect(()=>{
        if(pendingUpdate){
            mutate.mutate(state.room as any)
            setPendingUpdate(false)
        }}, [state]);

    const handleDefocus = (e : any) =>{
        mutate.mutate(state as any)
    }

    const handleLocationChange = async (newLocation: Point2f) => {
        setState({...state, room: {...state.room, location: newLocation}})

        setPendingUpdate(true)
    }

    const handleDimensionChange = async (newDimension: Point2f) => {
        setState({...state, room: {...state.room, dimensions: newDimension}})

        setPendingUpdate(true)
    }

    const buildIndentString = (value: Indent) => {
        let v: string = "";
        v += value.wallKeyA + " " + value.wallKeyB;
        v += " Size: " + value.dimensions.x + "," + value.dimensions.y;
        return v;
    }

    return (
        <div>
            <h2>Room Options</h2>
            Room name: <br/><input name="name" type="text" value={state.room.name} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            Rotation <input name="rotation" type="number" value={state.room.rotation} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            <PointOptions point={state.room.location} prefix={"Location"} callback={handleLocationChange}/>
            <PointOptions point={state.room.dimensions} prefix={"Dimensions"} callback={handleDimensionChange}/>

            <GenericOptionList<RoomOptionsState> elems={room.indents}
                                                 idKey={"id"}
                                                 stringFunction={buildIndentString}
                                                 updateKey={"selectedIndentId"}
                                                 listTitle={"Indents"}
                                                 existingState={state}
                                                 updateState={setState}
                                                 addMutationKey={"AddIndent"}
                                                 deleteMutationKey={"DeleteIndent"}/>

            {state.selectedIndentId !== -1 && <IndentOptions key={state.selectedIndentId} indent={room.indents.filter(value => value.id === state.selectedIndentId)[0]}/>}
        </div>
    );
}

export default RoomOptions;