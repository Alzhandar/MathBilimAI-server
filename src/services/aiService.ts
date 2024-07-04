import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined');
}

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

export const generateTest = async (topic: string, numQuestions: number): Promise<Question[]> => {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Generate ${numQuestions} questions for ${topic}. Each question should have 4 options with one correct answer. Mark the correct answer with an asterisk (*).` }
        ],
        max_tokens: 1024,
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

    return testContent;
};

export const chatWithAI = async (question: string): Promise<string> => {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: question }
        ],
        max_tokens: 1024,
        temperature: 0.7,
    }, {
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].message.content;
};
