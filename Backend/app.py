from fastapi import FastAPI
from gpt3 import get_random_word
from utils import split_random_word


app = FastAPI()



@app.get("/random-word")
def random_dictionary_word():
    ## get random word with meaning and examples from GPT3 
    dictionary = split_random_word(get_random_word)
    return dictionary


@app.get("/dialogues")
def list_dialogues():
    ## send list of dialogues 
    dialogues = ''
    return dialogues

@app.get("/dialogue/{id}")
def send_dialogue(dialogue_id: id):
    ## send dialogue based on the dialogue id 
    dialogue = ''
    return dialogue