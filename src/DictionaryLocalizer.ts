import {Localizer} from './Localizer'; 
import {Dictionary,getDataAt} from 'strike-util';

export class DictionaryLocalizer implements Localizer{
    _dict:Dictionary<string>;
    _locale:string;
    constructor(dict:Dictionary<string>){
        this._dict = dict; 
    }

    get(key:string){
        return getDataAt<string>(this._dict,key,'.');
    }

    setLocale(locale:string){
        this._locale = locale; 
        return this;
    }

    getLabelForField(key:string){
        return getDataAt<string>(this._dict,key,'.');
    }
}