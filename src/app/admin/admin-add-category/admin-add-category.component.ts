import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/categoryService';
import { ProductService } from 'src/app/shared/service/productsService';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/productModel';
import Swal from 'sweetalert2';
import { Category } from 'src/app/shared/model/categoryModel';
@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {


  status = 'create';
  id = null ;
  imagePreview: any;
  form: FormGroup;
  categories = [];
  category: Category;
  image;
  isLoad = true;
  imageview = true;

  constructor(
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private router: Router
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      name_uz: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      name_ru: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoad = false;
        this.status = 'edit';
        this.id = paramMap.get('id');
        this.categoryService.getCategory(this.id).subscribe( result => {
            const postData = result.json();
            this.category = {
            id: postData._id,
            name_uz: postData.name_uz,
            name_ru: postData.name_ru
          };

            this.form.setValue({
            name_uz:   this.category.name_uz,
            name_ru:   this.category.name_ru
            });
            this.isLoad = true;

        });
      } else {
        this.id = null;
      }
    });
  }

onSave() {
  if (this.status === 'create') {
    this.categoryService.post(
      this.form.value.name_uz,
      this.form.value.name_ru
    )
    .subscribe( res => {
      if(res) {
          this.form.reset();
          Swal.fire(
            'Good job!',
            'New Category Saved!',
            'success'
          );
          this.router.navigate(['/admin/categories'])

        }
          else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error in Save New Product',
            timer: 3000
          })
        }
    });
  }
  else {
      this.categoryService.update(
        this.id,
        this.form.value.name_uz,
        this.form.value.name_ru
        ).subscribe( result => {
          if(result.ok) {
            Swal.fire(
              'Good job!',
              'Change Category successfully',
              'success'
            );
            this.form.reset();
            this.router.navigate(['/admin/categories']);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error in Update Product',
              timer: 3000
            })
          }
        })
  }
}

}
