import {Map, Building, Floor, Point2f, Room} from "data/RestApiData";
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import PointOptions from "./PointOptions";

type Props = {
    room: Room
}

const RoomOptions:React.FC<Props> = ({room}) =>{

    const [state, setState] = useState(room as Room)
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
        setState({...state, [name]: value } as Room);
    }

    useEffect(()=>{
        if(pendingUpdate){
            mutate.mutate(state as any)
            setPendingUpdate(false)
        }}, [state]);

    const handleDefocus = (e : any) =>{
        mutate.mutate(state as any)
    }

    const handleLocationChange = async (newLocation: Point2f) => {
        setState({...state, location: newLocation} as Room)
        setPendingUpdate(true)
    }

    const handleDimensionChange = async (newDimension: Point2f) => {
        setState({...state, dimensions: newDimension} as Room)
        setPendingUpdate(true)
    }

    return (
        <div>
            <h2>Room Options</h2>
            Room name: <br/><input name="name" type="text" value={state.name} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            Rotation <input name="rotation" type="number" value={state.rotation} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            <PointOptions point={state.location} prefix={"Location"} callback={handleLocationChange}/>
            <PointOptions point={state.dimensions} prefix={"Dimensions"} callback={handleDimensionChange}/>
        </div>
    );
}

export default RoomOptions;