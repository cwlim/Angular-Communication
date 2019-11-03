import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit{    
    // listFilter: string;
    includeDetail = true;
    pageTitle: string = 'Product List';     
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    // @ViewChild('filterElement')
    // private _filterElementRef: ElementRef;

    // @ViewChild(NgModel) 
    // private _filterInput: NgModel;

    @ViewChild(CriteriaComponent)
    private _filterComponent: CriteriaComponent;
    // private _parentListFilter: string;

    constructor(private productService: ProductService, 
                private productParameterService: ProductParameterService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this._filterComponent.listFilter = this.productParameterService.filterBy;
                // this.performFilter(this._parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        // this._parentListFilter = this._filterComponent.listFilter;
    }

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }

    set showImage(showImage: boolean) {
        this.productParameterService.showImage = showImage;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onValueChange(filterValue: string) {
        this.productParameterService.filterBy = filterValue;
        this.performFilter(filterValue);
    }

    // get listFilter(): string {
    //     return this._listFilter;
    // }

    // set listFilter(filteredBy: string) {
    //     this._listFilter = filteredBy;
    //     this.performFilter(this._listFilter);
    // }


    // onFilterChange(filterValue: string): void {
    //     this.listFilter = filterValue;
    //     this.performFilter(filterValue);
    // }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
