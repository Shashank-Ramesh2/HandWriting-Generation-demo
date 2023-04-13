import React, { useState } from 'react';

function GetHandwriting() {

    const [text, setText] = useState('Sample Text');
    const [results, setResults] = useState([]);

    const handleGetHandwriting = () => {
        const reqText = encodeURIComponent(text);
        fetch(`http://localhost:8080/get_handwriting?text=${reqText}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                setResults(data);
            })
            .catch(error => console.log(error));
    };

    const renderHW = (result, index) => {
        if (index == 0) {
            return <div>
                <div style={{ border: '1px solid black' }} key={index}>
                    <div style={{ marginLeft: '15px' }}>
                        Attention Plot
                    </div>
                    <img src={result.dataImageUrl[1]} alt={`Handwriting ${result.bias}`} />


                </div><div style={{ border: '1px solid black' }} key={index}>
                    <div style={{ marginLeft: '15px' }}>
                        {`Handwritten text with Bias ${result.bias}`}
                    </div>
                    <img src={result.dataImageUrl[0]} alt={`Handwriting ${result.bias}`} />

                </div>
            </div>
        }
        else {
            return <div style={{ border: '1px solid black' }} key={index}>
                <div style={{ marginLeft: '15px' }}>
                    {`Handwritten text with Bias ${result.bias}`}
                </div>
                <img src={result.dataImageUrl[0]} alt={`Handwriting ${result.bias}`} />

            </div>
        }
    }
    return (
        <div>
            <h2 style={{ marginTop: '25px' }}>Get Handwriting by GMM </h2>
            Text:
            <input style={{ marginLeft: '15px' }} type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button style={{ marginLeft: '15px' }} onClick={handleGetHandwriting}>Get Handwriting</button>
            {results.map((result, index) => (
                renderHW(result, index)
            ))}
        </div>
    );
}

export default GetHandwriting;
