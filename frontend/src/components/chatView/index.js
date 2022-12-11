import { useState, useRef, useEffect } from "react"
import "./chatView.scss"
// import Shake from "reshake/dist/ShakeCrazy"
import { ShakeCrazy as Shake } from "reshake"
const ChatView = () => {
    const chat_data_initial = [
        {
            type: 1,
            text: "Hi, How are you",
            original: "Hi, How are you"
        },
        {
            type: 2,
            text: "Hi, How are you",
            original: "Hi, How are you"
        },
        {
            type: 2,
            text: "I'm doing well, thank you, How are you __________?",
            original: "I'm doing well, thank you, How are you __________?",
            state: 'correct'// correct, wrong
        },
        {
            type: 1,
            text: "Hi, How are you",
            original: "Hi, How are you"
        },
        {
            type: 2,
            text: "Hi, How are you",
            original: "Hi, How are you"
        },
        {
            type: 2,
            text: "I'm doing well, thank you, How are you __________? hank you, How are you __________",
            original: "I'm doing well, thank you, How are you __________? hank you, How are you __________",
            state: 'correct'// correct, wrong
        }
    ]
    const [chat_data, setChat_data] = useState(chat_data_initial);
    const [inputTxt, setInputTxt] = useState("");
    const [refresh, setRefresh] = useState(true)
    const [remove,setRemove] = useState(false)
    const replaceBlank = () => {
        console.log(inputTxt, chat_data)
        let dta = chat_data;
        let text_to_change = dta[dta.length - 1].original;
        let changed = text_to_change.replace(/__________/g, '<span class="usinput"> '+ inputTxt+' </span>');
        updateLastElem('correct', changed)


    }
    const updateLastElem = async(state = 'correct', text, remove = false) => {
        let dta = chat_data;

        dta[dta.length - 1] = {
            ...dta[dta.length - 1],
            original: dta[dta.length - 1].original,
            text: text ? text : dta[dta.length - 1].text,
            state: state ? state : dta[dta.length - 1].state
        }
        setChat_data(dta)
        setRefresh(!refresh);
        
        if (remove) {
            setRemove(true)
        }
    }
    const scroll = () => {
        // 👇️ scroll to bottom every time messages change
        console.log('scrolling')
        bottomRef.current?.scrollIntoView();
    }
    const bottomRef = useRef(null);
    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scroll()
    }, [refresh]);
    useEffect(() => {
        const timer = window.setTimeout(() => {
            if(remove == true){
                let dta = chat_data;
                dta.pop();
                setChat_data(dta);
                setRemove(false)
            }
           
        }, 1000);
        return () => {
          window.clearTimeout(timer);
        };
      }, [remove,chat_data]);
      const insertElement  =() => {
        let randomIndex = Math.round(Math.random() * (chat_data_initial.length - 1))
        setChat_data([...chat_data,chat_data_initial[randomIndex]]);setRefresh(!refresh)
      }
    return (
        <>
            <div className="chat-view-wrapper" id="random_chat_parent" key={refresh} >
                {chat_data.map((x, index) => {
                    return <Box key={index} data={x} id={"random_chat_" + index} />
                })}
                <div ref={bottomRef} />
            </div>
            <div className="controls">
            <input placeholder="replace blank" value={inputTxt} onChange={(e) => {  setInputTxt(e.target.value) }} />
            <div onClick={()=>replaceBlank()}> Replace text</div>
            <div onClick={()=>updateLastElem('wrong',undefined,true)}>Make Last component wrong and remove</div>
            <div onClick={insertElement}>insert</div>
            </div>
            
        </>

    )
}
const Box = ({ data, id }) => {
    const getStyle = (type, state) => {
        let styleObj = {};
        styleObj.alignSelf = (type === 1) ? 'start' : 'end';
        if (type == 1) {
            styleObj.background = 'linear-gradient(267.51deg, #FF9900 5.24%, rgba(255, 0, 0, 0.8) 123.88%)'
        } else {
            styleObj.background = 'linear-gradient(246.39deg, #00FFF0 1.35%, #02FA92 102.51%)'
        }
        if(state == 'wrong'){
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
    return (

        <div className="chat-box-units" style={getStyle(data.type, data.state)} id={id}>
            <div className="chat-box-circle" style={ciclePosition(data.type)}>

            </div>
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
                active={data.state == 'wrong'}>
                <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
            </Shake>
        </div>
    )
}
export default ChatView