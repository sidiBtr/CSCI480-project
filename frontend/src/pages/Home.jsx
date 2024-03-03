import React from 'react';
import './homePage.css';

export default function Home() {
  return (
    <>
      <div className='home-text'>
        <h3 className="welcome">Welcome To</h3>
        <h1>Millstream</h1>
        <h3 className="club">Woodcarvers Club!</h3>
        <p>We welcome youth and adults from all walks of life from beginners 
        to experienced carvers who desire to learn more about wood carving and burning. 
        Our purpose is to promote wood carving and to share ideas and techniques of wood carving 
        in Northwestern Ohio. The club offers a carving resource center for classes, power equipment, 
        tools, wood supply, a resource library and weekly fellowship among members 
        at our clubhouse at open carving sessions and scheduled events. 
        The clubhouse is located at <a href="http://maps.apple.com/?q=2230+Blanchard+Ave,+Findlay+OH">2230 Blanchard Avenue in Findlay, Ohio.</a>
        </p>
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
