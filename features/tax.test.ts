import { Money } from "../money/money";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";

test('When only price specified, default tax should be applied', () => {
  var product: Product = {
    name: "The Little Prince",
    upc: "12345",
    price: new Money(20.25)
  };

  var calculator = new PriceCalculator();
  var report = calculator.calculate(product);

  expect(report.total.toString()).toBe("$24.30");
});
