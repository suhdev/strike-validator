import {FieldDef} from './FieldDef';
import {RULES} from './Rules'; 
import {Localizer} from './Localizer';
import {printf,curry,Formatter,Dictionary,identity,getDataAt} from 'strike-util';  

interface MessageLocalizer{
    getMessageFor(key:string,args:any[]):string;
}

class DefaultMessageLocalizer implements MessageLocalizer{
    _loc:Dictionary<string>;
    constructor(loc:Dictionary<string>){
        this._loc = loc;
    }

    getMessageFor(key:string,args:any[]):string{
        return printf(getDataAt<string>(this._loc,key,'.'));
    } 
}

interface RuleProvider {
    getRuleForKey(key:string,args:any[]);
}

export class Validator {
    localizer:MessageLocalizer;
    rulesProvider:RuleProvider;
    constructor(localizer:MessageLocalizer){
        this.localizer = localizer; 
    }

    validate(){

    }
}



const ERRORS = {
  "number":"%s must be a number, %typeof was is given",
  "date":"%s must be a number a was is given", 
  "between":"%s must be greater than %d and less than %d, %d was given", 
  "betweene":"%s must be between %d and %d, %d was given", 
  "required":"%s is required",
  "max":"%s must be less than %d",
  "min":"%s must be greater than %d",
  "maxe":"%s must be less than or equal to %d",
  "mine":"%s must be greater than or equal to %d",
};

interface ValidateFn{
    (...args:any[]):(val:any)=>boolean;
}

function createValidator(){
    var rules = Object.assign({},RULES);
    var fields = []; 
    var localizer:Localizer; 

    function addRule(key:string,validate:ValidateFn){
        rules[key] = validate;
        return o; 
    }

    function field(key:string,type:string,rule?:string){
        let val = {key,type,rules:[]};
        let _r = (rule && rule.split('|')) || []; 
        val.rules = _r
            .filter((ez)=>{
                return ez;
            })
            .map((e)=>{
                let kk = e.split(':');
                let name = kk.shift(); 
                if (name && rules[name]){
                    return {
                        rule:rules[name].apply(null,...kk),
                        error:curry([ERRORS[name],label,...kk],printf) as (val?:any)=>string
                    };
                }
                return identity;
            });
        fields.push(val);
        return o; 
    }

    function validate(obj:Dictionary<any>){
        let errors = []; 
        let field:FieldDef = null;
        let val:any = null;  
        for (var i=0,l=fields.length;i<l;i++){
            field = rules[i]; 
            val = obj[field.key]; 
        if (field.validator && field.validator.length > 0){
            field.validator.forEach((em)=>{
                if (!em.rule(val)){
                    errors.push(em.error(val)); 
                }
            });
        }
        }
        return errors; 
    }

    let o = {
        addRule,
        field,
        validate,
    }; 

    return o; 

}

let v = createValidator();
v.field('firstName','string','required')
 .field('lastName','string','required')
 .field('age','number','required|between:12:20');



// function parseRule(e:string,label:string,rules:Dictionary<(...args:any[])=>((val:any)=>boolean)>){
//     let vv = e.split(":"); 
//     let name = vv.shift(); 
//     if (name && rules[name]){
//         return {
//             rule:rules[name].apply(null,vv) as (val?:any)=>boolean,
//             error:curry([ERRORS[name],label,...vv],printf) as (val?:any)=>string,
//         } 
//     }
//     throw new Error(printf('%s could not be found in the provided ruleset.',name));
// }

// function createValidation(rules:FieldDef[]){
//     rules.forEach((e)=>{
//       if (e.rule){
//         let kk = e.rule.split('|'); 
        
//         e.validator = kk.map((em)=>{
//             return parseRule(em,e.label,RULES); 
//         });
//       }
        
//     }); 
// }

function validate<T>(rules:FieldDef[],obj:Dictionary<any>,formatter:Formatter){
    let errors = []; 
    let field:FieldDef = null;
    let val:any = null;  
    for (var i=0,l=rules.length;i<l;i++){
        field = rules[i]; 
        val = obj[field.key]; 
      if (field.validator && field.validator.length > 0){
        field.validator.forEach((em)=>{
            if (!em.rule(val)){
                errors.push(em.error(val)); 
            }
        });
      }
    }
    return errors; 
}