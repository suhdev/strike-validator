import {Dictionary,printf} from 'strike-util';
export interface FieldDef{
    key:string; 
    label?:string; 
    type:string;
    rule:string;
}




[{
    key:'firstName',
    type:'string',
    rule:'required'
}]


    // validator:({rule:(val?:any)=>boolean,error:(val?:any)=>string})[]
interface ValidationRule {
    (...args:any[]):(val:any)=>boolean;
}

interface RuleDef {
    error:(val:any)=>string;
    validate:(val:any)=>boolean; 
}

function createRule(rule:string,rules:Dictionary<ValidationRule>){
    let parts = rule.split(':');
    let name = parts.shift(); 
    let r = rules[name]; 
    if (!name || !r){
        throw new Error(printf('Rule %s is not defined',name)); 
    }
    return r.apply(null,parts); 
}

function buildValidationRule(fieldDef:FieldDef,rules:Dictionary<ValidationRule>){
    let _rules = fieldDef.rule.split('|');
    let validateRules = _rules.map((e,i)=>{
        return createRule(e,rules); 
    });
    if (rules[fieldDef.type]){
        validateRules.unshift()
    }
    validateRules.unshift()
}