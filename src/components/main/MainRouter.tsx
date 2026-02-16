import {Navigate, Route, Routes, useLocation, useNavigationType} from "react-router-dom"
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {resetDangerMessage} from "@/store/slices/messagesSlice";
import {AppPaths} from "@/utils/constants/routes";
import Login from "@/components/pages/Login";
import Registrazione from "@/components/pages/Registrazione";
import CreazioneAnnuncio from "@/components/pages/CreazioneAnnuncio";
import RicercaAnnuncio from "@/components/pages/RicercaAnnuncio";

const MainRouter = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const action = useNavigationType()

    useEffect(() => {
        dispatch(resetDangerMessage())
    }, [pathname, action])

    return (
        <div className={"mt-2"}>
            <Routes>
                <Route
                    path={AppPaths.REDIRECT}
                    element={<Navigate replace to={AppPaths.REGISTER}/>}
                />
                <Route path={AppPaths.RICERCA_MODIFICA} element={<RicercaAnnuncio/>}/>
                <Route path={AppPaths.LOGIN} element={<Login/>}/>
                <Route path={AppPaths.REGISTER} element={<Registrazione/>}/>
                <Route path={AppPaths.CREA_ANNUNCIO} element={<CreazioneAnnuncio/>}/>
            </Routes>
        </div>
    )
}

export default MainRouter;
