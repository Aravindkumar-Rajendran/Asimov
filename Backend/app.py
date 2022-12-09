from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from gpt3 import get_random_word, get_dialogue, get_reply
from utils import split_random_word, split_dialogue
import logging

app = FastAPI()


@app.get("/random-word")
def random_dictionary_word():
    ## get random word with meaning and examples from GPT3 
    dictionary = split_random_word(get_random_word())
    return dictionary


@app.get("/dialogue")
def send_dialogue():
    ## send random dialogue created by GPT3
    dialogue = split_dialogue(get_dialogue())
    return dialogue


@app.post("/conversation")
def conversations(chat: str):
    ## chatbot conversations with GPT3
    reply = get_reply(chat)
    return reply