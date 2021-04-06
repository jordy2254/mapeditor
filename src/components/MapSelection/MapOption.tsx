
import {Map} from "data/RestApiData"

type Props = {
    map: Map,
    handleSelectMap: (id: number) => void
}

const MapOption:React.FC<Props> = ({map, handleSelectMap}) => {

    return <div>{map.name}
        <button onClick={() => handleSelectMap(map.id)}>Select Map</button>
    </div>
}

export default MapOption;