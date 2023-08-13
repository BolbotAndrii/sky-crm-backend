import { Document, Types } from 'mongoose';

export interface ILead extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    country: string;
    language: string;
    active: boolean;
    offer: string;
    comment: string;
    ip: number;
    office_id: Types.ObjectId | null;
    params: any[];
}