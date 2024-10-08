import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ekart-frontend';

  constructor(private basketService:BasketService,private accountService:AccountService) {}

  ngOnInit(): void {
   this.loadBasket();
   this.loadCurrentUser();
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_Id');
    if (basketId){
      this.basketService.getBasket(basketId).subscribe({
        next:()=>{ 
          console.log('basket initialise')
        }
      });
    }
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe({
        next:()=>{
          console.log('Loaded user');
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
  }
}
