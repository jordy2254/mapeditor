
import {Map} from "data/RestApiData"
import {useAuth0} from "../react-auth0-spa";

type Props = {
}

const Logout:React.FC<Props> = () => {
    const { logout } = useAuth0();
    return <span id={"logout"}><a href="" onClick={() => logout({ returnTo: window.location.origin })}>Logout <i
        className="fas fa-sign-out-alt"></i></a></span>
}

export default Logout;