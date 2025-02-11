import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrands } from '../shared/models/brands';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl ="https://localhost:7047/api/";
  constructor(private http: HttpClient) { }

  getProducts(shopParams:ShopParams){
    let params = new HttpParams();
    if(shopParams.brandId !== 0 ){
      params = params.append("brandId",shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append("typeId",shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }


    params = params.append("sort",shopParams.sort);
    params = params.append("pageIndex",shopParams.pageNumber.toString());
    // params = params.append("pageIndex",shopParams.pageNumber.toString());
    params = params.append("pageSize",shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl+'products',{params})
  }

  getBrand(){
    return this.http.get<IBrands[]>(this.baseUrl+'Products/brands')
  }

  getTypes(){
    return this.http.get<IBrands[]>(this.baseUrl+'Products/types')
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+id)
  }

}

