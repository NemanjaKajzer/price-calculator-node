import { Money } from "../money/money";

export interface ICap {
    applyCap(discountTotal: Money, price: Money): Money;
}