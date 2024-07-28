import mongoose from 'mongoose';
import { Request, Response } from 'express';
import MaterialModel from '../models/material';

export const createMaterial = async (req: Request, res: Response) => {
    try {
        const material = new MaterialModel(req.body);
        await material.save();
        res.status(201).json(material);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating material:', error.message); 
            res.status(500).json({ error: 'Failed to create material', details: error.message });
        } else {
            console.error('Unknown error creating material:', error);
            res.status(500).json({ error: 'Failed to create material', details: 'Unknown error' });
        }
    }
};

export const getMaterialsByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const materials = await MaterialModel.find({ category });
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
};

export const getMaterialById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const material = await MaterialModel.findById(id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch material' });
    }
};

export const deleteMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const material = await MaterialModel.findByIdAndDelete(id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.status(200).json({ message: 'Material successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete material' });
    }
};
