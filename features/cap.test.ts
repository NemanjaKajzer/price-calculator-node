import { AbsoluteCap } from "../cap/absolute-cap";
import { PercentageCap } from "../cap/percentage-cap";
import { Discount } from "../discount/discount";
import { SelectiveDiscount } from "../discount/selective-discount";
import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";
import { Tax } from "../tax/tax";

test('When discount is greater than percentage cap, cap percentage of original price is used as discount.', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');
    const cap = new PercentageCap(0.2);

    const calculator = new PriceCalculator();

    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .withCap(cap)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $4.05\n` +
        `TOTAL = $20.45`;

    expect(report.toString()).toBe(expectedString);
});

test('When discount is greater than absolute cap, cap value is used as discount.', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');
    const cap = new AbsoluteCap(4);

    const calculator = new PriceCalculator();

    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .withCap(cap)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $4.00\n` +
        `TOTAL = $20.50`;

    expect(report.toString()).toBe(expectedString);
});

test('When cap is larger than the discount itself, original discount is applied.', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');
    const cap = new PercentageCap(0.3);

    const calculator = new PriceCalculator();

    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .withCap(cap)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $4.46\n` +
        `TOTAL = $20.04`;

    expect(report.toString()).toBe(expectedString);
});
