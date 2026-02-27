import React, { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import BreadCrumb from "@/custom/Breadcrumb"
import SidebarMenu from "@/structure/SidebarMenu"

const HomeLayout = () => {
    const { pathname } = useLocation()
    const [isExtraWide, setIsExtraWide] = useState(window.innerWidth >= 1900)

    useEffect(() => {
        const handleResize = () => {
            setIsExtraWide(window.innerWidth >= 1900)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="main-content flex-grow-1 content">
            <div className="container px-3">
                <div className="row flex-nowrap">
                    {isExtraWide && (
                        <div
                            style={{
                                width: "330px",
                                marginLeft: "-310px",
                                flex: "0 0 auto",
                                overflowX: "hidden"
                            }}
                        >
                            <SidebarMenu />
                        </div>
                    )}
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <BreadCrumb />

                        <div className="mb-5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLayout
