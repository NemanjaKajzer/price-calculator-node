import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";
import { Tax } from "../tax/tax";

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

test('When price and tax specified, custom tax should be applied', () => {
  var product: Product = {
    name: "The Little Prince",
    upc: "12345",
    price: new Money(20.25)
  };

  var tax = new Tax(new Percentage(0.21));

  var calculator = new PriceCalculator()
    .withTax(tax);

  var report = calculator.calculate(product);

  expect(report.total.toString()).toBe("$24.50");
});
