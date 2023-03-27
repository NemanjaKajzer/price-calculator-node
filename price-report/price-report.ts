import { Money } from "../money/money";

export class PriceReport {
    price: Money;
    taxTotal: Money;
    total: Money;

    constructor(price: Money, taxTotal: Money, total: Money) {
        this.price = price;
        this.taxTotal = taxTotal;
        this.total = total;
    }

    toString(): string {
        return `Price = ${this.price}\n` +
            `Tax = ${this.taxTotal}\n` +
            `Total = ${this.total}`;
    }

}