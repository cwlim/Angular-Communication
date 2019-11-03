import { Component, OnInit, OnDestroy } from "@angular/core";

import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "pm-product-shell-list",
  templateUrl: "./product-shell-list.component.html"
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Products";
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  private _subscription = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this._subscription.add(
      this.productService.getProducts().subscribe(
        (products: IProduct[]) => {
          this.products = products;
        },
        (error: any) => (this.errorMessage = <any>error)
      )
    );
    this._subscription.add(
      this.productService.selectedProductChange$.subscribe(
        selectedProduct => (this.selectedProduct = selectedProduct)
      )
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onSelected(product: IProduct) {
    // this.productService.currentProduct = product;
    this.productService.changeSelectedProduct(product);
  }
}
