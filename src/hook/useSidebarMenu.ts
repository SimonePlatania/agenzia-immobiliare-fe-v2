import { useDispatch, useSelector } from "react-redux"
import { MenuStructure } from "@/store/slices/uiSlice"
import { clearMessages } from "@/store/slices/messagesSlice"
import { AppPaths } from "@/utils/constants/routes"
import { AppState } from "@/store/store"

const useSidebarMenu = (): MenuStructure[] => {
    const dispatch = useDispatch()
    const section = useSelector((state: AppState) => state.section)
    const isImpostazioni: boolean = section === AppPaths.IMPOSTAZIONI
    return [
        {
            label: "Crea annuncio",
            path: AppPaths.CREA_ANNUNCIO,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => dispatch(clearMessages())
        },
        {
            label: "Ricerca annunci",
            path: AppPaths.RICERCA_MODIFICA,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => {
                dispatch(clearMessages())
            }
        },
        {
            label: "Modifica dati anagrafici cliente",
            path: AppPaths.ANNUNCIO_DETTAGLIO,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => dispatch(clearMessages())
        },
        {
            label: "Gestisci annunci",
            path: AppPaths.COMUNICAZIONI_PREVENTIVE,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => dispatch(clearMessages())
        },
        {
            label: "Registra nuovo utente",
            path: AppPaths.REGISTER,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => dispatch(clearMessages())
        },
        {
            label: "Modifica password personale",
            path: AppPaths.CODICE_DITTA,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => dispatch(clearMessages())
        }
    ]
}
export default useSidebarMenu
