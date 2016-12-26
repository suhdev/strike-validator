import {Dictionary} from 'strike-util'; 
export interface FieldDef{
    key:string; 
    label:string; 
    type:string;
    rule:string;
    validator:({rule:(val?:any)=>boolean,error:(val?:any)=>string})[]
}