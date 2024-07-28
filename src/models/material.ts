import mongoose, { Schema, Document } from 'mongoose';

interface IExercise {
    level: string;
    question: string;
    answer: string;
}

export interface IMaterial extends Document {
    title: string;
    category: string;
    theory: string;
    imageUrl?: string;
    exercises: IExercise[];
}

const ExerciseSchema: Schema = new Schema({
    level: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const MaterialSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    theory: { type: String, required: true },
    imageUrl: { type: String },
    exercises: [ExerciseSchema]
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
