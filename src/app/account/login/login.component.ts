import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    password: new FormControl('', [Validators.required,Validators.pattern("(?=^.{6,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")])
  })

  constructor(private accountService: AccountService, private router: Router){ }

  ngOnInit(): void {
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=>{
        this.router.navigateByUrl('/shop')
        console.log("User Loged In ");
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
}
