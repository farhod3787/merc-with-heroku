import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/categoryService';
import { SubCategoryService } from 'src/app/shared/service/sub_categoryService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ContactService } from 'src/app/shared/service/contactService';
import { UsersService } from 'src/app/shared/service/usersService';
import { BasketComponent } from '../basket/basket.component';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  public rate = 0;
  selected = 'option1';
  categories = [];
  subcategories = [];
  form: FormGroup;
  registerUser: FormGroup;
  signin = true;
  body: any = {};
  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private router: Router,
    private contactService: ContactService,
    private userService: UsersService
  ) {
    this.getCategory();
    this.subgetCategory();
    this.verifyUser();
    this.verifyrate();
  }

  verifyrate() {

      if ( (JSON.parse(localStorage.getItem('products'))) ) {
    this.rate = (JSON.parse(localStorage.getItem('products'))).length;
      }
      else { this.rate = 0;}
  }

  getCategory() {
    this.categoryService.getAll().subscribe( res => {
      this.categories = res.json();
    });
  }
  subgetCategory() {
    this.subcategoryService.getAll().subscribe( res => {
      this.subcategories = res.json();
    });
  }

  withID(id) {
      this.router.navigate(['searchwith/' + id ]);
  }

  sign(login, password) {
    this.userService.sign(login, password).subscribe( res => {
      const body = res.json();
      console.log(body);
      localStorage.setItem('token', body.token);
      location.reload();
    });
  }

  updateRate(number) {
    this.rate = (JSON.parse(localStorage.getItem('products'))).length;
    // if (number === 0) {
    //   this.rate = 0;
    // } else {  this.rate++; }
  }

  verifyUser() {
      this.userService.getVerify().subscribe( res => {
        this.body = res.json();
        if (this.body.isUser) {
          this.signin = false;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    location.reload();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      number: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });

    this.registerUser = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      full_name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      address: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      phone_number: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      login: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      password: new FormControl(null, { validators: [Validators.required]})
    });


    $(document).ready(function() {
      // $('.collapse').click(function() {
      // 	$('header ul').slideToggle('600');
      // 	$('header').toggleClass('bg');

      // });
          $(document).scroll(function(event) {
            const scroll = $(this).scrollTop();
            if ($(this).scrollTop() > 170) {
              $('.header-bottom').addClass('fixed');
            } else {
              $('.header-bottom').removeClass('fixed');
            }
          });


          $('.message a').click( function() {
            $('.reg-form').animate({height: 'toggle', opacity: 'toggle'} );
         });
    });

  }

  onSave() {
    this.contactService.callback(
      this.form.value.name,
      this.form.value.number,
      this.form.value.message
    ).subscribe( res => {
      if (res) {
        this.form.reset();
        Swal.fire(
              'Good job!',
              'New Product Saved!',
              'success'
            );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in Save New Product'
        });
      }
    });
  }


  resgisterNewUser() {
    this.userService.post(
        this.registerUser.value.name,
        this.registerUser.value.full_name,
        this.registerUser.value.email,
        this.registerUser.value.address,
        this.registerUser.value.phone_number,
        this.registerUser.value.login,
        this.registerUser.value.password).subscribe( res => {
      const body = res.json();
      if (res) {
        localStorage.setItem('token', body.token);
        this.form.reset();
        Swal.fire(
              'Good job!',
              'New Product Saved!',
              'success'
            );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in Save New Product'
        });
      }
    });
  }


}
