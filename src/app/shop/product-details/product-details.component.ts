import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!:IProduct;

  constructor(private shopService:ShopService, private activateRoute:ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@ProductDetails', '')
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(Number(this.activateRoute.snapshot.paramMap.get('id'))).subscribe({
      next: (response: IProduct) => {
        this.product = response;
        this.bcService.set('@ProductDetails', this.product.name)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
