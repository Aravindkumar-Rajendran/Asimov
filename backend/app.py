from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from gpt3 import get_random_word, get_dialogue, get_reply, correct_grammar
from utils import split_random_word, split_dialogue, make_chat, diff_finder, hsetex
from pydantic import BaseModel
import logging
import redis
import json
import random


app = FastAPI()


db = redis.Redis(host="0.0.0.0", port=6379)

starters = ["Hello", "Hi, there", "Hello world!", "Hey"] 

class Chat(BaseModel):
    user_id: str
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
    return dialogue


@app.post("/conversation")
def conversations(chat: Chat):
    ## chatbot conversations with GPT3
    if db.hexists(chat.user_id, "chat_bot"):
        user_chat = db.hget(chat.user_id, "chat_user")
        if user_chat: user_chat = json.loads(user_chat)
        else: user_chat = []
        user_chat.append(chat.text)
        hsetex(db, chat.user_id, "chat_user", json.dumps(user_chat), 1800)

        bot_chat = db.hget(chat.user_id, "chat_bot")
        if bot_chat: bot_chat = json.loads(bot_chat)
        else: bot_chat = []
        reply = get_reply(make_chat(user_chat, bot_chat))
        bot_chat.append(reply)
        hsetex(db, chat.user_id, "chat_bot", json.dumps(bot_chat), 1800)
    else:
        reply = random.sample(starters, 1)
        hsetex(db, chat.user_id, "chat_bot", json.dumps(reply), 1800)
    return reply


@app.post("/grammar")
def grammar_corrections(chat: Chat):
    ## chatbot conversations with GPT3
    reply = correct_grammar(chat.text)
    diff, mistakes = diff_finder(chat.text, reply)
    if db.hexists(chat.user_id, "mistakes"):
        mistakes += db.hget(chat.user_id, "mistakes")
    hsetex(db, chat.user_id, "mistakes", mistakes, 1800)
    return diff
