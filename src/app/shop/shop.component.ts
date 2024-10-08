import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IPagination } from '../shared/models/pagination';
import { IBrands } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  products : IProduct[]=[];
  brands!: IBrands[];
  types!: IType[];
  shopParams = new ShopParams();
  totalCount!: number;

  sortOption = [
    { name: 'Alphabetically', value: 'name' },
    { name: 'Price: Low To Heigh', value: 'priceAsc' },
    { name: 'Price: Heigh To Low', value: 'priceDesc' },
  ];

  constructor(private shopService:ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrads();
    this.getType();
    this.onManage();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams)
    .subscribe({
      next: (response: IPagination) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getBrads(){
    this.shopService.getBrand().subscribe({
      next:(response:IBrands[])=>{
        this.brands = [{id:0, name:"All"}, ...response];
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  getType(){
    this.shopService.getTypes().subscribe({
      next:(response:IType[])=>{
        this.types = [{id:0, name:"All"},...response];
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  onBrandSelected(brandId:number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelcted(sortEvent:Event){
    this.shopParams.sort = (sortEvent.target as HTMLTextAreaElement).value;
    this.getProducts();
  }

  onPageChange(page: number): void {
    this.shopParams.pageNumber = page;
    this.getProducts();
  }

  onSearch(){
    this.shopParams.search = this.searchInput.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  onManage(){
    this.brands = [];
    return "this is the task you have done";
  }
}
