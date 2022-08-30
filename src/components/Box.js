import React, { useState, useEffect } from "react";
import classes from "./Box.module.css";
import stillImage from '../images/Still.png'

const LeftAnimation = () => {
  return (
    <iframe src="https://giphy.com/embed/3ohryBhY2sPTWOW9PO" style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        frameBorder: "0",
      }} 
      title = 'animation-left'
      className="giphy-embed" 
      allowFullScreen></iframe>
  )
}

const RightAnimation = () => {

  return (
    <iframe
      src="https://giphy.com/embed/xTiTnlivzgGUGVwcLu"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        frameBorder: "0",
      }}
      className="giphy-embed"
      allowFullScreen
      title="running animation"
    ></iframe>
  );
}

const Box = () => {
  
  // console.log(animationBox)
  const [pos, setPos] = useState(0);
  const [keyCode, setKeyCode] = useState();
  const [boyPos, setBoyPos] = useState(600);



  const change = 10;

  // console.log(boyClasses, spinnerClasses);
  useEffect(() => {
    const onKeyDown = (event) => {
      // console.log(event);
      setKeyCode(event.keyCode);

      // right arrow
      if (event.keyCode === 39) {

        setPos((prev) => {
          return prev - change;
        });

        setBoyPos((prev) => {
          if (prev !== 600) {
            return prev
          }
          return prev + 50;
        });
      }
      //left arrow
      else if (event.keyCode === 37) {
        console.log(event.key);
        setPos((prev) => {
          return prev + change;
        });

        setBoyPos((prev) => {
          if (prev !== 600) {
            return prev;
          }
          return prev - 50;
        });
      }
    };

    const onKeyUp = () => {
      setTimeout(() => {
        setKeyCode(null);
        setBoyPos(600)
      }, 300);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const contentStyle = {
    transform: "translateX(" + pos + "px)",
  };

  const boyStyle = {
    left: boyPos,
  };
  return (
    <div className={classes.box}>
      <div className={classes.content} style={contentStyle}>
        Content
      </div>

      <div className={classes['animation-box']} style={boyStyle} id='animation-box'>
        {keyCode !== 39 && keyCode !== 37 && <img src={stillImage} alt='still' width='100px' height='100px' />}
        {keyCode === 39 && <RightAnimation className={classes['right-animation']}  style={{'z-index': '2'}} />}
        {keyCode === 37 && <LeftAnimation className={classes['left-animation']}  style={{'z-index': '2'}} />}
      </div>
    </div>
  );
};


export default Box;

/*
  by default boy is in the middle of page
  on right key press the boy has to look towards right
  on pressing down the right key the boy remains 50px right to the middle while showing the running state
  as the right key is pressed down the boy comes back to initial position (middle of the screen)
*/
