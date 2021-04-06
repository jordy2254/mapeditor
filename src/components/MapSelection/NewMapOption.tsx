
import {Map} from "data/RestApiData"
import Logout from "../Logout";


type Props = {
    id:number
    icon:any
    text:string
    callback: (id:number) => void
}

const NewMapOption:React.FC<Props> = ({id, icon, text, callback}) => {
    return <div className={"mapOptionContainer"}>
            <div onClick={()=>callback(id)} className={"mapOption"}>
                <div className={"mapOptionOverlay"}>
                </div>
                <img className={"icon"} src={icon} alt={""}/>
                <div className={"title"}>{text}</div>
            </div>
    </div>
}

export default NewMapOption;