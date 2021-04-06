import ReactDOM from 'react-dom';
import App from 'App';
import {Auth0Provider} from "react-auth0-spa";
import config from "config/auth_config.json";
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();


ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        audience={config.audience}
    >
        <QueryClientProvider client={client}>
            <div className={"App"}>
                <App />
            </div>
        </QueryClientProvider>
    </Auth0Provider>, document.getElementById('root'));

