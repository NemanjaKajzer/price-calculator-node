import { Percentage } from "../percentage/percentage";

export class Money {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    multiply(percentage: Percentage): Money {
        const res = Math.round(((percentage.value * this.amount) + Number.EPSILON) * 100) / 100;
        return new Money(res);
    }

    add(...moneys: Money[]): Money {
        const res = this.amount + moneys.reduce((acc, input) => acc + input.amount, 0);
        return new Money(Math.round((res + Number.EPSILON) * 100) / 100);
    }

    subtract(...moneys: Money[]): Money {
        const res = this.amount - moneys.reduce((acc, input) => acc + input.amount, 0);
        return new Money(Math.round((res + Number.EPSILON) * 100) / 100);
    }

    toString(): string {
        return `$${this.amount.toFixed(2)}`;
    }
}