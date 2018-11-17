import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../core/services/accounts.service';
import { trimValues, validateAllFormFields } from 'src/app/core/store/utils';
import { SIGNIN } from 'src/app/core/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from 'src/app/core/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private loginService: AccountsService, private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  submit() {
    // const reqdata = { 'email': 'test@intelegencia.com', 'password': 'intel01' };
    const payload = trimValues<SIGNIN>(this.signInForm.value);
    if (this.signInForm.valid) {
      this.store.dispatch(new LogIn(payload));
    } else {
      validateAllFormFields(this.signInForm);
    }
  }

  displayFieldCss(field: string) {
    return {
      'invalid': !this.signInForm.get(field).valid && this.signInForm.get(field).touched,
    };
  }
}
