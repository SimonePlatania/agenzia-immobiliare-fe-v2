import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigationType
} from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { resetDangerMessage } from "@/store/slices/messagesSlice"
import { AppPaths } from "@/utils/constants/routes"
import Login from "@/components/pages/Login"
import Registrazione from "@/components/pages/Registrazione"
import CreazioneAnnuncio from "@/components/pages/CreazioneAnnuncio"
import RicercaAnnuncio from "@/components/pages/RicercaAnnuncio"
import ProtectedRoute from "@/custom/utils/ProtectedRoute"
import { Ruolo } from "@/utils/constants/consts"
import Impostazioni from "@/components/pages/Impostazioni"
import DomandeUtente from "@/components/pages/DomandeUtente"
import Home from "@/components/layout/Home"

const MainRouter = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const action = useNavigationType()

    useEffect(() => {
        dispatch(resetDangerMessage())
    }, [pathname, action])

    return (
        <div className={"mt-2"}>
            <Routes>
                <Route
                    path={AppPaths.REDIRECT}
                    element={<Navigate replace to={AppPaths.REGISTER} />}
                />
                <Route
                    path={AppPaths.RICERCA_MODIFICA}
                    element={<RicercaAnnuncio />}
                />
                <Route path={AppPaths.LOGIN} element={<Login />} />
                <Route path={AppPaths.REGISTER} element={<Registrazione />} />
                <Route
                    path={AppPaths.CREA_ANNUNCIO}
                    element={
                        <ProtectedRoute
                            ruoliAutorizzati={[Ruolo.AMMINISTRATORE]}
                        >
                            <CreazioneAnnuncio />
                        </ProtectedRoute>
                    }
                />
                <Route path={AppPaths.HOME} element={<Home />} />
                <Route
                    path={AppPaths.ANNUNCIO_DETTAGLIO}
                    element={<CreazioneAnnuncio />}
                />
                <Route
                    path={AppPaths.ANNUNCIO_DETTAGLIO_ID}
                    element={<DomandeUtente />}
                />
                <Route
                    path={AppPaths.IMPOSTAZIONI}
                    element={<Impostazioni />}
                />
            </Routes>
        </div>
    )
}

export default MainRouter
