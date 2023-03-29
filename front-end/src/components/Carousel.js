import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Carousel({ list, data }) {
  const returnImages = (endpoint) => {
    const link = require(`../images/${endpoint}.jpg`);
    return (
      <img
        className="object-cover h-full w-full opacity-90"
        src={ link }
        alt="imagem de comida"
      />
    );
  };

  return (
    <Swiper
      className="w-full h-full"
      modules={ [Autoplay] }
      loop="true"
      autoplay={ { delay: data.time } }
      direction={ data.direction }
    >
      {
        list.map((endpoint, index) => (
          <SwiperSlide key={ index }>
            { returnImages(endpoint) }
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

Carousel.propTypes = {
  list: PropTypes.arrayOf().isRequired,
  data: PropTypes.shape({
    direction: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};
