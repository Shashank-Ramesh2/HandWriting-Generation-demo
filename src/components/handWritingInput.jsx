import React, { useRef, useState } from 'react';
//import axios from 'axios';

const HandwritingInput = ({ onSend }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [text, setText] = useState('');

  const canvasOffSetX = useRef(null);
  const canvasOffSetY = useRef(null);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const canvasOffSet = canvas.getBoundingClientRect();
    canvasOffSetY.current = Math.round(canvasOffSet.top) + 4;
    canvasOffSetX.current = Math.round(canvasOffSet.left) + 4;
    console.log('Offset X in handlw mouse down', canvasOffSetX.current)
    console.log('Offset Y in handlw mouse down', canvasOffSetY.current)
    console.log('Event coordinates (' + e.clientX + ',' + e.clientY + ')')
    let relativeX = e.clientX - canvasOffSetX.current;
    let relativeY = e.clientY - canvasOffSetY.current;
    console.log('Relative coordinates (' + relativeX + ',' + relativeY + ')')
    setIsDrawing(true);
    setLastX(relativeX);
    setLastY(relativeY);
    setCoordinates([...coordinates, { x: lastX, y: lastY }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // const canvasOffSet = canvas.getBoundingClientRect();
    // canvasOffSetY.current = canvasOffSet.top;
    // canvasOffSetX.current = canvasOffSet.left;
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.beginPath();
    /* ***Series of cosole logs ******/
    console.log('Last coordinate (' + lastX + ',' + lastY + ')');
    console.log('Event coordinates (' + e.clientX + ',' + e.clientY + ')')
    console.log('Offset X in handlw mouse move', canvasOffSetX.current)
    console.log('Offset Y in handlw mouse move', canvasOffSetY.current)
    /* ***Series of cosole logs ends *****/
    context.moveTo(lastX, lastY);
    let relativeX = e.clientX - canvasOffSetX.current;
    let relativeY = e.clientY - canvasOffSetY.current;
    context.lineTo(relativeX, relativeY);
    context.stroke();
    //context.lineTo(e.clientX , e.clientY );
    // console.log('e.Y '+e.clientY +' offset Y '+canvasOffSetY.current +'transformed crd ('+e.clientX - canvasOffSetX.current+','+e.clientY - canvasOffSetX.current+')')
    //console.log('transformed crd ('+e.clientX - canvasOffSetX.current+','+e.clientY - canvasOffSetX.current+')')

    setLastX(relativeX);
    setLastY(relativeY);
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
        console.log('Response from image BE' + data.imageDataUrl);
      }
      )
      .catch(error => console.log(error));

  };

  return (
    <div>
      {/* <button style={{ marginRight: '100px' }}></button> */}
      <canvas
        ref={canvasRef}
        width={100}
        height={100}

        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleClear}>Reset</button>
      <div >
        <label htmlFor="text-input">Text Input:</label>
        <br></br>
        <input style={{ marginRight: '10px' }} type="text" id="text-input" value={text} onChange={handleTextChange} />
        {/* <button style={{ marginRight: '10px' }} onClick={handleSendCoordinates}>Send as Coordinates</button> */}
        <button onClick={handleSendImage}>Send as Image</button>
        <div>
          <h1>Rendering VAE Output</h1>
          {/* <button style={{ marginRight: '10px' }} onClick={renderCoordinates}>Render Coordinates</button> */}
          <button onClick={renderImage}>Render Image</button>
        </div>
      </div>
    </div>
  );
};

export default HandwritingInput;
