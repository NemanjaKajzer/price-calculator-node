import { Discount } from "../discount/discount";
import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";

test('When a discount is applied, display a message which reports the discounted amount', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const discount = new Discount(0.15);
    const calculator = new PriceCalculator();
    const report = calculator.withDiscount(discount)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
    `Tax = $4.05\n` +
    `Discounts = $3.04\n` +
    `TOTAL = $21.26`;

    expect(report.toString()).toBe(expectedString);
});

test('When only tax is applied, display a message which reports the total amount', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const calculator = new PriceCalculator();
    const report = calculator.calculate(product);

    const expectedString = `Cost = $20.25\n` +
    `Tax = $4.05\n` +
    `TOTAL = $24.30`;

    expect(report.toString()).toBe(expectedString);
});
