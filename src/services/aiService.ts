import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY анықталмаған');
}

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const difficultyPrompts = {
    easy: '20 оңай сұрақтар жасаңыз',
    medium: '20 орташа қиындықтағы сұрақтар жасаңыз',
    hard: '20 қиын сұрақтар жасаңыз'
};

export const generateTest = async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Question[]> => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Сіз көмекші ассистентсіз.' },
                { role: 'user', content: `${difficultyPrompts[difficulty]} ${topic} тақырыбы бойынша. Әр сұрақта 4 жауап нұсқасы болуы керек, біреуі дұрыс жауап. Дұрыс жауапты жұлдызшамен (*) белгілеңіз. Барлық 20 сұрақты бір ретте келтіріңіз, дұрыс жауаптардың барлық нұсқалары міндетті түрде болуы керек.` }
            ],
            max_tokens: 2048,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const testContent = response.data.choices[0].message.content.split('\n\n').map((block: string) => {
            const lines = block.split('\n');
            const question = lines[0].trim();
            const options = lines.slice(1, 5).map((line: string) => line.trim().replace(/^[a-dA-D]\.\s*/, ''));
            const correctAnswer = lines.slice(1, 5).find((line: string) => line.trim().endsWith('*'))?.trim().replace(/\*$/, '');
            return {
                question,
                options: options.map((option: string) => option.replace(/\*$/, '').trim()),
                correctAnswer: correctAnswer ? correctAnswer.replace(/\*$/, '').trim() : options[0]
            };
        });

        if (testContent.length < 20) {
            throw new Error('Генерацияланған сұрақтар саны жеткіліксіз.');
        }

        return testContent;
    } catch (error) {
        console.error('Тестті генерациялау кезінде қате:', error);
        throw new Error('Тестті генерациялау сәтсіз аяқталды');
    }
};

export const chatWithAI = async (messages: Array<{ role: string, content: string }>): Promise<string> => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Your name is Ernar, and you are a mathematics teacher. You will answer only questions related to mathematics. If the question is not related to mathematics, such as politics or philosophy, you should respond that you can only answer questions about mathematics.' },
                ...messages
            ],
            max_tokens: 1024,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with AI:', error);
        throw new Error('Failed to communicate with AI');
    }
};


export const analyzeTask = async (prompt: string): Promise<{ topics: string[], solution: string }> => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1024,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content;
        const [topicsPart, solutionPart] = content.split('Solution:');
        const topics = topicsPart
            .split('\n')
            .slice(1) // remove the first line which is 'Topics to Learn:'
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0);

        const solution = solutionPart ? solutionPart.trim() : '';

        return {
            topics: topics.length ? topics : ['Тақырыптар табылмады.'],
            solution: solution.length ? solution : 'Шешім табылмады.'
        };
    } catch (error) {
        console.error('Тапсырманы талдау кезінде қате:', error);
        throw new Error('Тапсырманы талдау сәтсіз аяқталды');
    }
};

export const getCorrectAnswerCount = async (answers: string[], correctAnswers: string[]): Promise<number> => {
    try {
        const prompt = `Given the following answers and correct answers, count the number of correct answers:\n\nAnswers: ${answers.join(', ')}\nCorrect Answers: ${correctAnswers.join(', ')}`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1024,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content;
        const correctAnswerCount = parseInt(content.match(/\d+/)?.[0] || '0', 10);

        return correctAnswerCount;
    } catch (error) {
        console.error('Error getting correct answer count:', error);
        throw new Error('Failed to get correct answer count');
    }
};