import { DefaultDiscount } from "../discount/default-discount";
import { IDiscount } from "../discount/i-discount";
import { PriceReport } from "../price-report/price-report";
import { Product } from "../product/product";
import { DefaultTax } from "../tax/default-tax";
import { ITax } from "../tax/i-tax";
import { Money } from "../money/money";
import { IExpense } from "../expense/i-expense";
import { AbsoluteExpense } from "../expense/absolute-expense";
import { IDiscountCalculator } from "../discount-calculator/i-discount-calculator";
import { AdditiveDiscountCalculator } from "../discount-calculator/additive-discount-calculator";
import { MultiplicativeDiscountCalculator } from "../discount-calculator/multiplicative-discount-calculator";

export class PriceCalculator {
    tax: ITax = new DefaultTax();
    discountsBeforeTax: IDiscount[] = [];
    discountsAfterTax: IDiscount[] = [new DefaultDiscount()];
    expenses: IExpense[] = [];
    discountCalculator: IDiscountCalculator = new AdditiveDiscountCalculator();

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

    withMultiplicativeDiscounts() {
        this.discountCalculator = new MultiplicativeDiscountCalculator();
        return this;
    }

    calculate(product: Product): PriceReport {
        const price = product.price;

        let discountTotal = this.discountCalculator.Apply(this.discountsBeforeTax.filter(x => x.isApplicable(product.upc)), price);
        const discountedPriceBeforeTax = price.subtract(discountTotal);

        const taxTotal = this.tax.applyTax(discountedPriceBeforeTax);

        const totalDiscountAfterTax = this.discountCalculator.Apply(this.discountsAfterTax.filter(x => x.isApplicable(product.upc)), discountedPriceBeforeTax);
        discountTotal = discountTotal.add(totalDiscountAfterTax);
        
        const expensesTotal = this.expenses.reduce((sum, current) => sum.add(current.applyExpense(price)), new Money(0))
        const appliedExpenses = this.expenses.map(x => new AbsoluteExpense(x.applyExpense(price), x.description));

        const total = price.add(taxTotal).subtract(discountTotal).add(expensesTotal);
        return new PriceReport(price, taxTotal, total, discountTotal, appliedExpenses);
    }
}