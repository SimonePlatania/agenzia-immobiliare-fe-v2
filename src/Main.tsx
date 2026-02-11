import 'bootstrap-icons/font/bootstrap-icons.css'
import "./styles/App.css"
import "./styles/index.css"
import "core-js/stable"
import "react-loading-skeleton/dist/skeleton.css"
import "@fortawesome/fontawesome-free/css/all.min.css"


import {Provider} from "react-redux"
import {storeApp} from "./store/store"
import {createRoot, type Root} from "react-dom/client";
import Login from "@/components/layout/Login";

const rootElement: HTMLElement =
    document.getElementById("root") ?? new HTMLElement()

const root: Root = createRoot(rootElement)

root.render(
    <Provider store={storeApp}>
        <Login/>
    </Provider>
)
