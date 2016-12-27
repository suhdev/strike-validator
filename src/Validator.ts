import {Dictionary,printf} from 'strike-util';
import {Localizer} from './Localizer';
import {RULES} from './Rules';

interface FieldDef {
    key:string;
    rule:string;
    type:string;
}

interface RuleDef<T>{
    (obj:T,errors:string[]):void;
}

function createRuleDefForField<T>(def:FieldDef,rule:string,validator:Validator<T>){
    let parts = rule.split(':');
    let name = parts.shift(); 
    let fn = validator.getValidationRule(name); 
    if (!fn){
        throw new Error(printf('%s is not a rule.',name)); 
    }

    return fn.apply(null,...parts);
}

export interface ValidationRule {
    (...args:any[]):(item:any)=>boolean;
}
export class Validator<T> {
    rules:RuleDef<T>[]; 
    localizer:Localizer;
    _validationRules:Dictionary<ValidationRule>;
    
    constructor(localizer:Localizer){
        this.localizer = localizer;
        this._validationRules = {};
    }

    addRule(key:string,rule:(...args:any[])=>(val:any)=>boolean):Validator<T>{
        this._validationRules[key] = rule;
        return this;
    }

    parseFields(fields:FieldDef[]){
        this.rules = fields.map((em)=>{
            let rr = [{
                validate:this.getValidationRule(em.type),
                ruleName:em.type,
                params:[]
            }];
            let ev = em.rule.split('|').forEach((ez)=>{
                let parts = ez.split(':');
                let name = parts.shift();
                let fn = this.getValidationRule(name); 
                if (!fn){
                    throw new Error(printf('%s is not a rule.',name));
                }
                rr.push({
                    validate:fn.apply(null,parts),
                    ruleName:name,
                    params:parts
                })
            });
            return (val:T,errors:string[])=>{
                let rrTemp = null; 
                for(let i=0,l=rr.length;i<l;i++){
                    rrTemp = rr[i]; 
                    if (!rrTemp.validate(val[em.key])){
                        errors.push(printf(this.localizer.get(rrTemp.ruleName),this.localizer.getLabelForField(em.key),...rrTemp.params,val[em.key]));
                    }
                }
            }
        });
    }

    validate(obj:T){
        let errors = [];
        this.rules.forEach((em)=>{
            em(obj,errors);
        });
        return errors;
    }

    getLabelForField(key:string){
        return this.localizer.getLabelForField(key); 
    }

    getValidationRule(key:string){
        return this._validationRules[key] || RULES[key]; 
    }
}