import { Percentage } from "../percentage/percentage";
import { Money } from "../money/money";
import { IDiscount } from "./i-discount";

export class Discount implements IDiscount {
    percentage: Percentage;

    constructor(value: number) {
        this.percentage = new Percentage(value);
    }

    applyDiscount(price: Money): Money {
        return price.multiply(this.percentage);
    }

    isApplicable(upc: string): boolean {
        return true;
    }
}
