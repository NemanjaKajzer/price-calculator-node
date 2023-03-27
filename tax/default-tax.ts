import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { ITax } from "./i-tax";

export class DefaultTax implements ITax {
    percentage: Percentage = new Percentage(0.2);

    applyTax(price: Money): Money {
        return price.multiply(this.percentage);
    }

}