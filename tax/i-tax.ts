import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";

export interface ITax {
    percentage: Percentage;

    applyTax(price: Money): Money;
}