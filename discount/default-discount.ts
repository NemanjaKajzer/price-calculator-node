import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { IDiscount } from "./i-discount";

export class DefaultDiscount implements IDiscount {
    percentage: Percentage = new Percentage(0);

    applyDiscount(price: Money): Money {
        return new Money(0);
    }
}