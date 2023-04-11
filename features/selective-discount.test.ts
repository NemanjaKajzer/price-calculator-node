import { Discount } from "../discount/discount";
import { SelectiveDiscount } from "../discount/selective-discount";
import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";
import { Tax } from "../tax/tax";

test('When a selective discount with valid UPC is specified, it should be applied', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');

    const calculator = new PriceCalculator();
    const report = calculator.withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.05\n` +
        `Discounts = $4.46\n` +
        `TOTAL = $19.84`;

    expect(report.toString()).toBe(expectedString);
});

test('When a selective discount with invalid UPC is specified, it should be ignored', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const tax = new Tax(0.21);
    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '789');

    const calculator = new PriceCalculator();
    const report = calculator.withTax(tax)
        .withDiscountAfterTax(discount)
        .withDiscountAfterTax(selectiveDiscount)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $4.25\n` +
        `Discounts = $3.04\n` +
        `TOTAL = $21.46`;

    expect(report.toString()).toBe(expectedString);
});
