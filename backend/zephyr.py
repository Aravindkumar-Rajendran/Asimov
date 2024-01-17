# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="HuggingFaceH4/zephyr-7b-beta")


def get_random_word(level):
    ## prompt gpt3 and create a dictionary word
    # text_blob = openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt=f"Like a dictionary, give meaning of a {level} level random word with its meaning and examples",
    #     temperature=1,
    #     max_tokens=512,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0
    #     )
    # return text_blob.choices[0].text

    prompt=f"Like a dictionary, give meaning of a {level} level random word with its meaning and examples"
    messages = [
        {
            "role": "system",
            "content": "You are a friendly English Teacher",
        },
        {"role": "user", "content": prompt},
    ]
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    return outputs[0]["generated_text"]



def get_dialogue(level):
    # dialogue_blob = openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt=f"Create a lengthy dialogue about some random topic in {level} level English",
    #     temperature=0.7,
    #     max_tokens=512,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0
    #     )
    # return dialogue_blob.choices[0].text

    prompt=f"Create a lengthy dialogue about some random topic in {level} level English",
    messages = [
        {
            "role": "system",
            "content": "You are a friendly English Teacher",
        },
        {"role": "user", "content": prompt},
    ]
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    return outputs[0]["generated_text"]


def get_reply(chat):
    # reply =  openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt=f"Reply to the text like a human:\n\n{chat}\nYou:",
    #     temperature=0.5,
    #     max_tokens=128,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0
    #     )
    # return reply.choices[0].text

    prompt=f"Reply to the text like a human:\n\n{chat}\nYou:"
    messages = [
        {
            "role": "system",
            "content": "You are a friendly English Teacher",
        },
        {"role": "user", "content": prompt},
    ]
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    return outputs[0]["generated_text"]
    


def correct_grammar(text):
    # corrected = openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt=f"Correct the grammar mistakes in this text:\n\n{text}\n\nCorrected:",
    #     temperature=0.7,
    #     max_tokens=128,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0
    #     )

    # return corrected.choices[0].text

    prompt=f"Correct the grammar mistakes in this text:\n\n{text}\n\nCorrected:"
    messages = [
        {
            "role": "system",
            "content": "You are a friendly English Teacher",
        },
        {"role": "user", "content": prompt},
    ]
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    return outputs[0]["generated_text"]