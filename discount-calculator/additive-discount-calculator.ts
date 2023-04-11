import { IDiscount } from "../discount/i-discount";
import { Money } from "../money/money";
import { IDiscountCalculator } from "./i-discount-calculator";

export class AdditiveDiscountCalculator implements IDiscountCalculator {

    Apply(discounts: IDiscount[], price: Money): Money {
        return discounts.reduce((sum, current) => sum.add(current.applyDiscount(price)), new Money(0));
    }
    
}