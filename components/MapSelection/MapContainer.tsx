
import {Map} from "data/RestApiData"
import Logout from "../Logout";
import MapOption from "./MapOption";
import NewMapOption from "./NewMapOption";
import icon from "images/map-marked-solid.svg"
import UserMapOption from "./UserMapOption";

type Props = {
    maps: Map[] | undefined
    handleSelectMap: (id:number) => void

}

const MapContainer:React.FC<Props> = ({maps,handleSelectMap}) => {
    return <div className={"userMapsContainer"}>

        {/*<button onClick={() => createMap()}>Create New Map</button>*/}
        {maps?.map(m => {
            return <UserMapOption id={m.id} icon={icon} text={m.name} callback={handleSelectMap}/>
        })}
    </div>
}

export default MapContainer;