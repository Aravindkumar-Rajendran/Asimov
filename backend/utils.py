import re
import string
import spacy   
from spacy.matcher import Matcher
from spacy.util import filter_spans
from compare import equalize, insert_newlines

nlp = spacy.load('en_core_web_sm') 

pattern = [{'POS': 'VERB', 'OP': '?'},
        {'POS': 'ADV', 'OP': '*'},
        {'POS': 'AUX', 'OP': '*'},
        {'POS': 'VERB', 'OP': '+'}]

# instantiate a Matcher instance
matcher = Matcher(nlp.vocab)
matcher.add("Verb phrase", [pattern])


def split_random_word(text_blob):
    """
    Word: Abstain
    Meaning: to restrain oneself from doing something; to voluntarily refrain from or avoid something
    Example: I will abstain from eating unhealthy foods.
    """
    if "Examples:" in text_blob: splitter = "Examples:"
    elif "examples:" in text_blob: splitter = "examples:"
    elif "example:" in text_blob: splitter = "example:"
    else: splitter = "Example: "
    text_blob = text_blob.split(splitter)
    example = text_blob[-1].strip()
    examples = [example]
    if "Meaning:" in text_blob[0]: splitter = "Meaning:"
    else: splitter = "Definition:"
    text_blob = text_blob[0].split(splitter)
    meaning = text_blob[-1].strip()
    text_blob = text_blob[0].split("Word:")
    word = text_blob[-1].strip()
    return {"word":word, "meaning": meaning, "examples": examples}



def split_dialogue(dialogue_blob):
    """
    A: Hi, what are you doing?
    B: I'm just thinking about some random topic.
    A: What is it?
    B: I'm thinking about the environment.
    A: What about it?
    """
    app_list = []
    user_list = []
    dialogues = [i for i in dialogue_blob.split("\n") if i]
    for i, text in enumerate(dialogues):
        if i == 0 or i%2 == 0:
            app_list.append(text.split(":")[-1].strip())
        else:
            # phrase finding and hint adding
            sentence = text.split(":")[-1].strip()
            doc = nlp(sentence) 
            # call the matcher to find matches 
            matches = matcher(doc)
            spans = [doc[start:end] for _, start, end in matches]
            spans = filter_spans(spans)
            if len(spans):
                hint = spans[0].text
                dashes = len(hint.split())
                text = [doc[:spans[0].start].text, doc[spans[0].end: ].text]

                user_list.append({"text": text, 
                                "hint": hint, 
                                "dashes": dashes})
            else:
                # last word
                if doc[-1].is_punct: idx = -2
                else: idx = -1

                hint = doc[idx].text
                dashes = len(hint.split())
                text = [doc[:idx].text, ""]

                user_list.append({"text": text, 
                                "hint": hint, 
                                "dashes": dashes})


    return {"app": app_list, "user": user_list}



def diff_finder(in_text, out_text, width=40, margin=10, sidebyside=False, compact=False):
    out_text = out_text.replace("\n\n", "\n").split("\n")[-1].strip()
    in_text = ''.join([i for i in in_text if i not in string.punctuation])
    out_text = ''.join([i for i in out_text if i not in string.punctuation])

    def show_comparison(s1, s2, width=40, margin=10, sidebyside=True, compact=False):
        s1, s2 = equalize(s1,s2)

        if sidebyside:
            s1 = insert_newlines(s1, width, margin)
            s2 = insert_newlines(s2, width, margin)
            lft_list = []
            rgt_list = []
            if compact:
                for i in range(0, len(s1)):
                    lft = re.sub(' +', ' ', s1[i].replace('_', '')).ljust(width)
                    rgt = re.sub(' +', ' ', s2[i].replace('_', '')).ljust(width) 
                    lft_list.append(lft.strip())
                    rgt_list.append(rgt.strip())   
            else:
                for i in range(0, len(s1)):
                    lft = s1[i].ljust(width)
                    rgt = s2[i].ljust(width)
                    lft_list.append(lft.strip())
                    rgt_list.append(rgt.strip())
                
            return (lft_list[0], rgt_list[0])
        else:
            return (s1.strip(), s2.strip())

    comp = show_comparison(in_text.lower(), out_text.lower(), width=width, 
                        margin=margin, sidebyside=sidebyside, compact=compact)

    # [
    # "whats wrong to ____ you",
    # "whats wrong ___ with you"
    # ]


    # ["whats", "wrong", "to", "____", "you"]
    # ["whats", "wrong", "___", "with", "you"]


    # [
    #     {"text":"whats wrong", strike:False}, 
    #     {"text":"to", strike:True, replace:"with"},
    #     {"text":"you", strike:False}
    # ]

    in_texts = comp[0].split()
    out_texts = comp[1].split()
    diff = []
    text = ''
    mistakes = 0
    for t in range(len(out_texts)):
        if "_" in out_texts[t]:
            if text:
                diff.append({"text":text, "strike":False, "highlight": False})
                text = ''
            diff.append({'text':in_texts[t], "strike": True, "highlight": False})
            mistakes += 1
        
        elif "_" in in_texts[t]:
            if text:
                diff.append({"text":text, "strike":False, "highlight": False})
                text = ''
            diff.append({"text":out_texts[t], "strike":False, "highlight": True})

        else:
            text += " "+ in_texts[t]
    if text:
        diff.append({"text":text, "strike":False, "highlight": False})
    return [[in_text, out_text], diff], mistakes


# helper fir pushing to redis hash
def hsetex(db, name, key, value, ttl=1800):  
    db.hset(name=name, key=key, value=value)  
    db.expire(name=name, time=ttl)


def make_chat(user_chat, bot_chat):
    chat = ''
    for bot, user in zip(bot_chat, user_chat):
        chat += "You: " + bot + "\n" + "Person: " + user 
    return chat