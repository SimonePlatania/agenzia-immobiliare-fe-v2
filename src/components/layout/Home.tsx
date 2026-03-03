import { Carousel } from "react-bootstrap"
import img1 from "@/img/home-img/img1.jpg"
import img2 from "@/img/home-img/img2.jpg"
import img3 from "@/img/home-img/img3.jpg"
import img4 from "@/img/home-img/img4.jpg"
import img5 from "@/img/home-img/img5.jpg"
import img6 from "@/img/home-img/img6.jpg"
import img7 from "@/img/home-img/img7.jpg"
import img8 from "@/img/home-img/img8.jpg"
import img9 from "@/img/home-img/img9.jpg"
import img10 from "@/img/home-img/img10.jpg"
import img11 from "@/img/home-img/img11.jpg"
import img12 from "@/img/home-img/img12.jpg"

const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12
]

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
            <div className="carousel-style">
                <Carousel interval={3000} indicators={true}>
                    {images.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="carousel-item-style d-block w-100"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Home
