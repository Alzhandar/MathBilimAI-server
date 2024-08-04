import { Schema, model, models, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    username: string;
    email: string;
    password: string;
    telegramNick?: string;
}

interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

userSchema.pre<IUserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUserDocument, IUserModel>('User', userSchema);

export default User;