
import {Map} from "data/RestApiData"
import Logout from "../Logout";
import icon from "images/plus-solid.svg"

import NewMapOption from "./NewMapOption";
import {useAuth0} from "../../react-auth0-spa";
import {useQuery} from "react-query";
import {createNewMap, getCurrentUserMaps} from "../../api/map";

type Props = {
    handleSelectMap: (id:number) => void
}

const NEWMAP = 0;
const NEWMAPJSON = 1;
const NEWMAPTEMP = 2;

const NewMapContainer:React.FC<Props> = ({handleSelectMap}) => {
    const {getTokenSilently} = useAuth0()

    const tokenWrapper = async (t: (token: any) => any) => {
        const token = await getTokenSilently()
        return await t(token)
    }

    const createMap = () => {
        tokenWrapper(createNewMap)
            .then(data=>handleSelectMap(data.id))
    }

    return <div className={"newMaps"}>
        <NewMapOption icon={icon} id={NEWMAP} text={"New Map"} callback={(id)=>createMap()}/>
    </div>
}

export default NewMapContainer;