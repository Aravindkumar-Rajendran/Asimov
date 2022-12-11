import "./random_vocabulary.scss";
import AudioRecorder from "../../components/audioRecorder";
import ChatView from "../../components/chatView";
const RandomVocabulary = () => {
    return (
      <div className="random-vocabulary-wrapper">
         <div className="cv-wrapper">
         <ChatView/>
         </div>
         <div className="ar-wrapper">
         <AudioRecorder/>
         </div>
         
      </div>
    )
}
export default RandomVocabulary;