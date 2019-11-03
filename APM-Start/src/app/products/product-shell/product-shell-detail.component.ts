import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct|null;
    private _subscription: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this._subscription = this.productService.selectedProductChange$.subscribe(
           selectedProduct => this.product = selectedProduct 
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    // get product(): IProduct {
    //     return this.productService.currentProduct
    // }
}
