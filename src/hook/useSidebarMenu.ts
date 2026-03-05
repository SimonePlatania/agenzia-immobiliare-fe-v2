import { useDispatch, useSelector } from "react-redux"
import { MenuStructure } from "@/store/slices/uiSlice"
import { clearMessages } from "@/store/slices/messagesSlice"
import { AppPaths } from "@/utils/constants/routes"
import { AppState } from "@/store/store"
import { setSection } from "@/store/slices/sectionSlice"
import { Ruolo, Sections } from "@/utils/constants/consts"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { scrollToTop } from "@/utils/genericUtils"

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
            //NOTE -> Dashboard AMMINISTRATORE (5 elementi)
            {
                label: "Inserisci annuncio",
                path: AppPaths.CREA_ANNUNCIO,
                disabled: () => false,
                notRendered: () => !isUtenteAdmin,
                clickAction: () => {
                    dispatch(setSection(Sections.ACQUISIZIONE))
                    scrollToTop()
                    dispatch(clearMessages())
                }
            },
            {
                label: "Ricerca annunci",
                path: AppPaths.RICERCA_MODIFICA,
                disabled: () => false,
                notRendered: () => isSettingsDashboard,
                clickAction: () => {
                    dispatch(setSection(Sections.RICERCA))
                    scrollToTop()
                    dispatch(clearMessages())
                }
            },
            {
                label: "Modifica dati anagrafici cliente",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isAdminSettingsDashboard,
                clickAction: () => {
                    scrollToTop()
                    dispatch(setSection(Sections.LISTA_UTENTI))
                    dispatch(clearMessages())
                }
            },
            {
                label: "Gestisci domande",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isAdminSettingsDashboard,
                clickAction: () => {
                    scrollToTop()
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
                    scrollToTop()
                    dispatch(setSection(Sections.REGISTRA_UTENTE))
                    dispatch(clearMessages())
                }
            },
            //NOTE -> Dashboard UTENTE (2 elementi)
            {
                label: "Le mie domande",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => isUtenteAdmin,
                clickAction: () => {
                    dispatch(setSection(Sections.IMPOSTAZIONI))
                    scrollToTop()
                    dispatch(clearMessages())
                }
            },
            {
                label: "Modifica password personale",
                path: AppPaths.IMPOSTAZIONI,
                disabled: () => false,
                notRendered: () => !isSettingsDashboard,
                clickAction: () => {
                    scrollToTop()
                    dispatch(setSection(Sections.MODIFICA_PASSWORD))
                    dispatch(clearMessages())
                }
            }
        ],
        [isSettingsDashboard, isUtenteAdmin, dispatch]
    )
}
export default useSidebarMenu
