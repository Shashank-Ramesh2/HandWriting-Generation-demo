import React, { useEffect, useRef } from 'react';

const HandwritingOutput = ({ coordinates, imageDataUrl }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    handleClear();
    if (coordinates.length > 1) {
      console.log('Inside Coordinates of HWO')
      // Set up canvas styles
      context.strokeStyle = 'black';
      context.lineWidth = 10;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      // Draw lines between each set of coordinates
      for (let i = 1; i < coordinates.length; i++) {
        context.beginPath();
        if (i === 1) {
          context.moveTo(coordinates[i - 1].x, coordinates[i - 1].y);
        }
        else {
          const previousCoordinate = coordinates[i - 1];
          const distance = Math.sqrt(
            Math.pow(previousCoordinate.x - coordinates[i].x, 2) + Math.pow(previousCoordinate.y - coordinates[i].y, 2)
          );
          console.log("Distance " + distance)
          if (distance > 35) {
            // Start a new path if the distance between the coordinates is greater than 10 pixels
            context.moveTo(coordinates.x, coordinates.y);
            context.beginPath();
            console.log("inside greater than 10")
          } else {
            context.moveTo(coordinates[i - 1].x, coordinates[i - 1].y);
            context.lineTo(coordinates[i].x, coordinates[i].y);
            context.stroke();
          }
        }

      }
    } else if (imageDataUrl) {
      console.log('Inside Images of HWO')
      // Render the canvas with image data
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
      image.src = imageDataUrl;

    }
  }, [coordinates, imageDataUrl]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={100} height={100} style={{ marginRight: '10px', marginTop: '10px' }} />
      <button onClick={handleClear}>Reset</button>
    </div>
  );
};

export default HandwritingOutput;


