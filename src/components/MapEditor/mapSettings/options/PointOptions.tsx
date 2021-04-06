import {Map, Building, Floor, Point2f} from "data/RestApiData";
import {ChangeEvent, useState} from "react";
import {useMutation} from "react-query";

type Props = {
    point: Point2f
    prefix: string
    callback: (point:Point2f) => void
}

const PointOptions:React.FC<Props> = ({prefix, point, callback}) =>{

    const [state, setState] = useState(point as Point2f);

    const mutate = useMutation('updateBuilding');

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name as keyof Point2f;
        const value = parseInt(e.target.value);
        setState({...state, [name]: value } as Point2f);
    }

    return (
        <div>
            {prefix} X: <br/><input name="x" type="number" value={state.x} onChange={handleChange} onBlur={()=>callback(state)}/><br/>
            {prefix} Y: <br/><input name="y" type="number" value={state.y} onChange={handleChange} onBlur={()=>callback(state)}/>
        </div>
    );
}

export default PointOptions;