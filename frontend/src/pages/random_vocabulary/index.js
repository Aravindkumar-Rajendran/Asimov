import "./random_vocabulary.scss";
import AudioRecorder from "../../components/audioRecorder";
const RandomVocabulary = () => {
    return (
      <div className="random-vocabulary-wrapper">
         Random Vocabulary
         <div className="ar-wrapper">
         <AudioRecorder/>
         </div>
      </div>
    )
}
export default RandomVocabulary;