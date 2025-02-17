export interface IFood {
    id: string;
    time: string;
    name: string;
    calories: number;
}
export interface IFoodForm {
    time: string;
    name: string;
    calories: number;
}
export interface IFoodApi {
    [id: string]: IFood;
}