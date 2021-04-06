import 'App.css';
import {useAuth0} from "react-auth0-spa";
import {useState} from "react";
import MapSelection from "components/MapSelection/MapSelection";
import MapEditor from "./components/MapEditor/MapEditor";
import LandingPage from "./components/LandingPage";

const App = () => {
    const {loading, loginWithRedirect, isAuthenticated} = useAuth0();
    const [selectedMapId, setSelectedMapId] = useState(-1 as number)

    if(loading){
        return (<div>Loading...</div>);
    }

    const setSelectedMap = (id: number) =>{
        setSelectedMapId(id)
    }

    const clearSelectedMap = () =>{
        setSelectedMapId(-1)
    }

    if(!isAuthenticated){
        return <LandingPage/>
    }


    if(selectedMapId === -1){
        return <MapSelection handleSelectMap={setSelectedMap}/>
    }

    if(selectedMapId !== -1){
        return (<MapEditor selectedMapId={selectedMapId} handleClearSelectedMap={clearSelectedMap}/>);
    }
    return <div>Error</div>
}

export default App;
