
import {Map} from "data/RestApiData"
import Logout from "../Logout";

type Props = {
}

const MapSelectionHeader:React.FC<Props> = () => {
    return <div className={"mapSelectionHeader"}><h1 id={"title"}>Map Selection</h1><Logout/></div>
}

export default MapSelectionHeader;