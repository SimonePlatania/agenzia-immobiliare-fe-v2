import MainRouter from "@/components/main/MainRouter";

const MainContent = () => {

    return (
        <main className="main-content flex-grow-1 content">
            <div className="d-flex flex-column justify-content-center w-100">
                <div className="container-fluid px-2 px-md-2">
                    <span className={"visually-hidden"} aria-label={"Contenuto principale"}>Contenuto principale</span>
                    <MainRouter/>
                </div>
            </div>
        </main>
    )
}

export default MainContent
