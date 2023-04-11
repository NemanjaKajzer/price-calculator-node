import { AbsoluteExpense } from "../expense/absolute-expense";
import { Money } from "../money/money";

export class PriceReport {
    price: Money;
    taxTotal: Money;
    total: Money;
    discountsTotal: Money;
    appliedExpenses: AbsoluteExpense[];

    constructor(price: Money, taxTotal: Money, total: Money, discountsTotal: Money, appliedExpenses: AbsoluteExpense[]) {
        this.price = price;
        this.taxTotal = taxTotal;
        this.total = total;
        this.discountsTotal = discountsTotal;
        this.appliedExpenses = appliedExpenses;
    }

    toString(): string {
        return `Cost = ${this.price}\n` +
            `Tax = ${this.taxTotal}\n` +
            (this.discountsTotal.equals(0) ? '' : `Discounts = ${this.discountsTotal}\n`) +
            (this.appliedExpenses.length > 0 ? this.appliedExpenses.join("") : "") +
            `TOTAL = ${this.total}`;
    }

}