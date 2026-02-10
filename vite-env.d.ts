declare module "@vitejs/plugin-react"
declare module "vite-plugin-history"

declare module "@sogei/react-web-components-catalog"
declare module "*.png" {
    const value: any
    export = value
}
declare module "*.jsx" {
    const value: any
    export = value
}
declare module "*.tsx" {
    const value: any
    export = value
}
declare module "*.svg" {
    const content: any
    export default content
}

declare module "core-js/stable" {
    const value: any
    export = value
}

declare const __CONTEXT_PATH__: string
declare const __API_PATH__: string
declare const __HOST__: string
declare const __PORT__: string
