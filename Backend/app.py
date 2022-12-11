from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from gpt3 import get_random_word, get_dialogue, get_reply, correct_grammar
from utils import split_random_word, split_dialogue, diff_finder
from pydantic import BaseModel
import logging

app = FastAPI()


app = FastAPI()


class Chat(BaseModel):
    text: str 


@app.get("/random-word")
def random_dictionary_word():
    ## get random word with meaning and examples from GPT3 
    dictionary = split_random_word(get_random_word())
    return dictionary


@app.get("/dialogue")
def send_dialogue():
    ## send random dialogue created by GPT3
    dialogue = split_dialogue(get_dialogue())
    # find the phrases and blank out TO:DO
    return dialogue


@app.post("/conversation")
def conversations(chat: Chat):
    ## chatbot conversations with GPT3
    reply = get_reply(chat.text)
    return reply


@app.post("/grammar")
def grammar_corrections(chat: Chat):
    ## chatbot conversations with GPT3
    reply = correct_grammar(chat.text)
    diff = diff_finder(chat.text, reply)
    return diff