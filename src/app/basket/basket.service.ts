import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string){ 
    return this.http.get<IBasket>(this.baseUrl+'basket?id='+id).pipe(  
      map((basket:IBasket)=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }),
    )
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl+'basket', basket).subscribe({
      next: (response:IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      error:(erro:any) => {
        console.log(erro);
      }
    })
  }


  
  // addItemToBasket(item:IProduct,quantity = 1){
  //   const itemToAdd :IBasketItem = this.mapProductItemToBasketItem(item ,quantity);
  //   const basket = this.getCurrentBasketValue() ?? this.createBasket();
  //   basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
  //   this.setBasket(basket);
  // }

  addItemToBasket(item: IProduct | IBasketItem, quantity = 1) {
    if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket); 
  }

  
  
  getCurrentBasketValue(){
    console.log('this is the basket value',this.basketSource.value);
    return this.basketSource.value;
  }
  
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_Id',basket.id);
    return basket;
  }
  
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i=>i.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity
      items.push(itemToAdd);
    }
    else{
      items[index].quantity += quantity;
    }
    return items;
  }
  
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shippingPrice = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shippingPrice;
    this.basketTotalSource.next({shipping: shippingPrice, total, subtotal});
  }
  
  
  
  private mapProductItemToBasketItem(item:IProduct): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 1,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }
  
  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }
  
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private isProduct(item: IProduct | IBasketItem): item is IProduct {
    return (item as IProduct).productBrand !== undefined;
  }
  
  
}

