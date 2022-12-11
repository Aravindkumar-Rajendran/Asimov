import "./audioRecorder.scss";
import { useState } from "react";
import Wave from 'react-wavify'

const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const getRecordingBtnStyle = () => {
        let styleObj = {};
        if (recording) {
            styleObj.height = '1px';
            styleObj.width = '100%';
            styleObj.background = 'black';
            styleObj.border = 'none';
            styleObj.top='3rem';
        }
        return styleObj;
    }
    const triggerRecord = () => {
        setRecording(true);
        setTimeout(() => { setRecording(false); }, 3000)
    }
    return (
        <div className="audio-recorder-wrapper">
            {recording && 
                <div className="wave">
                <Wave
                fill='#76fede'
                    paused={false}
                    options={{
                        height: 10,
                        amplitude: 20,
                        speed: 1,
                        points: 5,
                        active:false
                    }}
                >
                    
                </Wave>
            </div>}

            <div className="recorder-btn" style={getRecordingBtnStyle()} onClick={triggerRecord}>

            </div>
            {/* <input />
            <button>submit</button> */}


        </div>
    )
}
export default AudioRecorder;