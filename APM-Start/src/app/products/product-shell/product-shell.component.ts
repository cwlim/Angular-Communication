import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';
    monthCount: number;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.selectedProductChange$.subscribe((selectedProduct: IProduct)=>{
            if (selectedProduct) {  
                const start = new Date(selectedProduct.releaseDate);
                const now = new Date();
                this.monthCount = Math.round((now.getTime() - start.getTime())/(1000*60*60*24*30));
            } else {
                this.monthCount = 0;
            }
        });
    }

}
