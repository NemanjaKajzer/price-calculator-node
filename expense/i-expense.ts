import { Money } from "../money/money";

export interface IExpense {
    description: string;

    applyExpense(price: Money): Money;
}