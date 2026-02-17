import {useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {Navigate} from "react-router-dom";
import {AppPaths} from "@/utils/constants/routes";

const ProtectedRoute = ({children, ruoliAutorizzati}: { children: JSX.Element, ruoliAutorizzati: string[] }) => {
    const ruolo = useSelector((state: AppState) => state.utente.ruolo);

    if (!ruoliAutorizzati.includes(ruolo)) {
        return <Navigate replace to={AppPaths.LOGIN}/>
    }

    return children
}

export default ProtectedRoute
