import "./audioRecorder.scss";
import { useState } from "react";

const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const getRecordingBtnStyle = () => {
        let styleObj = {};
        if (recording) {
            styleObj.height = '1px';
            styleObj.width = '100%';
            styleObj.background = 'red';
            styleObj.border = 'none';
        }
        return styleObj;
    }
    const triggerRecord = () => {
        setRecording(true);
        setTimeout(()=>{setRecording(false);},3000)
    }
    return (
        <div className="audio-recorder-wrapper">
            <div className="recorder-btn" style={getRecordingBtnStyle()} onClick={triggerRecord}>
             
            </div>
            <input/>
            <button>submit</button>


        </div>
    )
}
export default AudioRecorder;