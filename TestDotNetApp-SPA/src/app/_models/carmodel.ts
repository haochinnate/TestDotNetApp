import { Photo } from './Photo';

export interface Carmodel {
    id: number;
    maker: string;
    modelName: string;
    levelName: string;
    energyForm: string;
    lastEditedDate: any;
    dayOfPublish: Date;
    length: number;
    width: number;
    height: number;
    price: number;
    horsePower: number;
    airbagsNumber: number;
    bootCapacity: number;
    sizeAndType: string;
    fuelConsumption: number;
    photoUrl: string;
    introduction?: string;
    photos?: Photo[];
}
