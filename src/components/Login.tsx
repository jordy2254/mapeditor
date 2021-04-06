
import {Map} from "data/RestApiData"
import {useAuth0} from "../react-auth0-spa";

type Props = {
}

const Logout:React.FC<Props> = () => {
    const { loginWithRedirect } = useAuth0();
    return <span id={"login"}><a href="" onClick={() => loginWithRedirect()}>Login <i
        className="fas fa-sign-in-alt"></i></a></span>
}

export default Logout;