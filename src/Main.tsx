import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/Index.css"
import "./styles/Personal.css"
import "core-js/stable"
import "react-loading-skeleton/dist/skeleton.css"
import "@fortawesome/fontawesome-free/css/all.min.css"


import {Provider} from "react-redux"
import {storeApp} from "./store/store"
import {createRoot, type Root} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import BasicLayout from "@/components/layout/BasicLayout";

const rootElement: HTMLElement =
    document.getElementById("root") ?? new HTMLElement()

const root: Root = createRoot(rootElement)

root.render(
    <Provider store={storeApp}>
        <BrowserRouter basename={`/${__CONTEXT_PATH__}`}>
            <BasicLayout/>
        </BrowserRouter>
    </Provider>
)
