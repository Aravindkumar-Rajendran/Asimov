import "./audioRecorder.scss";
import Wave from "react-wavify";
import { useState } from "react";
const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const getRecordingBtnStyle = () => {
        let styleObj = {};
        if (recording) {
            styleObj.height = '4rem';
            styleObj.width = '4rem';
            styleObj.background = 'violet';
            styleObj.border = '1px solid red'
        }
        return styleObj;
    }
    const triggerRecord = () => {
        setRecording(true);
        setTimeout(()=>setRecording(false),3000)
    }
    return (
        <div className="audio-recorder-wrapper">
            <div className="recorder-btn" style={getRecordingBtnStyle()} onClick={triggerRecord}>

            </div>
            {
                recording && <div className="background-wave">
                    <Wave fill='violet'
                        paused={false}
                        options={{
                            height: 70,
                            amplitude: 45,
                            speed: 1,
                            points: 4
                        }}
                    />
                </div>
            }


        </div>
    )
}
export default AudioRecorder;