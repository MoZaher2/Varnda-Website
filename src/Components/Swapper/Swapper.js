import React from 'react';
import { Link } from 'react-router-dom';
import './Swapper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';

export default function Swapper({ cards, heading }) {
  return (
    <div className="container my-5">
      <h2 className="text-center my-5 h1">اعرف المزيد عن سوق العقارات في {heading}</h2>
      <Swiper
        spaceBetween={50}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className="p-2"
      >
        {cards.map(card => (
          <SwiperSlide key={card.id}> 
            <Link to={`/card/${card.id}`} className="card">
              <img src={card.image} alt={card.text} />
              <p>{card.text}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Swapper.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';
// export default function Swapper({ cards, heading }) {
//   return (
//     <div className="container my-5">
//       <h2 className="text-center my-5 h1">اعرف المزيد عن سوق العقارات في {heading}</h2>
//       <Swiper
//         spaceBetween={50}
//         breakpoints={{
//           320: {
//             slidesPerView: 1,
//           },
//           768: {
//             slidesPerView: 2,
//           },
//           1000: {
//             slidesPerView: 3,
//           },
//           1200: {
//             slidesPerView: 4,
//           },
//         }}
//         className="p-2"
//       >
//         {cards.map(card => (
//           <SwiperSlide key={card.id}> 
//             <Link to={`/card/${card.id}`} className="card">
//               <img src={card.image} alt={card.text} />
//               <p>{card.text}</p>
//             </Link>
//           </SwiperSlide>
//         ))}
//   <span slot="wrapper-start">Wrapper Start</span>
//   <span slot="wrapper-end">Wrapper End</span>
//       </Swiper>
//     </div>
//   );
// }
