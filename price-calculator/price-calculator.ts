import { DefaultDiscount } from "../discount/default-discount";
import { IDiscount } from "../discount/i-discount";
import { PriceReport } from "../price-report/price-report";
import { Product } from "../product/product";
import { DefaultTax } from "../tax/default-tax";
import { ITax } from "../tax/i-tax";
import { Money } from "../money/money";

export class PriceCalculator {
    tax: ITax = new DefaultTax();
    discountsBeforeTax: IDiscount[] = [];
    discountsAfterTax: IDiscount[] = [new DefaultDiscount()];

    withTax(tax: ITax): PriceCalculator {
        this.tax = tax;
        return this;
    }

    withDiscountBeforeTax(discount: IDiscount): PriceCalculator {
        this.discountsBeforeTax.push(discount);
        return this;
    }

    withDiscountAfterTax(discount: IDiscount): PriceCalculator {
        this.discountsAfterTax.push(discount);
        return this;
    }

    calculate(product: Product): PriceReport {
        const price = product.price;

        let discountTotal = this.discountsBeforeTax.filter(x => x.isApplicable(product.upc))
        .reduce((sum, current) => sum.add(current.applyDiscount(price)), new Money(0));
        const discountedPriceBeforeTax = price.subtract(discountTotal);

        const taxTotal = this.tax.applyTax(discountedPriceBeforeTax);

        const totalDiscountAfterTax = this.discountsAfterTax.filter(x => x.isApplicable(product.upc))
        .reduce((sum, current) => sum.add(current.applyDiscount(discountedPriceBeforeTax)), new Money(0));
        discountTotal = discountTotal.add(totalDiscountAfterTax);

        const total = price.add(taxTotal).subtract(discountTotal);
        return new PriceReport(price, taxTotal, total, discountTotal);
    }
}