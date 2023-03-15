import { PriceReport } from "../price-report/price-report";
import { Product } from "../product/product";
import { DefaultTax } from "../tax/default-tax";
import { ITax } from "../tax/i-tax";

export class PriceCalculator {
    tax: ITax = new DefaultTax();

    withTax(tax: ITax): PriceCalculator {
        this.tax = tax;
        return this;
    }

    calculate(product: Product): PriceReport {
        var price = product.price;
        var taxTotal = this.tax.applyTax(price);
        var total = price.add(taxTotal);
        return new PriceReport(price, taxTotal, total);
    }
}