import { IDiscount } from "../discount/i-discount";
import { Money } from "../money/money";
import { IDiscountCalculator } from "./i-discount-calculator";

export class MultiplicativeDiscountCalculator implements IDiscountCalculator {

    Apply(discounts: IDiscount[], price: Money): Money {
        return discounts.reduce((sum, current) => sum.add(current.applyDiscount(price.subtract(sum))), new Money(0));
    }
    
}