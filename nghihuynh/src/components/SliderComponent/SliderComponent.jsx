import { Image } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import * as SliderService from "../../services/SliderService";
const SliderComponent = ({}) => {
  const [sliders, setSlider] = useState([]);
  const fetchSliderAll = async () => {
    const res = await SliderService.getAllSlider();
    if (res?.status === "OK") {
      setSlider(res?.data);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  useEffect(() => {
    fetchSliderAll();
  }, []);
  return (
    <Slider {...settings}>
      {sliders &&
        sliders.length > 0 &&
        sliders
          .slice(0, 3)
          .map((slider, index) => (
            <img
              src={slider.image}
              alt="Promotion Image"
              style={{ width: 160, height: 90, borderRadius: 10 }}
            />
          ))}
    </Slider>
  );
};

export default SliderComponent;