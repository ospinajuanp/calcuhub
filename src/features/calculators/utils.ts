export function parseNumber(number:string){

    return parseFloat(number)
}

export function percentage (number:number){
    return number / 100;
}

export function roundTwo (number:number){
    return Math.round(number * 100) / 100;
}