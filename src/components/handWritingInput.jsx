import React, { useRef, useState } from 'react';
//import axios from 'axios';

const HandwritingInput = ({ onSend }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [text, setText] = useState('');

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
    setCoordinates([...coordinates, { x: lastX, y: lastY }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    setLastX(e.clientX);
    setLastY(e.clientY);
    setCoordinates([...coordinates, { x: lastX, y: lastY }]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCoordinates([]);
  };

  const handleSendCoordinates = () => {
    const data = { coordinates, text };
    console.log("data to send " + JSON.stringify(data))
    fetch('http://localhost:8080/save_coordinates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log(response.json())
      }
      )
      .then(data => console.log(data))
      .catch(error => console.error(error));
    // clear the canvas and input text after submit

  };

  const handleSendImage = () => {
    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL('image/png');
    const data = { imageDataUrl, text };
    console.log("data to send " + JSON.stringify(data))
    fetch('http://localhost:8080/save_image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log(response.json())
      }
      )
      .then(data => console.log(data))
      .catch(error => console.error(error));
    // clear the canvas and input text after submit

  };

  const renderCoordinates = () => {
    fetch('http://localhost:8080/get_coordinates', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        onSend('coordinates', data.coordinates, dataURL);
      }
      )
      .catch(error => console.log(error));
    console.log({ text, coordinates });
  };

  const renderImage = () => {
    fetch('http://localhost:8080/get_image', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        const canvas = canvasRef.current;
        const imageDataUrl = canvas.toDataURL('image/png');
        onSend('image', coordinates, data.imageDataUrl);
        console.log('Response from image BE'+ data.imageDataUrl );
      }
      )
      .catch(error => console.log(error));
    
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={250}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleClear}>Reset</button>
      <div>
        <label htmlFor="text-input">Text Input:</label>
        <br></br>
        <input style={{ marginRight: '10px' }} type="text" id="text-input" value={text} onChange={handleTextChange} />
        <button style={{ marginRight: '10px' }} onClick={handleSendCoordinates}>Send as Coordinates</button>
        <button onClick={handleSendImage}>Send as Image</button>
        <div>
          <h1>Rendering the Coordinates</h1>
          <button style={{ marginRight: '10px' }} onClick={renderCoordinates}>Render Coordinates</button>
          <button onClick={renderImage}>Render Image</button>
        </div>
      </div>
    </div>
  );
};

export default HandwritingInput;
