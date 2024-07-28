import { Request, Response } from 'express';
import TelegramBot from 'node-telegram-bot-api';
import User from '../models/userModel';
import { chatWithAI } from '../services/aiService';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN анықталмаған');
}

const bot = new TelegramBot(token, { polling: true });
const userChatIds = new Map<string, number>();

bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Сәлеметсіз бе! Сайттағы пайдаланушы атыңызды енгізіңіз.');
});

bot.on('message', async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const username = msg.text?.trim();

    if (username && !username.startsWith('/')) {
        try {
            const user = await User.findOne({ username });

            if (user) {
                userChatIds.set(username, chatId);
                bot.sendMessage(chatId, `Рақмет, ${username}! Енді Math140AI хабарламаларын ала аласыз.\n\nСәлеметсіз бе, Math140AI сайтының оқушысы! Менің атым Ернар, мен сіздің менторыңызбын. Мені не туралы сұрағыңыз келеді?`, {
                    reply_markup: {
                        keyboard: [
                            [{ text: 'Тест нәтижелері' }, { text: 'Сұрақ қою' }]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            } else {
                bot.sendMessage(chatId, `${username} деген атпен пайдаланушы табылмады. Сайтқа тіркеліңіз.`);
            }
        } catch (error) {
            bot.sendMessage(chatId, 'Пайдаланушыны тексеру кезінде қате болды. Қайталап көріңіз.');
            console.error('Пайдаланушыны тексеру қатесі:', error);
        }
    }
});

const sendTestResults = async (chatId: number, username: string) => {
    try {
        const testResult = {
            testName: 'Математика',
            score: 17,
            totalQuestions: 20,
            date: new Date().toLocaleDateString()
        };

        let resultsMessage = 'Сіздің тест нәтижелеріңіз:\n\n';
        resultsMessage += `Тест: ${testResult.testName}\nБаға: ${testResult.score}/${testResult.totalQuestions}\nКүні: ${testResult.date}\n\n`;
        resultsMessage += 'Сізге келесі тақырыптарды үйрену керек:\n- Функциялар\n- Туынды\n- Интегралдар\n\n';

        bot.sendMessage(chatId, resultsMessage);

        const feedbackPrompt = [
            { role: 'system', content: 'You are a helpful assistant. Your name is Ernar, and you are a mathematics teacher. You will answer only questions related to mathematics. If the question is not related to mathematics, such as politics or philosophy, you should respond that you can only answer questions about mathematics.' },
            { role: 'user', content: `Мен ${username} есімді оқушының ${testResult.testName} тестінде ${testResult.score}/${testResult.totalQuestions} балл алған нәтижесіне қарап, оларға келесі тақырыптарды меңгеруді ұсынамын: Функциялар, Туынды, Интегралдар. Қосымша фидбек және мотивация беріңіз.` }
        ];
        const feedback = await chatWithAI(feedbackPrompt);

        bot.sendMessage(chatId, `Фидбек және мотивация:\n\n${feedback}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Тест нәтижелерін алу кезінде қате болды.');
        console.error('Тест нәтижелерін алу қатесі:', error);
    }
};

bot.onText(/Тест нәтижелері/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const username = Array.from(userChatIds.keys()).find(key => userChatIds.get(key) === chatId);

    if (username) {
        await sendTestResults(chatId, username);
    } else {
        bot.sendMessage(chatId, 'Алдымен сайттағы пайдаланушы атыңызды енгізіңіз.');
    }
});

bot.onText(/Сұрақ қою/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Сұрағыңызды енгізіңіз:');
    bot.once('message', async (message: TelegramBot.Message) => {
        const question = message.text;
        const messages = [
            { role: 'system', content: 'You are a helpful assistant. Your name is Ernar, and you are a mathematics teacher. You will answer only questions related to mathematics. If the question is not related to mathematics, such as politics or philosophy, you should respond that you can only answer questions about mathematics.' },
            { role: 'user', content: question || '' }
        ];
        try {
            const answer = await chatWithAI(messages);
            bot.sendMessage(chatId, `Жауап: ${answer}`);
        } catch (error) {
            bot.sendMessage(chatId, 'Сұрағыңызды өңдеу кезінде қате болды.');
            console.error('Сұрағыңызды өңдеу қатесі:', error);
        }
    });
});

const sendTelegramMessage = async (req: Request, res: Response) => {
    const { telegramNick } = req.body;

    try {
        console.log('Хабарлама жіберілуде:', telegramNick);

        const chatId = userChatIds.get(telegramNick);

        if (!chatId) {
            throw new Error('Пайдаланушының чат ID табылмады. Ботты бастауын және хабарлама жіберуін қамтамасыз етіңіз.');
        }

        const message = 'Сәлеметсіз бе! Math140AI-ге қош келдіңіз.';
        const response = await bot.sendMessage(chatId, message);

        console.log('Хабарлама сәтті жіберілді:', response);

        res.status(200).json({ message: 'Хабарлама сәтті жіберілді' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Telegram хабарламасын жіберу қатесі:', error.message);
            res.status(500).json({ message: 'Хабарламаны жіберу сәтсіз аяқталды' });
        } else {
            console.error('Белгісіз қате:', error);
            res.status(500).json({ message: 'Белгісіз қате себебінен хабарламаны жіберу сәтсіз аяқталды' });
        }
    }
};

export { sendTelegramMessage };
