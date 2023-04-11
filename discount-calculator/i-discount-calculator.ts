import { IDiscount } from "../discount/i-discount";
import { Money } from "../money/money";

export interface IDiscountCalculator {
    Apply(discounts: IDiscount[], price: Money): Money;
}