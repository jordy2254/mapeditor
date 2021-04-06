
import {Map} from "data/RestApiData"
import Logout from "../Logout";
import {deleteMap} from "../../api/map";
import {useAuth0} from "../../react-auth0-spa";
import {useQueryClient} from "react-query";


type Props = {
    id:number
    icon:any
    text:string
    callback: (id:number) => void
}

const UserMapOption:React.FC<Props> = ({id, icon, text, callback}) => {
    const {getTokenSilently} = useAuth0()

    const queryClient = useQueryClient();

    const handleDeleteMap = async (id:number) =>{
        let confirmed = await window.confirm("Are you sure you wish to delete this map?")
        if(!confirmed){
            return;
        }
        const token = await getTokenSilently()
        await deleteMap(token, id)
        queryClient.invalidateQueries()
    }

    return <div className={"mapOptionContainer"}>
            <div onClick={()=>callback(id)} className={"mapOption"}>
                <div  className={"mapOptionOverlay"}>
                    <span onClick={e => e.stopPropagation()} className={"mapOptionOverlayContents"}> <span className={"deleteUserMap"} onClick={()=>handleDeleteMap(id)}><i className="fas fa-trash-alt"></i></span><span><i className="fas fa-edit"></i></span></span>
                </div>
                <svg className={"icon"} style={{backgroundImage: icon}}>
                    <image href={icon}></image>
                </svg>
                <div className={"title"}>{text}</div>
            </div>
    </div>
}

export default UserMapOption;