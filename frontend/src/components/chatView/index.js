import { useState, useRef, useEffect } from "react"
import "./chatView.scss";
import { ShakeCrazy as Shake } from "reshake";
import chat_data_initial from "./data"
import { useParams } from "react-router-dom";
import asimoService from "../../services/asimo.service";
const API = new asimoService();
const ChatView = () => {

    const [chat_data, setChat_data] = useState([]);
    const [Mode,setMode] = useState('')
    const [inputTxt, setInputTxt] = useState(""); //user input field/ this will be replaced by sppech to text
    const [refresh, setRefresh] = useState(true); //used to reload the dom
    const [remove, setRemove] = useState(false); //used to remove last element from dom
    const [flash, setFlash] = useState(""); //to flash statuses such as correct / wrong and to perform remove operation
    const bottomRef = useRef(null);
    const params = useParams();

    const scroll = () => {
        // 👇️ scroll to bottom every time messages change
        console.log('scrolling')
        bottomRef.current?.scrollIntoView();
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scroll()
    }, [refresh]);
    useEffect(() => {
        const timer = window.setTimeout(() => {
            let dta = chat_data;
            if (remove == true) {

                dta.pop();
                setChat_data(dta);
                setRemove(false);

            }
            if (['loading', 'success', 'failure'].includes(flash)) {
                console.log({ flash })
                if (flash !== 'loading')//loading flashes will be infinite
                    dta[dta.length - 1].flash = '';
                setChat_data(dta);
                if (flash !== 'loading')//loading flashes will be infinite
                    setFlash("")
            }
            //resetting all the status
            if (refresh != '123') {
                if(dta[dta.length -1])
                dta[dta.length - 1].state = 'correct';
                setChat_data(dta);
                setRefresh('123')
            }


        }, 1000);
        return () => {
            window.clearTimeout(timer);
        };
    }, [remove, chat_data, flash, refresh]);
    const replaceBlank = (clear = false) => {
        let dta = chat_data;
        if (clear) {
            let text_to_change = dta[dta.length - 1].original;
            updateLastElem('correct', text_to_change)
            setInputTxt("")
        } else {
            let text_to_change = dta[dta.length - 1].original;
            let changed = text_to_change.replace(/__________/g, '<span class="usinput"> ' + inputTxt + ' </span>');
            updateLastElem('correct', changed)
            setInputTxt("")
        }

    }
    const updateLastElem = async (state, text, remove = false, flash) => {
        let dta = chat_data;
        dta[dta.length - 1] = {
            ...dta[dta.length - 1],
            original: dta[dta.length - 1].original,
            text: text ? text : dta[dta.length - 1].text,
            state: state ? state : dta[dta.length - 1].state,
            flash: flash != undefined ? flash : dta[dta.length - 1].flash
        }
        setChat_data(dta)

        if (flash != undefined) {
            setFlash(flash);
        }
        setRemove(remove)
        setRefresh(!refresh);
    }
    const insertElement = () => {
        let randomIndex = Math.round(Math.random() * (chat_data_initial.length - 1))
        setChat_data([...chat_data, chat_data_initial[randomIndex]]); setRefresh(!refresh)
    }
    const insertEntry = (type = 2) => {
        let newElement = {
            type,
            original: inputTxt,
            text: inputTxt,
            state: 'correct',
            flash: ''
        }
        setChat_data([...chat_data, newElement]);
        setInputTxt("");
        setRefresh(!refresh)
    }
    //start of logics++++++++++++++++++++++++++++
    //start of random word methods and api logics
    useEffect(()=>{
       setMode(params.id);
       setChat_data([]);
       if(params.id == 'random_vocabulary'){
        triggerRandomVocabularyInit(true);
       }
    },[]);
    const triggerRandomVocabularyInit = async(clearChat = false) => {
        try{
             if(clearChat){
                console.log('clearing chat')
                setChat_data([{text:'',flash:'loading',type:1,original:''}])
             }else{

                setChat_data([...chat_data,{text:'',flash:'loading',type:1,original:''}]);
             }
             console.log('calling the api')
             let rand_data = await API.getRandomWord();
             let cd = chat_data;
             cd.pop();
            cd.push({
                text:'<span class="usinput">WORD </span><BR/>'+rand_data.data.word,
                status:'correct',
                flash:'',
                type:1
            });
            cd.push({
                text:`<span class="usinput">MEANING OF </i>${rand_data.data.word}</i> </span><BR/>`+ rand_data.data.meaning,
                status:'correct',
                flash:'',
                type:1
            })
             setChat_data(cd);
             setRefresh(!refresh)
        }catch(err){
            console.log('failed in trigger random vocabulary ', err)
        }
    }
    //end of random word methods and api logics______________________
    return (
        <>
            <div className="chat-view-wrapper" id="random_chat_parent" key={refresh} >
                {chat_data.map((x, index) => {
                    return <Box key={index + refresh} data={x} id={"random_chat_" + index} />
                })}
                <div ref={bottomRef} />
                <button className="random_word_btn" onClick={()=>triggerRandomVocabularyInit(false)}>GIVE ME NEXT WORD</button>
                <button className="random_word_btn" onClick={()=>{triggerRandomVocabularyInit(true)}}>CLEAR CHAT</button>
            </div>
            <div className="controls">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input placeholder="replace blank / answer" value={inputTxt} onChange={(e) => { setInputTxt(e.target.value) }} />
                    <div onClick={() => replaceBlank()}> Replace text</div>
                    <div onClick={() => replaceBlank(true)}> Reset text</div>
                    <div onClick={() => insertEntry()}>ANSWER</div>
                    <div onClick={() => insertEntry(1)}>INSERT QUESTION</div>
                </div>

                <div onClick={() => updateLastElem('wrong', undefined, true)}>Make Last component wrong and remove</div>
                <div onClick={() => updateLastElem('wrong', undefined)}>Make Last component wrong and dont remove</div>
                <div onClick={insertElement}>insert Random Element</div>
                <div onClick={() => updateLastElem(undefined, undefined, undefined, 'loading')}>SET lOADING</div>
                <div onClick={() => updateLastElem(undefined, undefined, false, 'success')}>SET SUCCESS</div>
                <div onClick={() => updateLastElem(undefined, undefined, undefined, 'failure')}>SET FAILURE </div>
                <div onClick={() => updateLastElem(undefined, undefined, undefined, '')}>RESSET loading</div>
                <div onClick={() => setRefresh(!refresh)}>SCROLL TO LAST</div>
            </div>

        </>

    )
}
const Box = ({ data, id, refresh }) => {
    const getStyle = (type, state) => {
        let styleObj = {};
        styleObj.alignSelf = (type === 1) ? 'start' : 'end';
        if (type == 1) {
            styleObj.background = 'linear-gradient(267.51deg, #FF9900 5.24%, rgba(255, 0, 0, 0.8) 123.88%)'
        } else {
            styleObj.background = 'linear-gradient(246.39deg, #00FFF0 1.35%, #02FA92 102.51%)'
        }
        if (state == 'wrong') {
            styleObj.background = 'red'
        }
        return styleObj
    }
    const ciclePosition = (type) => {
        let styleObj = {};
        if (type == 1) {
            styleObj.left = -25;
            styleObj.background = '#FA0202'
        } else {
            styleObj.right = -25;
            styleObj.background = '#02FA92'
        }
        return styleObj;
    }
    const FetchFlashMessage = () => {
        let img_src = "";
        let randomNumber = Math.round(Math.random() * 5)
        if (data.flash == 'success') {
            img_src = 'success_' + 4 + ".gif"
        } else if (data.flash == 'failure') {
            img_src = 'failure_' + 3 + ".gif"
        } else if (data.flash == 'loading') {
            img_src = 'loading_' + 0 + ".gif"
        }
        return <img className="flash_img" src={img_src}></img>
    }
    return (

        <div className="chat-box-units" style={getStyle(data.type, data.state)} id={id} key={refresh}>
            <div className="chat-box-circle" style={ciclePosition(data.type)}>

            </div>
            {
                ['loading', 'success', 'failure'].includes(data.flash) &&
                <div className="flashMessage" style={getStyle(data.type, data.state)}>
                    <FetchFlashMessage />
                </div>
            }

            <Shake
                h={5}
                v={5}
                r={3}
                dur={3}
                int={10}
                max={100}
                fixed={true}
                fixedStop={false}
                freez={false}
                active={data.state === 'wrong'}>
                <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
            </Shake>

        </div>
    )
}
export default ChatView