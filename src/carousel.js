// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import image1 from './images/med1.jpg';
// import image2 from './images/med2.jpg';
// import image3 from './images/med3.jpg';

// function Carousel() {
//   return (
//     <div id="demo" class="carousel slide" data-ride="carousel">
//   <ul class="carousel-indicators">
//     <li data-target="#demo" data-slide-to="0" class="active"></li>
//     <li data-target="#demo" data-slide-to="1"></li>
//     <li data-target="#demo" data-slide-to="2"></li>
//   </ul>
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img src={image1} alt="med1" width="1600" height="400"/>
//     </div>
//     <div class="carousel-item">
//       <img src={image2} alt="med2" width="1600" height="400"/>
//     </div>
//     <div class="carousel-item">
//       <img src={image3} alt="med3" width="1600" height="400"/>
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#demo" data-slide="prev">
//     <span class="carousel-control-prev-icon"></span>
//   </a>
//   <a class="carousel-control-next" href="#demo" data-slide="next">
//     <span class="carousel-control-next-icon"></span>
//   </a>
// </div> );
// }

// export default Carousel;
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import image2 from './images/med2.jpg';
import image3 from './images/med3.jpg';
import image4 from './images/med4.jpg';
import image5 from './images/med5.png';

function App() {
  return(
  <div className='bg-secondary'>

    <div style={{ maxWidth: '98%', margin: '0 auto' }}>
    <Carousel fade className=''>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image4}
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image5}
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    
    </Carousel>
    </div>
  </div>
);
}

export default App;

