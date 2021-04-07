import {Map, Building, Floor, Room, Sensor, Indent} from "data/RestApiData";
import {useMutation, useQueryClient} from "react-query";
import {getCurrentUserMaps} from "../../../../api/map";
import {useAuth0} from "../../../../react-auth0-spa";
import {MainEditorState} from "../../MapEditor";

type Props<T extends object> = {
    elems: any[]
    idKey: keyof any
    stringFunction: (value:any) => string
    updateKey: keyof T
    listTitle:string
    existingState: T
    updateState: (state: T) => void
    addMutationKey: string
}

const GenericOptionList: <T extends object>(p: Props<T>) => React.ReactElement<Props<T>> = ({elems, idKey, stringFunction, updateKey, listTitle, existingState, updateState, addMutationKey}) =>{
    const createOption = (elem: any) =>{
        return <option key={addMutationKey.toString() + ":" + idKey.toString() + elem[idKey]}value={elem[idKey]}>{stringFunction(elem)}</option>
    }

    const mute = useMutation(addMutationKey);

    const add = () =>{
        mute.mutate();
    }

    return (
        <div>
            <h1>{listTitle}</h1>
            <div className={"settingsListContainer"}>
                <select className={"settingsList"} id={addMutationKey} multiple={true} onChange={event=>{
                    updateState({...existingState, [updateKey]:(parseInt(event.target.value))})
                }}>
                    {elems.map(value =>{
                        return createOption(value)
                    })}
                </select>
            </div>
            <button onClick={add}>Add</button> <button>delete</button>
        </div>
    );
}

export function createBuildingList(buildings:Building[], mainEditorState:MainEditorState, updateEditorState:(newState:MainEditorState)=>void){
    return <GenericOptionList<MainEditorState> key={mainEditorState.selectedBuildingId} elems={buildings}
                                              idKey={"id"}
                                              stringFunction={b =>{return b.buildingName}}
                                              updateKey={"selectedBuildingId"}
                                              listTitle={"Building List"}
                                              existingState={mainEditorState}
                                              updateState={updateEditorState}
                                              addMutationKey={"AddBuilding"}/>
}

export function createFloorList(floors:Floor[], mainEditorState:MainEditorState, updateEditorState:(newState:MainEditorState)=>void){
    return <GenericOptionList<MainEditorState> key={mainEditorState.selectedFloorId} elems={floors.sort((a, b) => a.floorNumber - b.floorNumber)}
                                              idKey={"id"}
                                              stringFunction={floor =>{return floor.floorNumber + ' | ' + floor.floorName}}
                                              updateKey={"selectedFloorId"}
                                              listTitle={"Floor List"}
                                               existingState={mainEditorState}
                                               updateState={updateEditorState}
                                              addMutationKey={"AddFloor"}/>
}

export function createRoomList(rooms:Room[], mainEditorState:MainEditorState, updateEditorState:(newState:MainEditorState)=>void){
    return <GenericOptionList<MainEditorState> key={mainEditorState.selectedRoomId} elems={rooms}
                                              idKey={"id"}
                                              stringFunction={b =>{return b.name}}
                                              updateKey={"selectedRoomId"}
                                              listTitle={"Room List"}
                                               existingState={mainEditorState}
                                               updateState={updateEditorState}
                                              addMutationKey={"AddRoom"}/>
}

export function createSensorList(sensors:Sensor[], mainEditorState:MainEditorState, updateEditorState:(newState:MainEditorState)=>void){
    return <GenericOptionList<MainEditorState> key={mainEditorState.selectedSensorId} elems={sensors}
                                              idKey={"id"}
                                              stringFunction={b =>{return b.id}}
                                              updateKey={"selectedSensorId"}
                                              listTitle={"Sensor List"}
                                               existingState={mainEditorState}
                                               updateState={updateEditorState}
                                              addMutationKey={"AddSensor"}/>
}

export default GenericOptionList;