import {useDispatch, useSelector} from "react-redux"
import {AppState} from "@/store/store"
import {MenuStructure} from "@/store/slices/uiSlice"
import {clearMessages} from "@/store/slices/messagesSlice"
import {AppPaths} from "@/utils/constants/routes";

const useSidebarMenu = (): MenuStructure[] => {
    const utente = useSelector((state: AppState) => state.utente.nome)
    const dispatch = useDispatch()
    return [
        {
            label: "Home",
            path: AppPaths.HOME,
            disabled: () => false,
            notRendered: () => false,
            clickAction: () => {
                dispatch(clearMessages())
            }
        },
        {
            label: "Test",
            clickAction: () => {
                dispatch(clearMessages())
            },
            path: AppPaths.RICERCA_MODIFICA,
            disabled: () => false,
            notRendered: () => false
        }]
}
export default useSidebarMenu
