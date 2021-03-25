
import {Floor, Map} from "../../data/RestApiData"
import {ChangeEvent, useEffect, useState} from "react";
import {useMutation} from "react-query";
import render from "./canvas/renderer/renderer";

type Props = {
    map: Map
    handleClearSelectedMap: () => void
}

const MapEditor:React.FC<Props> = ({map, handleClearSelectedMap}) =>{

    const [mapState, setMap] = useState(map as Map)
    const [editing, setEditing] = useState(false as boolean)

    const mapMutation = useMutation('EditMap')


    useEffect(() => {
        setMap(map)
    }, [map]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setMap({...mapState, name:e.target.value});
    }

    const renderMapName = () => {
        if(!editing){
            return <span key={mapState.id}>{mapState.name}</span>
        }
        return <input key={mapState.id} id={"mapname"} value={mapState.name}  onChange={handleChange} onBlur={()=>{
            mapMutation.mutate(mapState as any);
            setEditing(false)
        }}/>
    }

    return (
        <div key={mapState.id} className={"headerContainer"}>
            <button onClick={() => handleClearSelectedMap()}>Back to selection</button>
            {
                <span>
                    Name: <span onClick={()=>setEditing(true)}>
                    {renderMapName()}
                </span>
                </span>
            }
            <span>Map id is: {map?.id}</span>
        </div>
    );
}

export default MapEditor;