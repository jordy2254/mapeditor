import {Map, Building, Floor, Point2f, Room, Indent} from "data/RestApiData";
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import PointOptions from "./PointOptions";
import GenericOptionList from "../lists/GenericOptionList";

type Props = {
    indent:Indent
}

const IndentOptions:React.FC<Props> = ({indent}) =>{

    const [state, setState] = useState(indent)
    const mutate = useMutation('EditIndent');

    const [pendingUpdate, setPendingUpdate] = useState(false as boolean)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name as keyof Room;
        let value: string | number;

        if(e.target.type == "number"){
            value = parseInt(e.target.value)
        }else{
            value = e.target.value
        }
        setPendingUpdate(true)
        setState({...state, [name]:value})

    }
    useEffect(()=>{
        if(pendingUpdate){
            mutate.mutate(state as any)
            setPendingUpdate(false)
        }}, [state]);

    const handleDefocus = (e : any) =>{
        mutate.mutate(state as any)
    }


    const handleDimensionChange = async (newDimension: Point2f) => {
        setPendingUpdate(true)
        setState({...state,  dimensions: newDimension})
    }

    const buildIndentString = (value: Indent) => {
        let v: string = "";
        v += value.wallKeyA + " " + value.wallKeyB;
        v += " Size: " + value.dimensions.x + "," + value.dimensions.y;
        return v;
    }

    const handleLocationChange =  (e:ChangeEvent<HTMLSelectElement>) =>{
        if(e.target.id === "wallKeyA" && (e.target.value === "LEFT" || e.target.value === "RIGHT")){
           setState({...state, wallKeyB: "", wallKeyA:e.target.value});
           return
        }

        const name = e.target.name as keyof Indent;
        const value = e.target.value;
        console.log("Updating state: " + name + "," + value)
        setPendingUpdate(true)
        setState({...state, [name]:value})
    }
    console.log(state)
    return (
        <div>
            <h2>Indent Options</h2>
            <div>
                Location:
                <select name={"wallKeyA"} onChange={handleLocationChange}>
                    <option selected={state.wallKeyA === "TOP"} value="TOP">TOP</option>
                    <option selected={state.wallKeyA === "BOTTOM"} value="BOTTOM">BOTTOM</option>
                    <option selected={state.wallKeyA === "LEFT"} value="LEFT">LEFT</option>
                    <option selected={state.wallKeyA === "RIGHT"} value="RIGHT">RIGHT</option>
                </select>
                {(state.wallKeyA === "TOP" || state.wallKeyA === "BOTTOM") &&
                <select name={"wallKeyB"} onChange={handleLocationChange}>
                    <option selected={state.wallKeyB === ""} value="">N/A</option>
                    <option selected={state.wallKeyB === "LEFT"} value="LEFT">LEFT</option>
                    <option selected={state.wallKeyB === "RIGHT"} value="RIGHT">RIGHT</option>
                </select>
                }
            </div>
            {(state.wallKeyB === "" && <input name="location" type="number" value={state.location} onChange={handleChange} onBlur={handleDefocus}/>)}
            <PointOptions point={state.dimensions} prefix={"Dimensions"} callback={handleDimensionChange}/>
        </div>
    );
}

export default IndentOptions;