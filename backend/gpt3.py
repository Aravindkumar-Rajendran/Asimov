import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")


def get_random_word():
    ## prompt gpt3 and create a dictionary word
    text_blob = openai.Completion.create(
        model="text-davinci-003",
        prompt="Like a dictionary, give meaning of a random word with its meaning and examples",
        temperature=1,
        max_tokens=512,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )

    return text_blob.choices[0].text


def get_dialogue():
    dialogue_blob = openai.Completion.create(
        model="text-davinci-003",
        prompt="Create a lengthy dialogue about some random topic in basic English",
        temperature=0.7,
        max_tokens=512,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    return dialogue_blob.choices[0].text


def get_reply(chat):
    reply =  openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Reply the text like a human:\n{chat}",
        temperature=0.5,
        max_tokens=128,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    return reply.choices[0].text


def correct_grammar(text):
    corrected = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Correct the grammar mistakes in this text:\n\n{text}\n\nCorrected:",
        temperature=0.7,
        max_tokens=128,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )

    return corrected.choices[0].text