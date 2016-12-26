import {Dictionary,getDataAt} from 'strike-util';
import {LoadStrategy} from './LoadStrategy'; 

export class Localizer{
    strategy:LoadStrategy;
    locale:string;
    localization:Dictionary<string>; 
    constructor(locale:string){
        this.locale = locale; 
        this.localization = {};
    }

    setLoadingStrategy(strategy:LoadStrategy){
        this.strategy = strategy;
    }

    load(){
        return this.strategy.load(this.locale)
            .then((e:Dictionary<string>)=>{
                this.localization = e;
            },(err:any)=>{
                throw err; 
            });
    }

    get(key:string):string{
        return getDataAt<string>(this.localization,key,'.');
    }

    setLocale(loc:string){
        if (loc !== this.locale){
            this.strategy.load(loc).then((dic:Dictionary<string>)=>{
                this.localization = dic; 
            },(err:any)=>{
                throw err;
            });
        }
    }
}