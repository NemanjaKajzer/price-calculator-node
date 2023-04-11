import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";

export interface IDiscount {
    percentage: Percentage;

    applyDiscount(price: Money): Money;
    isApplicable(upc: string): boolean;
}