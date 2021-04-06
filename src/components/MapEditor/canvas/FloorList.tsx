import {Map} from "data/RestApiData";
import {useMutation} from "react-query";
import {CanvasState} from "./MapCanvas";

type Props = {
    map: Map
    canvasState: CanvasState
    updateCanvasState: (canvasState: CanvasState) => void
}

const FloorList:React.FC<Props> = ({map, canvasState, updateCanvasState}) =>{
    const createOption = (elem: number) =>{
        return <option className={"floorIndexesOption"} selected={canvasState.selectedFloorIndex === elem} key={"fs:" + elem} value={elem}>{elem}</option>
    }


    const createList = () =>{
        let x:number[] = map.buildings
            .flatMap(value => value.floors)
            .map(value => value.floorNumber)

        let uniqueArr = Array.from(new Set(x));
        return uniqueArr.map(value => createOption(value))
    }

    return (
            <div className={"floorIndexesContainer"}>
                <select className={"floorIndexes"} multiple={true} onChange={event=>{
                    updateCanvasState({...canvasState, selectedFloorIndex:(parseInt(event.target.value))})
                }}>
                    {createList()}
                </select>
            </div>
    );
}

export default FloorList;