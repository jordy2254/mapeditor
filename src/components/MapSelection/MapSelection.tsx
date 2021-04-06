import {useState} from "react";
import {useQuery, useQueryClient} from 'react-query'

import MapOption from "./MapOption";
import {useAuth0} from "../../react-auth0-spa";
import{Map} from "data/RestApiData"
import {getCurrentUserMaps, createNewMap} from "../../api/map";
import Logout from "../Logout";
import MapSelectionHeader from "./MapSelectionHeader";
import "./mapSelection.css"
import NewMapContainer from "./NewMapContainer";
import MapContainer from "./MapContainer";

type Props = {
    handleSelectMap: (id: number) => void
}



const MapSelection:React.FC<Props> = ({handleSelectMap}) => {
    const {getTokenSilently} = useAuth0()

    const tokenWrapper = async (t: (token: any) => any) => {
        const token = await getTokenSilently()
        return await t(token)
    }

    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery<Map[]>('USERMAPS', () => tokenWrapper(getCurrentUserMaps))


    if(isLoading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Something went wrong :/</div>
    }

    console.log(data);


    return (
        <div className={"content"}>
            <MapSelectionHeader/>
            <NewMapContainer handleSelectMap={handleSelectMap}/>
            <MapContainer maps={data} handleSelectMap={handleSelectMap}/>
        </div>
    );
}

export default MapSelection;