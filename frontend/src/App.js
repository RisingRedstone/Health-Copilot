import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    browserSupportsContinuousListening
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  let startListener = () => {
    if(browserSupportsContinuousListening){
      SpeechRecognition.startListening({continuous: true});
    }else{
      SpeechRecognition.startListening();
    }
  }

  return (
    <div className = "MicListener">
      {isMicrophoneAvailable &&
      <div>
          {browserSupportsContinuousListening && 
            <p>Continuous Listening Supported</p>}
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={startListener}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
      </div>
      }
      {!isMicrophoneAvailable && 
      <div>
        <h1>
          Allow Microphone to continue
        </h1>
      </div>
      }
    </div>
  );
};

function App() {
  const [butt, setButt] = useState("On");
  const [buttW, setButtW] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <Dictaphone />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Button is {butt}</h1>
        
        {butt == "On" &&
        <button onClick={() => {
          if(butt == "On"){
            setButt("Off");
          }else{
            setButt("On");
          }
        }}><h3>{butt}</h3> </button>
      }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
