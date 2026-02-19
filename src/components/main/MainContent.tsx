import MainRouter from "@/components/main/MainRouter";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {useNavigate} from "react-router-dom";
import {AppPaths} from "@/utils/constants/routes";

const MainContent = () => {

    const {email} = useSelector((state: AppState) => state.utente)
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate(AppPaths.LOGIN)
        }
    }, []);

    return (
        <main>
            <span className="visually-hidden" aria-label="Contenuto principale">Contenuto principale</span>
            <MainRouter/>
        </main>
    )
}

export default MainContent
