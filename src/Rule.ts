export interface Rule{
    type:string;
    key:string; 
    ruleset:[(val:any)=>boolean,string][];
}