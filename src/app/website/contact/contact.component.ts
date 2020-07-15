import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shared/service/contactService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(
    private contactService: ContactService
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators: [Validators.required,  Validators.email]}),
      number: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSave() {
    this.contactService.post(
      this.form.value.name,
      this.form.value.email,
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

}
