import { DefaultDiscount } from "../discount/default-discount";
import { IDiscount } from "../discount/i-discount";
import { PriceReport } from "../price-report/price-report";
import { Product } from "../product/product";
import { DefaultTax } from "../tax/default-tax";
import { ITax } from "../tax/i-tax";
import { Money } from "../money/money";
import { IExpense } from "../expense/i-expense";
import { AbsoluteExpense } from "../expense/absolute-expense";

export class PriceCalculator {
    tax: ITax = new DefaultTax();
    discountsBeforeTax: IDiscount[] = [];
    discountsAfterTax: IDiscount[] = [new DefaultDiscount()];
    expenses: IExpense[] = [];

    withTax(tax: ITax): PriceCalculator {
        this.tax = tax;
        return this;
    }

    withDiscountBeforeTax(discount: IDiscount): PriceCalculator {
        this.discountsBeforeTax.push(discount);
        return this;
    }

    withDiscountAfterTax(discount: IDiscount): PriceCalculator {
        this.discountsAfterTax.push(discount);
        return this;
    }

    withExpense(expense: IExpense): PriceCalculator {
        this.expenses.push(expense);
        return this;
    }

    calculate(product: Product): PriceReport {
        const price = product.price;

        let discountsTotal = this.discountsBeforeTax.filter(x => x.isApplicable(product.upc))
        .reduce((sum, current) => sum.add(current.applyDiscount(price)), new Money(0));
        const discountedPriceBeforeTax = price.subtract(discountsTotal);

        const taxTotal = this.tax.applyTax(discountedPriceBeforeTax);

        const totalDiscountAfterTax = this.discountsAfterTax.filter(x => x.isApplicable(product.upc))
        .reduce((sum, current) => sum.add(current.applyDiscount(discountedPriceBeforeTax)), new Money(0));
        discountsTotal = discountsTotal.add(totalDiscountAfterTax);

        const expensesTotal = this.expenses.reduce((sum, current) => sum.add(current.applyExpense(price)), new Money(0)) 
        const appliedExpenses = this.expenses.map(x => new AbsoluteExpense(x.applyExpense(price), x.description));

        const total = price.add(taxTotal).subtract(discountsTotal).add(expensesTotal);
        return new PriceReport(price, taxTotal, total, discountsTotal, appliedExpenses);
    }
}