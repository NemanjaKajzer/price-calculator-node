import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { ITax } from "./i-tax";

export class Tax implements ITax {
    percentage: Percentage;

    constructor(percentage: number) {
        this.percentage = new Percentage(percentage);
    }

    applyTax(price: Money): Money {
        return price.multiply(this.percentage);
    }

}