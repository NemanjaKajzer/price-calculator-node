import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { IDiscount } from "./i-discount";

export class SelectiveDiscount implements IDiscount {
    percentage: Percentage;
    upc: string; 

    constructor(percentage: number, upc: string) {
        this.percentage = new Percentage(percentage);
        this.upc = upc;
    }

    applyDiscount(price: Money): Money {
        return price.multiply(this.percentage);
    }

    isApplicable(upc: string): boolean {
        return upc === this.upc;
    }

}