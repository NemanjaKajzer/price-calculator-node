import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { ITax } from "./i-tax";

export class Tax implements ITax {
    percentage: Percentage;

    applyTax(price: Money): Money {
        return price.multiply(this.percentage);
    }

}