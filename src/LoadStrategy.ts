import {Dictionary} from 'strike-util';
export interface LoadStrategy {
    load(locale:string):Promise<Dictionary<string>>;
}