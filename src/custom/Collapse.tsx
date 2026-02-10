const Collapse = ({ id, title, children }: any) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`${id}-heading`}>
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#" + id}
                    aria-expanded="true"
                    aria-controls={id}>
                    {title}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse show" aria-labelledby={`${id}-heading`}>
                <div className="accordion-body">{children}</div>
            </div>
        </div>
    )
}

export default Collapse
