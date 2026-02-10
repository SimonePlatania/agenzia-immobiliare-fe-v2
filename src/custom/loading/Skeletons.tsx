import Skeleton from "react-loading-skeleton"
import { Col, Row } from "react-bootstrap"

export const SelectSkeleton = () => {
    return (
        <>
            <Skeleton height={20} width={150} />
            <Skeleton height={40} />
        </>
    )
}
export const CategorieSkeletons = () => {
    return (
        <div className="mb-2">
            <Skeleton count={4} height={20} />
        </div>
    )
}
export const AppSkeleton = () => {
    return (
        <main id="main" className="">
            <div className="container  py-lg-5 ">
                <Row>
                    <Col sm={12}>
                        <Skeleton height={30} />
                    </Col>
                    <Col sm={12} md={2}>
                        <Skeleton height={250} />
                    </Col>
                    <Col sm={12} md={10}>
                        <Skeleton height={50} />
                        <Skeleton height={200} />
                        <Skeleton count={10} height={20} />
                    </Col>
                </Row>
            </div>
        </main>
    )
}
