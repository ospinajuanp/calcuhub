import { roundTwo, percentage } from "../../utils"

export function calculatePercentageTax (amount:number, percentageValue:number){

    const result = percentage(percentageValue) * amount 

    return roundTwo(result)
    
}