import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private accountService: AccountService){ }

  ngOnInit(): void {
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=>{
        console.log("User Loged In ");
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
}
