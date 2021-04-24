import {useMutation, useQuery, useQueryClient} from "react-query";
import {Map} from "../../data/RestApiData";
import {
    createIndent,
    createNewBuilding,
    createNewFloor, createNewRoom, deleteIndent,
    getCurrentUserMapById,
    getCurrentUserMaps,
    updateBuilding, updateFloor, updateIndent, updateMap, updateRoom
} from "api/map";

import {useAuth0} from "react-auth0-spa";
import MapCanvas from "./canvas/MapCanvas";
import Header from "./Header";
import "./mapEditor.css"
import SettingsPanel from "./mapSettings/SettingsPanel";
import {useState} from "react";

type Props = {
    selectedMapId: number
    handleClearSelectedMap: () => void
}

export type MainEditorState = {
    selectedBuildingId: number
    selectedFloorId: number
    selectedRoomId: number
    selectedSensorId: string
    selectedIndentId: number
}

const defaultState:MainEditorState = {
    selectedBuildingId: -1,
    selectedFloorId: -1,
    selectedIndentId: -1,
    selectedRoomId: -1,
    selectedSensorId: ""
}

const MapEditor:React.FC<Props> = ({selectedMapId, handleClearSelectedMap}) =>{

    const {getTokenSilently} = useAuth0()

    const tokenWrapper = async (t: (token: any, id:any) => any, id:any) => {
        const token = await getTokenSilently()
        return await t(token, id)
    }

    const queryClient = useQueryClient();

    const {isLoading, error, data: mapData} = useQuery<Map>('API', () => tokenWrapper(getCurrentUserMapById, selectedMapId));
    const [mainEditorState, setMainEditorState] = useState(defaultState as MainEditorState);
        console.log(mapData)
    const tokenWrapper2 = async (t: (token: any, mapId:any, buildingId:any) => any, mapId:any, buildingId:any) => {
        const token = await getTokenSilently()
        return await t(token, mapId, buildingId)
    }

    const tokenWrapper3 = async (t: (token: any, mapId:any, buildingId:any, floorId:any) => any, mapId:any, buildingId:any, floorId:any) => {
        const token = await getTokenSilently()
        return await t(token, mapId, buildingId, floorId)
    }

    const tokenWrapper4 = async (t: (token: any, indent:any) => any,indent:any) => {
        const token = await getTokenSilently()
        return await t(token, indent)
    }

    queryClient.setMutationDefaults("EditMap", {
        mutationFn: map => tokenWrapper(updateMap, map),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("AddBuilding", {
        mutationFn: () => tokenWrapper(createNewBuilding, selectedMapId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("AddFloor", {
        mutationFn: () => tokenWrapper2(createNewFloor, selectedMapId, mainEditorState.selectedBuildingId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("AddRoom", {
        mutationFn: () => tokenWrapper3(createNewRoom, selectedMapId, mainEditorState.selectedBuildingId, mainEditorState.selectedFloorId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("UpdateFloor", {
        mutationFn: floor => tokenWrapper(updateFloor, floor),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("updateBuilding", {
        mutationFn: building => tokenWrapper(updateBuilding, building),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })
    queryClient.setMutationDefaults("UpdateRoom", {
        mutationFn: room => tokenWrapper(updateRoom, room),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })

    queryClient.setMutationDefaults("EditIndent", {
        mutationFn: indent => tokenWrapper4(updateIndent, indent),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })

    queryClient.setMutationDefaults("AddIndent", {
        mutationFn: () => tokenWrapper4(createIndent, mainEditorState.selectedRoomId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        }
    })

    queryClient.setMutationDefaults("DeleteIndent", {
        mutationFn: indentId => tokenWrapper4(deleteIndent, indentId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('API')
        },
        onError: (error1, variables) => {
            console.log("Error")
        }
    })

    if(isLoading || mapData === undefined){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Something went wrong</div>
    }

    //TODO handle change setMainEditorState function, to handle selected value, and set approriate value, IE: different room -> update select building & floor
    return (
        <div>
            <div className={"editorContainer"}>
                <Header map={mapData} handleClearSelectedMap={handleClearSelectedMap}/>
                <MapCanvas map={mapData} mainEditorState={mainEditorState} updateEditorState={setMainEditorState}/>
                <SettingsPanel map={mapData} mainEditorState={mainEditorState} updateEditorState={setMainEditorState}/>
            </div>
        </div>


    );
}

export default MapEditor;