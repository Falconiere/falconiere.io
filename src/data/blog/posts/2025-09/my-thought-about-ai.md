---
title: My thoughts about AI
cover: Astronaut-Headshot-Closeup.jpeg
coverAlt: Space poster astronaut
description: Here is the short description
author: Falconiere R. Barbosa
draft: true
date: 2025-09-26
createdAt: 20250926132203
tags:
  - blogging
---
I have utilised AI extensively to develop new products over the past few months. Claude, ChatGPT, Cursor and many others. I tested a lot. And I was like - YES! I'll be rich now! - but not so fast, and I am sad now. Here are some of my experiences with "vibe-coding".

All these tools are awesome! They make coding very productive, but it's not everything out of the box. There are a couple of things you need to know to get the best of them. The hype around AI created the idea that it would replace foundational knowledge about software development; in other words, we wouldn't need to learn how to code. Not true. 

The first product I tried was GitHub Copilot; I had to write the function name, and then it would autocomplete the implementation. I found that amazing! But! Most of the time, the implementation wasn't that good; too many lines for something simple, sometimes it didn't even work,  and I realised that to get that working properly, I had to spend a very good amount of time describing the implementation, which doesn't make any sense because if I have to explain step-by-step, it's faster to write the function by myself. The cases that I needed were too complex, maybe. Anyway, for simple things like :
```
export const isValidEmail  = (email:string) => boolean
```

Copilot worked very well, but I wanted more!

After using Copilot in VS Code, I switched to Cursor, a VS Code wrapper. And I think this is funny. Well, that was game-changing! Cursor was smarter, with recursive troubleshooting and the ability to use different LLMs. When I had to update or add unit tests, for example, using a cursor was a very good experience. I had to iterate a couple of times, and the job got done. The autocomplete is amazing, and the IDE is very smart in understanding the context of the projects.  But for complex tasks like:

```
Go through the code base, identify the patterns, then right documention
```



