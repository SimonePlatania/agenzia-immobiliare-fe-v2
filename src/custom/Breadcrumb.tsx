import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import type {AppState} from "@/store/store";
import {addBreadCrumbState, setBreadCrumbState} from "@/store/slices/breadCrumb-slice";
import type {MenuStructure} from "@/store/slices/uiSlice";
import {findLabel} from "@/utils/custom-utils";
import {AppPaths} from "@/utils/constants/routes";
import useBackNavigate from "@/hook/useBackNavigate";

const BreadCrumb = (): React.JSX.Element => {
    const backNavigate = useBackNavigate()
    const { pathname } = useLocation()
    const breadcrumbs = useSelector((state: AppState) => state.breadcrumb)
    // const section = useSelector((state: AppState) => state.section)
    const dispatch = useDispatch()

    const checkHomePath = (path: string) => {
        switch (true) {
            case path.includes(AppPaths.HOME):
                path.replace(AppPaths.HOME, "")
                break
        }
        return path
    }

    const handleBreadcrumb = () => {
        let destination =
            pathname == AppPaths.HOME
                ? pathname
                : (pathname
                      .split(AppPaths.HOME)
                      ?.slice(1)
                      ?.pop()
                      ?.replace("/", "") as AppPaths)

        dispatch(addBreadCrumbState(destination))
    }

    useEffect(() => {
        handleBreadcrumb()
    }, [pathname])

    const getLabel = (path: AppPaths): AppPaths | string => {
        const label = findLabel(path) || path
        switch (true) {
            default:
                return label
        }
    }

    const isAppDescriptionSection = () => {
        return pathname.split("/").at(-1) == AppPaths.HOME
    }

    const disabledCondition = (index: number): boolean => {
        return index == breadcrumbs.length - 1
    }

    return (
        <div className={"mt-5 d-flex"}>
            <span className="breadcrumb-title me-2">Ti trovi in:</span>
            <ol className="breadcrumb" style={{ maxWidth: "1300px" }}>
                {breadcrumbs
                    .filter((path) => path !== AppPaths.MENU)
                    .map((path: AppPaths, index: number) => (
                        <li className="breadcrumb-item text-nowrap" key={path}>
                            <button
                                className={"btn btn-link mb-1"}
                                onClick={() => {
                                    backNavigate(path)
                                }}
                                disabled={
                                    isAppDescriptionSection() ||
                                    disabledCondition(index)
                                }
                                id={path?.toString()}
                                onMouseOver={(event) => {
                                    event.currentTarget.style.textDecoration =
                                        "underline"
                                }}
                                onMouseOut={(event) => {
                                    event.currentTarget.style.textDecoration =
                                        "none"
                                }}
                                onFocus={(event) => {
                                    event.currentTarget.style.textDecoration =
                                        "underline"
                                }}
                                onBlur={(event) => {
                                    event.currentTarget.style.textDecoration =
                                        "none"
                                }}
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: disabledCondition(index)
                                        ? "black"
                                        : isAppDescriptionSection()
                                        ? "grey"
                                        : "blue",
                                    cursor: disabledCondition(index)
                                        ? "not-allowed"
                                        : "pointer",
                                    fontWeight:
                                        index === breadcrumbs.length - 1
                                            ? "bold"
                                            : "normal",
                                    opacity: 1,
                                    textDecoration: "none",
                                    transition:
                                        "color 0.3s ease-out, fontWeight 0.3s ease-out"
                                }}
                            >
                                {getLabel(path)}
                            </button>
                        </li>
                    ))}
            </ol>
        </div>
    )
}
export default BreadCrumb
