import { Discount } from "../discount/discount";
import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";

test('When only discount specified, default tax and discount should be applied', () => {
    const product: Product = {
        name: "The Little Prince",
        upc: "12345",
        price: new Money(20.25)
    };

    const discount = new Discount(0.15);
    const calculator = new PriceCalculator();
    const report = calculator.withDiscountAfterTax(discount)
        .calculate(product);

    expect(report.total.toString()).toBe("$21.26");
});
