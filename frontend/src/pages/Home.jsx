import React from 'react'
import { Link } from 'react-router-dom'
import './homePage.css'
import image from '../images/DSC_0814 2.JPG'
import painted from '../images/new.JPG'
import image416 from '../images/416.JPG'
import eagle from '../images/Eagle.JPG'
import image141 from '../images/141.JPG'
import image174 from '../images/174.JPG'
import tom from '../images/Tom Miller_edit.png'


export default function Home() {
  return (
    <div className='home-container'>
      <section id="welcome-section">
    <div className="img-text">
      <div className="home-text">
        <h3 className="welcome">Welcome To</h3>
        <h1>Millstream</h1>
        <h3 className="club">Wood Carvers!</h3>
        <p>We welcome youth and adults from all walks of life from beginners 
        to experienced carvers who desire to learn more about wood carving and burning. 
        Our purpose is to promote wood carving and to share ideas and techniques of wood carving 
        in Northwestern Ohio. The club offers a carving resource center for classes, power equipment, 
        tools, wood supply, a resource library and weekly fellowship among members 
        at our clubhouse at open carving sessions and scheduled events. 
        </p>
        </div>
        <div className="home-image">
        <img title="Our founder Tom Miller" src={tom} alt="Our founder Tom Miller"/>
        </div>
      </div>
    </section>

    <div className="gallery-container">
    <section id="gallery">
      <h3 className="gallery-text">Some of Our Work:</h3>
      <div className="images">
        <img src={image} alt="Antler with fish design inside"/>
        <img src={painted} alt="A painted caricature carving"/>
        <img src={image416} alt="Wood engraved shield"/>
        <img src={eagle} alt="Wood burned eagle"/>
        <img src={image141} alt="Wood carved Native American"/>
        <img src={image174} alt="Wood carved cross"/>
      </div>
    </section>
    </div>
    <footer>
        <p>WIR GEBEN HOLZ LEBEN</p>
        <p><Link to={"http://maps.apple.com/?q=2230+Blanchard+Ave,+Findlay+OH"}>2230 Blanchard Avenue, Findlay, Ohio</Link></p>
        <p>Connect with us:</p>
        <div className="social-media-icons">
        <p>Email</p>
        <p>Facebook</p>
        </div>
    </footer>
    </div>
    
    
    
  );
}
