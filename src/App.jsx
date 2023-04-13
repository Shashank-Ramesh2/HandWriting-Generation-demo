import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import HandwritingInput from '../src/components/handWritingInput';
import HandwritingOutput from '../src/components/handWritingOutput';
import GetHandwriting from './components/getHandWriting';

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [currentAPI, setCurrentAPI] = useState("");
  const handleSendCoordinates = (renderType, inputCoordinates, imageDataUrl) => {
    if (renderType === 'coordinates') {
      setCoordinates(inputCoordinates);
      setImageDataUrl(null);

    } else if (renderType === 'image') {
      console.log('Rendering Image ' + imageDataUrl)
      setImageDataUrl(imageDataUrl);
      setCoordinates([]);
    }

  };
  const handleToggle = () => {
    setCurrentAPI(currentAPI === 'saveAndGetImage' ? 'getHandwriting' : 'saveAndGetImage');
  };
  const handleSaveAndGetImage = () => {
    console.log('Inside save and get ', currentAPI)
    setCurrentAPI("saveAndGetImage");
  };

  const handleGetHandwriting = () => {
    console.log('Inside get handwriting ', currentAPI)
    setCurrentAPI("getHandwriting");
  };

  let renderVae = <div>
    <h1>Handwriting Input</h1>
    <HandwritingInput onSend={handleSendCoordinates} />
    <div>
      <HandwritingOutput coordinates={coordinates} imageDataUrl={imageDataUrl} />
    </div>
  </div>;
  // const renderVae = () =>{
  //   console.log('Inside render VAE ',currentAPI)
  //   return <div>
  //     <h1>Handwriting Input</h1>
  //     <HandwritingInput onSend={handleSendCoordinates} />
  //     <div>
  //       <HandwritingOutput coordinates={coordinates} imageDataUrl={imageDataUrl} />
  //     </div>
  //   </div>
  // }
  const renderHWG = () => {
    console.log('Inside render HWG ', currentAPI)
    return <div>
      <GetHandwriting></GetHandwriting>
    </div>
  }

  return (
    <div>
      <h1>Handwriting Generation App</h1>
      <div>
        <button style={{ marginRight: '10px' }} onClick={handleSaveAndGetImage}>VAE</button>
        <button onClick={handleGetHandwriting}>GMM</button>
      </div>
      {currentAPI === "saveAndGetImage" ? renderVae : <GetHandwriting></GetHandwriting>}
    </div>
  );
};

export default App;

