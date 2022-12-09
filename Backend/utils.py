


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