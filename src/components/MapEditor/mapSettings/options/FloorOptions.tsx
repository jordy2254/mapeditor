import {Map, Building, Floor, Point2f} from "data/RestApiData";
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import PointOptions from "./PointOptions";

type Props = {
    floor: Floor
}

const FloorOptions:React.FC<Props> = ({floor}) =>{

    const [state, setState] = useState(floor as Floor)
    const [pendingUpdate, setPendingUpdate] = useState(false as boolean)

    const mutate = useMutation('UpdateFloor');

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name as keyof Floor;
        let value: string | number;

        if(e.target.type == "number"){
            value = parseInt(e.target.value)
        }else{
            value = e.target.value
        }
        setState({...state, [name]: value } as Floor);
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
        setPendingUpdate(true)
        setState({...state, location: newLocation} as Floor)
    }

    return (
        <div>
            <h2>Floor Options</h2>
            Floor Number: <br/><input name="floorNumber" type="number" value={state.floorNumber} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            Floor name: <br/><input name="floorName" type="text" value={state.floorName} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            <PointOptions point={state.location} prefix={"Location"} callback={handleLocationChange}/>
        </div>
    );
}

export default FloorOptions;