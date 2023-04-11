import { AbsoluteExpense } from "../expense/absolute-expense";
import { Money } from "../money/money";

export class PriceReport {
    price: Money;
    taxTotal: Money;
    total: Money;
    discountTotal: Money;
    appliedExpenses: AbsoluteExpense[];

    constructor(price: Money, taxTotal: Money, total: Money, discountTotal: Money, appliedExpenses: AbsoluteExpense[]) {
        this.price = price;
        this.taxTotal = taxTotal;
        this.total = total;
        this.discountTotal = discountTotal;
        this.appliedExpenses = appliedExpenses;
    }

    toString(): string {
        return `Cost = ${this.price}\n` +
            `Tax = ${this.taxTotal}\n` +
            (this.discountTotal.equals(0) ? '' : `Discounts = ${this.discountTotal}\n`) +
            (this.appliedExpenses.length > 0 ? this.appliedExpenses.join("") : "") +
            `TOTAL = ${this.total}`;
    }

}