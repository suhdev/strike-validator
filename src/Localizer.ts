import {Dictionary,getDataAt} from 'strike-util';
export interface Localizer{
    setLocale(locale:string):Localizer;
    get(keyPath:string):string;
    getLabelForField(key:string):string;
}