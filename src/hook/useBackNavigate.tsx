import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import type {AppState} from "@/store/store";
import {setBreadCrumbState} from "@/store/slices/breadCrumb-slice";
import {updatedBreadCrumbs} from "@/utils/custom-utils";
import {AppPaths} from "@/utils/constants/routes";

const useBackNavigate = () => {
    const breadcrumbs = useSelector((state: AppState) => state.breadcrumb)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (path: AppPaths) => {
        dispatch(
            setBreadCrumbState(
                path != AppPaths.HOME
                    ? updatedBreadCrumbs(path, breadcrumbs)
                    : [AppPaths.HOME]
            )
        )
        let navigationPath = `/${AppPaths.HOME}`
        switch (path) {
            case AppPaths.HOME:
                break
            default:
                navigationPath = navigationPath.concat(`/${path}`)
                break
        }
        navigate(`${navigationPath}`)
    }
}

export default useBackNavigate
