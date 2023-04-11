import { Money } from "../money/money";

export class PriceReport {
    price: Money;
    taxTotal: Money;
    total: Money;
    discountTotal: Money;

    constructor(price: Money, taxTotal: Money, total: Money, discountTotal: Money) {
        this.price = price;
        this.taxTotal = taxTotal;
        this.total = total;
        this.discountTotal = discountTotal;
    }

    toString(): string {
        return `Price = ${this.price}\n` +
            `Tax = ${this.taxTotal}\n` +
            (this.discountTotal.equals(0) ? '' : `Discount = ${this.discountTotal}\n`) +
            `Total = ${this.total}`;
    }

}