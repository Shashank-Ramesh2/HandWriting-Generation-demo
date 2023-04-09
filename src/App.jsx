import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react';
import HandwritingInput from '../src/components/handWritingInput';
import HandwritingOutput from '../src/components/handWritingOutput';

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [imageDataUrl,setImageDataUrl] = useState(null);
  const handleSendCoordinates = (renderType, inputCoordinates,imageDataUrl) => {
    if(renderType==='coordinates'){
      setCoordinates(inputCoordinates);
      setImageDataUrl(null);
      
    }else if(renderType==='image'){
      console.log('Rendering Image '+imageDataUrl)
      setImageDataUrl(imageDataUrl);
      setCoordinates([]);
    }
    
  };
  return (
    <div>
      <h1>Handwriting Input</h1>
      <HandwritingInput onSend={handleSendCoordinates}/>
      <div>
      
      <HandwritingOutput coordinates={coordinates} imageDataUrl={imageDataUrl} />
      </div>
    </div>
  );
};

export default App;

