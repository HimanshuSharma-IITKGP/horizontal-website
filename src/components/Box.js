import React, { useState, useEffect } from "react";
import classes from "./Box.module.css";

const Box = () => {
  const [pos, setPos] = useState(0);
  const [keyCode, setKeyCode] = useState();
  const [boyPos, setBoyPos] = useState(600);

  const boyClasses =
    keyCode === 37
      ? `left-animation`
      : keyCode === 39
      ? `right-animation`
      : "animation-box";
  const spinnerClasses =
    keyCode === 37
      ? `boy-animation-left`
      : keyCode === 39
      ? `boy-animation-right`
      : `animation-spinner`;
  const change = 10;

  console.log(boyClasses, spinnerClasses);
  useEffect(() => {
    const onKeyDown = (event) => {
      console.log(event);
      setKeyCode(event.keyCode);

      // right arrow
      if (event.keyCode === 39) {
        console.log(event.key);

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
      // document.removeEventListener("keyup", onKeyUp);
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

      <div className={classes[boyClasses]} style={boyStyle}>
        <div className={classes[spinnerClasses]}></div>
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
