import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  errors!: string[];
  returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams?.['returnUrl'] || '/shop';
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null,
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
        [this.validateEmailNotTaken()],
      ],
      password: [null, 
        [
          Validators.required,
          Validators.pattern("(?=^.{6,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")
        ]
      ],
      confirmPassword : ['', 
        [
          Validators.required,
          this.matchValues('password')
        ]
      ]
    });
  }

  onSubmit(): void {
    this.accountService.register(this.registerForm.value).subscribe({
      next : () => this.router.navigateByUrl('/shop'),
      error: (error : any) => {
        console.log(error);
        this.errors = error.errors;
      }
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) =>
      timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService
            .checkEmailExists(control.value)
            .pipe(map((res) => (res ? { emailExists: true } : null)));
        })
      );
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => 
      control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true };
  }

  goToLoginForm(): void {
    this.router.navigateByUrl(`/account/login?returnUrl=${this.returnUrl}`);
  }
}