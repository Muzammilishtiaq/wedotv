import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function BackSpaceKey() {
  const GOback = useNavigate()
    const handleBackspace = (event) => {
        // Check if the pressed key is the backspace key (keyCode 8)
        if (event.keyCode === 8) {
          // Go back to the previous page
          GOback(-1);
        }
      };
    
      useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('keydown', handleBackspace);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleBackspace);
        };
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default BackSpaceKey;
