from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gpt3 import get_random_word, get_dialogue, get_reply, correct_grammar
from utils import split_random_word, split_dialogue, make_chat, diff_finder, hsetex
from pydantic import BaseModel
import logging
import redis
import json
import random
import requests
import os

app = FastAPI()

origins = [
    "http://ec2-52-201-217-155.compute-1.amazonaws.com",
    "http://52.201.217.155",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
REDIS_HOST = os.getenv("REDIS_HOST")

db = redis.Redis(host=REDIS_HOST, port=6379, charset="utf-8", decode_responses=True)

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
    if db.hexists(chat.user_id, "grammar"):
        grammar += int(db.hget(chat.user_id, "grammar"))
    else: grammar = 1
    hsetex(db, chat.user_id, "grammar", grammar, 1800)
    reply = correct_grammar(chat.text)
    diff, mistakes = diff_finder(chat.text, reply)
    if mistakes: mistakes = 1 # 1 request 1 error
    if db.hexists(chat.user_id, "mistakes"):
        mistakes += int(db.hget(chat.user_id, "mistakes"))
    hsetex(db, chat.user_id, "mistakes", mistakes, 1800)
    

    score = 1 - mistakes / grammar
    if score < 0.3: level = 1
    elif score > 0.3 and score < 0.8: level = 2
    else: level = 3
    hsetex(db, chat.user_id, "level", level, 1800)
    return diff


@app.get("/auth")
def assembly_auth():
    url = "https://api.assemblyai.com/v2/realtime/token"
    response = requests.post(url, json={"expires_in": 3600}, \
                    headers={"accept": "application/json", "Authorization":ASSEMBLYAI_API_KEY})
    return json.loads(response.text)
     
