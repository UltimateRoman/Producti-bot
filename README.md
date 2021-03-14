# Inspiration

Do you wish you had an assistant to remind you of pending tasks or probably just a pushing message to make you get back on track? Don't fret, because Producti-Bot is here to save the day.

## PRODUCTI-BOT

<img width="1024" alt="Producti-Bot" src="https://user-images.githubusercontent.com/77555172/111062079-1021fd80-84a7-11eb-8ad5-13ac7e1103e1.png">

With technology advancing these days, people prefer messaging to any other form of communication, and that also includes reminders. Producti-Bot is a bot that implements using social media (in this case, Discord) as a way to make people aware of activities to be carried out while still being able to stay online.


# What It Does

**Producti-Bot** is a Discord bot that helps set agendas for organisations of schedules for it's users so you never miss a task ever again and improve your productivity! 

The main command prompts that have been enabled on it (which have been made accessible by sending an !help command to the bot) are: 
 
1) **!task {time (using the 24 hour format)} {task description}** — _helps a user organise their tasks by adding them to a queue_.
 
2) **!schedule** — _which displays the current list of scheduled tasks and their statuses, completed or not_.

3) **task statuses** — the emojis, check marks, cross marks and an x, signify _mark as complete_, _mark as incomplete_ and _delete_ respectively.
 
4) **!reminder {time (using the 24 hour format)} {reminder message}** — _sets a reminder for a given time_.

5) **!timezone {UTC +/- offset}** — _lets the user set their own timezone for task reminders_.

N.B.: Only task creators can tweak the to-do lists they create, and completed tasks get rewards (memes) through direct messages to make it enjoyable.

# How We Built It

Producti-Bot was built using Node.js with Discord.js - to allow easy access to the Discord API. We used Sequelize and SQLite for the database. We also utilized Linode for the Virtual Private Server (VPS) to host the bot so that it could be accessible to anyone from anywhere.

# Challenges We Ran Into

There were a lot of hurdles we had to cross coupled with the difference in time zones. Firstly, we had to ensure that Producti-Bot sent only reminders for tasks that were yet to be completed. Afterward, we implemented a change in time zones to ensure a smooth running of task reminders via direct messaging.

# Accomplishments That We're Proud Of

We are proud of being able to make a Discord bot that can help in real-life situations for not only students but every other individual. 

# What We Learned

We improvised our design skills and better understood how to work with APIs (from Discord), how to code a bot with JavaScript, how to host it using Linode and, how to make a bot perform specific tasks for various individuals.

# What's Next For Producti-Bot

We hope to provide a system by which a user can set task interval times (that is 5 - 10 minutes, etcetera). We also hope to influence other hackers or organizations to implement social media to-do list bots.

© 2021 **The Producti-Bot Team**. All rights reserved.
