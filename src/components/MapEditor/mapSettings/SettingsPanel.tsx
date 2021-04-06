import {Map, Building, Floor, Room} from "data/RestApiData";
import BuildingOptions from "./options/BuildingOptions";
import FloorOptions from "./options/FloorOptions";
import {MainEditorState} from "../MapEditor";
import RoomOptions from "./options/RoomOptions";
import GenericOptionList, {createBuildingList, createFloorList, createRoomList, createSensorList} from "./lists/GenericOptionList";
import * as Url from "url";

type Props = {
    map: Map
    mainEditorState: MainEditorState
    updateEditorState: (mainEditorState: MainEditorState) => void
}

const SettingsPanel:React.FC<Props> = ({map, mainEditorState, updateEditorState}) =>{

    const displayList = () =>{
        if(mainEditorState.selectedBuildingId == -1){
            return createBuildingList(map.buildings, mainEditorState, updateEditorState)
        }

        const selectedBuilding:Building | undefined = map.buildings.find(value => value.id == mainEditorState.selectedBuildingId);

        if(selectedBuilding == undefined){
            return <div>Building with current selected ID cannot be found</div>
        }
        if(mainEditorState.selectedFloorId == -1 && selectedBuilding != undefined){
            return  createFloorList(selectedBuilding.floors, mainEditorState, updateEditorState)
        }

        const selectedFloor: Floor | undefined = selectedBuilding.floors.find(value => value.id == mainEditorState.selectedFloorId);

        if(mainEditorState.selectedRoomId == -1 && selectedFloor != undefined){
            return createRoomList(selectedFloor.rooms, mainEditorState, updateEditorState)
        }
    }

    const displayOptions = () =>{
        if(mainEditorState.selectedRoomId != -1){
            const result: Room | undefined = map.buildings.flatMap(value => value.floors).flatMap(value => value.rooms).find(value => value.id === mainEditorState.selectedRoomId)
            if(result != undefined){
                return <RoomOptions room={result}/>
            }
        }
        if(mainEditorState.selectedFloorId != -1){
            const result: Floor | undefined = map.buildings.flatMap(value => value.floors).find(value => value.id === mainEditorState.selectedFloorId)

            if(result != undefined){
                return <div>
                    <FloorOptions floor={result}/>
                    {createSensorList(result.sensors, mainEditorState, updateEditorState)}
                </div>
            }
        }

        if(mainEditorState.selectedBuildingId != -1){
            const result: Building | undefined = map.buildings.find(value => value.id === mainEditorState.selectedBuildingId)
            if(result != undefined){
                return <BuildingOptions building={result}/>
            }
        }
    }

    const displayBackButton = () =>{
        if(mainEditorState.selectedRoomId != -1){
            return <button onClick={() => updateEditorState({...mainEditorState, selectedRoomId: -1})}>Back</button>
        }
        if(mainEditorState.selectedFloorId != -1){
            return <button onClick={() => updateEditorState({...mainEditorState, selectedFloorId: -1})}>Back</button>
        }
        if(mainEditorState.selectedBuildingId != -1){
            return <button onClick={() => updateEditorState({...mainEditorState, selectedBuildingId: -1})}>Back</button>
        }
    }

    return (
        <div className={"settingsContainer"}>

            <h1>Map Settings</h1>
            <button onClick={event => {
                let d = document.getElementById("generatedQR");
                if(d === null){
                    return;
                }
                let appURL = new URL("app://com.jordan.ips/sync");
                appURL.searchParams.append("mapid", map.id.toString());
                appURL.searchParams.append("pass", map.password);

                d.innerHTML = "<img src='http://api.qrserver.com/v1/create-qr-code/?data=" + appURL.toString() +"&size=200x200' alt='QrCode'>"
            }}>Generate QR Code</button>
            <div id="generatedQR"></div>
            {displayBackButton()}
            {displayOptions()}
            {displayList()}

        </div>
    );
}

export default SettingsPanel;