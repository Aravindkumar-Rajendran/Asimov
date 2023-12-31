# Asimov - AI Coach for Spoken English

## Inspiration
If you are not from English native countries, learning English could open up a lot of opportunities. It can be studies or getting a job or running your business in other countries, English is going to help us a lot. You know, English is a global language. We have seen many apps to learning English but they are not adapting for our level of English and giving content based on that. Instead, they all give us generic content and much little feedback for Speaking. We wanted to harness the powerful generative AI models to give you realtime feedback in speaking English and content creation adapted to your level.


## What it does
**Asimov** is kind of Alexa / Siri for Language Learning which helps you in learning English through Random Dictionary word with its usage, Dialogues, Speech grammar and style corrections and free-flow conversations like Virtual Humans via Generative AI models adapting to your level of English.

## How we built it
We made a language app without working on the content manually (all generated using AI). And we also made it realtime so that users can get variety of content based on their level of English. We have used GPT3 for content generation and grammar correction. We have used Assembly-AI realtime API for speech to text.


## Challenges we ran into
1. Prompt Engineering in GPT3 for all the content types were challenging. And finally, we found good prompts for our use-cases.
2. We ran into CORS issues while deploying in the demo server. We resolved it by a lot of edits and rigorous testing.
3. Finding and labelling the wrong word in user text based on GPT3 reply was quite challenging.


## Accomplishments that we're proud of
1. We are so happy about teaming up virtually after a while to hack on the best things in AI.
2. We feel proud that we could create this app in just two days side-by-side along with our day job (which pays us for bread and butter).


## What we learned
1. Assembly AI real-time transcription authentication and integration.
2. Redis Database for session data caching.
3. Docker deployment of React App.


## What's next for Asimov - AI Speech Coach
1. Adding more flows/varieties for learning to make more fun.
2. Adding Text to Speech for Speech feedback.

## Demo
[![DEMO](https://img.youtube.com/vi/RrJeiz3nkko/0.jpg)](https://www.youtube.com/watch?v=RrJeiz3nkko)
