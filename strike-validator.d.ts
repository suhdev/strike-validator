import {Dictionary,printf} from 'strike-util';

declare module "strike-validator" {

    /**
     * Represents a specific field within the object. 
     */
    export interface FieldDef {
        /**
         * the key of the field within the object. 
         */
        key:string;
        /**
         * a string representing the rules applied to this field. 
         */
        rule:string;
        /**
         * a string representing the type of the object can be ("number", "string", "date")
         */
        type:string;
    }

    /**
     * An interface of a localization class. 
     */
    export interface Localizer{
        setLocale(locale:string):Localizer;
        get(keyPath:string):string;
        getLabelForField(key:string):string;
    }

    export interface RuleDef<T>{
        (obj:T,errors:string[]):void;
    }

    export interface ValidationRule {
        (...args:any[]):(item:any)=>boolean;
    }

    /**
     * A validation class 
     */
    export class Validator<T> {
        rules:RuleDef<T>[]; 
        localizer:Localizer;
        _validationRules:Dictionary<ValidationRule>;

        /**
         * Instantiates the validator. 
         * @param {Localizer} localizer instance of a class implementing the {Localizer} interface. 
         */
        constructor(localizer:Localizer);

        /**
         * Adds a rule to the localization. 
         * @name addRule 
         * @param {string} key the rule key 
         * @param {ValidationRule} rule the rule function.
         * @returns this 
         */
        addRule(key:string,rule:(...args:any[])=>(val:any)=>boolean):this;

        /**
         * Parses field definitions and creates validation rules as per the provided field defs. 
         * @name parseFields 
         * @param {FieldDef[]} fields a list of field definitions 
         */
        parseFields(fields:FieldDef[]);

        /**
         * Validates an object against the rules of the this validator. 
         * @name validate 
         * @param {T} obj the object to validate. 
         * @returns {string[]} a list of errors if invalid, empty list otherwise. 
         */
        validate(obj:T):string[];

        /**
         * Get the label for a specific field, uses the localizer to get the field name. 
         * @name getLabelForField
         * @param {string} key the field key 
         * @returns {string} the label of the field as provided in the localizer. 
         */
        getLabelForField(key:string):string;

        /**
         * Get a validation rule given its key. 
         * @name getValidationRule
         * @param {string} key the key of the rule. 
         * @returns {ValidationRule} the validation rule. 
         */
        getValidationRule(key:string):ValidationRule;
    }
}
