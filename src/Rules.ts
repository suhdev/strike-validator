export var RULES = {
    "required":function(){
        return function(val:any):boolean{
            return typeof val !== "undefined" && val !== null && val !== ""; 
        }
    },
    "max":function(max:string){
        return function(val:number):boolean{
            return val < +max;
        }
    },
    "maxe":function(max:string){
        return function(val:number):boolean{
            return val <= +max;
        }
    },
    "min":function(min:string){
        return function(val:number):boolean{
            return val > +min; 
        }
    },
    "mine":function(min:string){
        return function(val:number):boolean{
            return val >= +min; 
        }
    },
    "date":function(){
        return function(val:any):boolean{
            return typeof val === "object" && val instanceof Date; 
        }
    },
    "number":function(){
        return function(val:any):boolean{
            return typeof val === "number" && !isNaN(parseFloat(val as any)); 
        }
    },
    "between":function(min:string,max:string){
        return function(val:number):boolean{
            return val > +min && val < +max; 
        }
    },
    "string":function(){
        return function (){
            return true; 
        }
    },
    "betweene":function(min:string,max:string){
        return function(val:number):boolean{
            return val >= +min && val <= +max; 
        }
    },
    "in":function(){
        let args = Array.prototype.slice.call(arguments,0); 
        return function(val:string):boolean{
            return args.indexOf(val) !== -1; 
        }
    }
};