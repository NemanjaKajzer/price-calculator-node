import { Discount } from "../discount/discount";
import { SelectiveDiscount } from "../discount/selective-discount";
import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";

test('When discount before tax specified, tax should be applied to discounted price', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const discount = new Discount(0.15);
    const selectiveDiscount = new SelectiveDiscount(0.07, '12345');
    const calculator = new PriceCalculator();
    const report = calculator.withDiscountBeforeTax(selectiveDiscount)
        .withDiscountAfterTax(discount)
        .calculate(product);

    const expectedString = `Cost = $20.25\n` +
        `Tax = $3.77\n` +
        `Discounts = $4.24\n` +
        `TOTAL = $19.78`;

    expect(report.toString()).toBe(expectedString);
});
