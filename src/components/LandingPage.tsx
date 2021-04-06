import {useState} from "react";
import {useQuery} from 'react-query'

import {useAuth0} from "react-auth0-spa";
import Login from "./Login";


type Props = {
}



const LandingPage:React.FC<Props> = () => {
    const {getTokenSilently} = useAuth0()


    return (
        <div className={"content"}>
           <nav><h1>Find me | Map Editor</h1> <Login/></nav>
            Creat maps to use with the find me location system with this website. Pricing etc...
        fancy demo video, list of features and more
        </div>
    );
}

export default LandingPage;