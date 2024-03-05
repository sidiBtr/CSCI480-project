import React from 'react';
import './homePage.css';
import image from '../images/image.png'
import help from '../images/help.png'
import image035 from '../images/035.JPG'
import image110 from '../images/110.JPG'

export default function Home() {
  return (
    <>
      <div className='home-page-container'>
      <h2>Millstream Woodcarvers Club</h2>
      <div className="content">
        <p>The club welcomes of youth and adults from all walks of life from beginners 
        to experienced carvers who desire to learn more about wood carving and burning. 
        Our purpose is to promote wood carving and to share ideas and techniques of wood carving 
        in Northwestern Ohio. The club offers a carving resource center for classes, power equipment, 
        tools, wood supply, a resource library and weekly fellowship among members 
        at our clubhouse at open carving sessions and scheduled events. 
        The clubhouse is located at 2230 Blanchard Avenue in Findlay, Ohio. </p>
      </div>
      
    </div>
    <footer>
        <p>Millstream Woodcarvers Club</p>
        <p>2230 Blanchard Avenue, Findlay, Ohio</p>
        <p>Connect with us:</p>
        <div className="social-media-icons">
          {/* Add social media icons here */}
        </div>
    </footer>
    </>
    
  );
}
