import { Schema, model, models } from 'mongoose';

interface ITestResult {
    userId: Schema.Types.ObjectId;
    testName: string;
    totalQuestions: number;
    correctAnswers: number;
    answers: string[];
    score: number;
    date: Date;
}

const testResultSchema = new Schema<ITestResult>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    testName: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    answers: { type: [String], required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const TestResult = models.TestResult || model<ITestResult>('TestResult', testResultSchema);

export default TestResult;
