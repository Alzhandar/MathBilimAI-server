import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: string;
    topic: string; 
}

const QuestionSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, required: true },
    topic: { type: String, required: true } 
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
