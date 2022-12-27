import React from "react";
import Slider from "react-slick";
import "./BannerSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}
function BannerSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          {props.imageUrl.map((url) => {
            return <img className="banner-img" key={url} src={url}></img>;
          })}
          {props.videoUrl.map((url) => {
            return (
              <iframe
                key={url}
                src={url}
                title={url}
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default BannerSlider;
