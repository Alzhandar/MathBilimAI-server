// import { Request, Response } from 'express';
// import User from '../models/userModel';

// interface AuthRequest extends Request {
//     user?: { id: string };
// }

// const getChats = async (req: AuthRequest, res: Response) => {
//     try {
//         const user = await User.findById(req.user?.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user.chats);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const addMessageToChat = async (req: AuthRequest, res: Response) => {
//     const { chatId, message } = req.body;
//     try {
//         const user = await User.findById(req.user?.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const chat = user.chats.id(chatId);
//         if (!chat) {
//             return res.status(404).json({ message: 'Chat not found' });
//         }
//         chat.messages.push(message);
//         await user.save();
//         res.json(chat);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const createNewChat = async (req: AuthRequest, res: Response) => {
//     const { title } = req.body;
//     try {
//         const user = await User.findById(req.user?.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const newChat = { title, messages: [] };
//         user.chats.push(newChat);
//         await user.save();
//         res.json(newChat);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const updateChatTitle = async (req: AuthRequest, res: Response) => {
//     const { chatId, title } = req.body;
//     try {
//         const user = await User.findById(req.user?.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const chat = user.chats.id(chatId);
//         if (!chat) {
//             return res.status(404).json({ message: 'Chat not found' });
//         }
//         chat.title = title;
//         await user.save();
//         res.json(chat);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export { getChats, addMessageToChat, createNewChat, updateChatTitle };
