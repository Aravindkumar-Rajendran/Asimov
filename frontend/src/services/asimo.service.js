import a from "./apihelper"
const apihelper = new a();
const base_address = process.env.REACT_APP_SERVER_URL;
console.log("BASE ADDRESS READ FROM ENV", base_address)
class asimoService {
    getRandomWord(){
        const url = base_address + "/random-word";
        console.log('reading the url-',url)
        return apihelper.get(url)
    }
    postGrammarBuilding(text,user_id){
        const url = base_address + "/grammar";
        return apihelper.post(url,{
            user_id,
            text
        })
    }
    getDialogues(){
        const url = base_address + "/dialogue";
        return apihelper.get(url)
    }
    getFreeConversation(text,user_id){
        const url = base_address + "/conversation";
        return apihelper.post(url,{
            user_id,
            text
        })
    }
}
export default asimoService;