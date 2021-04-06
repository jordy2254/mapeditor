import {Map, Building, Floor, Point2f} from "data/RestApiData";
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import PointOptions from "./PointOptions";

type Props = {
    building: Building
}

const BuildingOptions:React.FC<Props> = ({building}) =>{

    const [state, setState] = useState(building as Building)
    const [pendingUpdate, setPendingUpdate] = useState(false as boolean)

    const mutate = useMutation('updateBuilding');

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name as keyof Building;
        const value = e.target.value;
        setState({...state, [name]: value } as Building);
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
        setState({...state, location: newLocation} as Building)
        setPendingUpdate(true)
    }

    return (
        <div>
            <h2>Building Options</h2>
            Building name: <br/><input name="buildingName" type="text" value={state.buildingName} onChange={handleChange} onBlur={handleDefocus} ></input><br/>
            <PointOptions point={state.location} prefix={"Location"} callback={handleLocationChange}/>
        </div>
    );
}

export default BuildingOptions;