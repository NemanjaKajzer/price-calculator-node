import { DefaultDiscount } from "../discount/default-discount";
import { IDiscount } from "../discount/i-discount";
import { PriceReport } from "../price-report/price-report";
import { Product } from "../product/product";
import { DefaultTax } from "../tax/default-tax";
import { ITax } from "../tax/i-tax";

export class PriceCalculator {
    tax: ITax = new DefaultTax();
    discount: IDiscount = new DefaultDiscount();

    withTax(tax: ITax): PriceCalculator {
        this.tax = tax;
        return this;
    }

    withDiscount(discount: IDiscount): PriceCalculator {
        this.discount = discount;
        return this;
    }

    calculate(product: Product): PriceReport {
        const price = product.price;
        const taxTotal = this.tax.applyTax(price);
        const discountTotal = this.discount.applyDiscount(price)
        const total = price.add(taxTotal).subtract(discountTotal);
        return new PriceReport(price, taxTotal, total, discountTotal);
    }
}