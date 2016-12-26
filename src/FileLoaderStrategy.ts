import {LoadStrategy} from './LoadStrategy';
import {Dictionary} from 'strike-util';

export class FileLoaderStrategy implements LoadStrategy{
    constructor(){

    }

    load(locale:string):Promise<Dictionary<string>>{
        return new Promise<Dictionary<string>>((resolve,reject)=>{
            
        });
    }
}