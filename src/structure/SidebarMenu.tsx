import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/store"
import useSidebarMenu from "@/hook/useSidebarMenu"
import { MenuStructure } from "@/store/slices/uiSlice"

const SidebarMenu = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch<any>()
    const user = useSelector((state: AppState) => state.utente)
    const menu: MenuStructure[] = useSidebarMenu()

    const collectAllChildLabels = (item: MenuStructure): string[] => {
        if (!item.submenus) return []
        return item.submenus.flatMap((child) => [
            child.label,
            ...collectAllChildLabels(child)
        ])
    }

    const [openMenus, setOpenMenus] = useState<string[]>(() =>
        menu
            .filter(
                (item) =>
                    item.submenus && item.submenus.length > 0 && !item.disabled
            )
            .map((item) => item.label)
    )

    const toggleMenu = (item: MenuStructure) => {
        setOpenMenus((prev) =>
            prev.includes(item.label)
                ? prev.filter(
                      (l) =>
                          l !== item.label &&
                          !collectAllChildLabels(item).includes(l)
                  )
                : [...prev, item.label]
        )
    }

    const handleClick = (item: MenuStructure) => {
        if (item.clickAction) {
            typeof item.clickAction !== "object"
                ? item.clickAction()
                : (item.clickAction as (() => void)[]).forEach((fn) => fn())
        }
        if (item.dispatchAction) {
            typeof item.dispatchAction !== "object"
                ? dispatch(item.dispatchAction())
                : (item.dispatchAction as any[]).forEach((fn) => dispatch(fn()))
        }
    }

    const currentSegment = pathname.split("/").at(-1)

    const renderMenu = (
        items: MenuStructure[],
        level: number = 0
    ): (null | React.JSX.Element)[] =>
        items.map((item) => {
            if (item.notRendered(pathname, user)) return null

            const isDisabled = item.disabled(pathname, user)
            const isActive = currentSegment === item.path

            return (
                <li key={item.label} className="sidebar-item">
                    {item.submenus ? (
                        <>
                            {item.isSeparated && <hr />}
                            <button
                                className="sidebar-toggle"
                                onClick={() => toggleMenu(item)}
                            >
                                <span>{item.label}</span>
                                <i
                                    className={`bi bi-chevron-${
                                        openMenus.includes(item.label)
                                            ? "up"
                                            : "down"
                                    }`}
                                />
                            </button>
                            {openMenus.includes(item.label) && (
                                <ul className="sidebar-submenu">
                                    {renderMenu(item.submenus, level + 1)}
                                </ul>
                            )}
                        </>
                    ) : (
                        <>
                            {item.isSeparated && <hr />}
                            <Link
                                to={isDisabled ? "" : item.path}
                                onClick={() => handleClick(item)}
                                className={`sidebar-link ${
                                    isActive ? "active" : ""
                                } ${isDisabled ? "disabled" : ""}`}
                            >
                                {item.label}
                            </Link>
                        </>
                    )}
                </li>
            )
        })

    return (
        <fieldset className="fieldset-sidebar">
            <legend>Dashboard</legend>
            <ul className="sidebar-list">{renderMenu(menu)}</ul>
        </fieldset>
    )
}

export default SidebarMenu
