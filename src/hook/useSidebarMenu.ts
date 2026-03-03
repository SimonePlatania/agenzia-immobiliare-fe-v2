import { useDispatch, useSelector } from "react-redux"
import { MenuStructure } from "@/store/slices/uiSlice"
import { clearMessages } from "@/store/slices/messagesSlice"
import { AppPaths } from "@/utils/constants/routes"
import { AppState } from "@/store/store"
import { setSection } from "@/store/slices/sectionSlice"
import { Ruolo, Sections } from "@/utils/constants/consts"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useSidebarMenu = (): MenuStructure[] => {
    const dispatch = useDispatch()
    const section = useSelector((state: AppState) => state.section)
    const { ruolo } = useSelector((state: AppState) => state.utente)
    const { pathname } = useLocation()

    const isUtenteAdmin: boolean = ruolo === Ruolo.AMMINISTRATORE
    const isSettingsDashboard: boolean = pathname === AppPaths.IMPOSTAZIONI
    const isAdminSettingsDashboard: boolean =
        pathname === AppPaths.IMPOSTAZIONI && isUtenteAdmin

    return useMemo(
        () => [
            {
                label: "Crea annuncio",
                path: AppPaths.CREA_ANNUNCIO,
                disabled: () => false,
                notRendered: () => !isUtenteAdmin,
                clickAction: () => dispatch(clearMessages())
            },
            {
                label: "Ricerca annunci",
                path: AppPaths.RICERCA_MODIFICA,
                disabled: () => false,
                notRendered: () => isSettingsDashboard,
                clickAction: () => {
                    dispatch(clearMessages())
                }
            },
            {
                label: "Modifica dati anagrafici cliente",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isAdminSettingsDashboard,
                clickAction: () => dispatch(clearMessages())
            },
            {
                label: "Gestisci domande",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isAdminSettingsDashboard,
                clickAction: () => {
                    dispatch(setSection(Sections.IMPOSTAZIONI))
                    dispatch(clearMessages())
                }
            },
            {
                label: "Registra nuovo utente",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isAdminSettingsDashboard,
                clickAction: () => {
                    dispatch(setSection(Sections.REGISTRA_UTENTE))
                    dispatch(clearMessages())
                }
            },
            {
                label: "Modifica password personale",
                path: AppPaths.CODICE_DITTA,
                disabled: () => false,
                notRendered: () => !isSettingsDashboard,
                clickAction: () => dispatch(clearMessages())
            }
        ],
        [isSettingsDashboard, isUtenteAdmin, dispatch]
    )
}
export default useSidebarMenu
