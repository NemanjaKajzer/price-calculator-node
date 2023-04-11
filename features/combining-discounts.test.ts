import { Discount } from "../discount/discount";
import { SelectiveDiscount } from "../discount/selective-discount";
import { AbsoluteExpense } from "../expense/absolute-expense";
import { PercentageExpense } from "../expense/percentage-expense";
import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";
import { Tax } from "../tax/tax";

test('When discounting method not specified, discounts are applied additive', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');

    const packagingExpense = new PercentageExpense(new Percentage(0.01), 'Packaging');
    const transportExpense = new AbsoluteExpense(new Money(2.2), 'Transport');

    const calculator = new PriceCalculator();
    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .withExpense(packagingExpense)
        .withExpense(transportExpense)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $4.46\n` +
        `Packaging = $0.20\n` +
        `Transport = $2.20\n` +
        `TOTAL = $22.44`;

    expect(report.toString()).toBe(expectedString);
});


test('When specified, discounts are applied multiplicative', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');

    const packagingExpense = new PercentageExpense(new Percentage(0.01), 'Packaging');
    const transportExpense = new AbsoluteExpense(new Money(2.2), 'Transport');

    const calculator = new PriceCalculator();
    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .withExpense(packagingExpense)
        .withExpense(transportExpense)
        .withMultiplicativeDiscounts()
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $4.24\n` +
        `Packaging = $0.20\n` +
        `Transport = $2.20\n` +
        `TOTAL = $22.66`;

    expect(report.toString()).toBe(expectedString);
});