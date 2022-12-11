from compare import equalize, insert_newlines
import re
import string

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
    return {"word":word,"meaning": meaning, "examples": examples}



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
            user_list.append(text.split(":")[-1].strip())

    return {"app": app_list, "user": user_list}



def diff_finder(in_text, out_text, width=40, margin=10, sidebyside=False, compact=False):
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

    diff = show_comparison(in_text.lower(), out_text.lower(), width=width, 
                        margin=margin, sidebyside=sidebyside, compact=compact)
    return diff


