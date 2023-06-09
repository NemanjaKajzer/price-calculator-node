import { Percentage } from "../percentage/percentage";

export class Money {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    multiply(percentage: Percentage): Money {
        const res = percentage.value * 100 * this.amount * 100 / 10000;
        return new Money(res);
    }

    add(...moneys: Money[]): Money {
        const totalCentsToAdd = moneys.reduce((acc, input) => acc + input.amount, 0) * 100;
        const res = Math.round(this.amount * 100 + totalCentsToAdd) / 100;
        return new Money(res);
    }

    subtract(...moneys: Money[]): Money {
        const totalCentsToSubtract = moneys.reduce((acc, input) => acc + input.amount, 0) * 100;
        const res = Math.round(this.amount * 100 - totalCentsToSubtract) / 100;
        return new Money(res);
    }

    equals(value: number): boolean {
        return this.amount === value;
    }

    gte(money: Money): boolean {
        return this.amount >= money.amount;
    }

    lte(money: Money): boolean {
        return this.amount <= money.amount;
    }

    gt(money: Money): boolean {
        return this.amount > money.amount;
    }

    lt(money: Money): boolean {
        return this.amount < money.amount;
    }

    toString(): string {
        return `$${this.amount.toFixed(2)}`;
    }
}