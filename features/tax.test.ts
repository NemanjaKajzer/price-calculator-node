import { Money } from "../money/money";
import { Percentage } from "../percentage/percentage";
import { PriceCalculator } from "../price-calculator/price-calculator";
import { Product } from "../product/product";
import { Tax } from "../tax/tax";

test('When only price specified, default tax should be applied', () => {
  const product: Product = {
    name: "The Little Prince",
    upc: "12345",
    price: new Money(20.25)
  };

  const calculator = new PriceCalculator();
  const report = calculator.calculate(product);

  expect(report.total.toString()).toBe("$24.30");
});

test('When price and tax specified, custom tax should be applied', () => {
  const product: Product = {
    name: "The Little Prince",
    upc: "12345",
    price: new Money(20.25)
  };

  const tax = new Tax(0.21);

  const calculator = new PriceCalculator()
    .withTax(tax);

  const report = calculator.calculate(product);

  expect(report.total.toString()).toBe("$24.50");
});
