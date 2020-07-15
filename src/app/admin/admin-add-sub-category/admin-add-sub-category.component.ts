import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/categoryService';
import { ProductService } from 'src/app/shared/service/productsService';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/productModel';
import Swal from 'sweetalert2';
import { SubCategory } from 'src/app/shared/model/subCategoryModel';
import { SubCategoryService } from 'src/app/shared/service/sub_categoryService';
@Component({
  selector: 'app-admin-add-sub-category',
  templateUrl: './admin-add-sub-category.component.html',
  styleUrls: ['./admin-add-sub-category.component.css']
})
export class AdminAddSubCategoryComponent implements OnInit {


  status = 'create';
  id = null ;
  form: FormGroup;
  categories = [];
  subcategory: SubCategory;
  isLoad = true;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private subCategoryService: SubCategoryService
  ) {
    this.getCategory();
   }

   getCategory() {
     this.categoryService.getAll().subscribe( res => {
       this.categories = res.json();
     });
   }


  ngOnInit() {
    this.form = new FormGroup({
      name_uz: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      name_ru: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      category_id: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoad = false;
        this.status = 'edit';
        this.id = paramMap.get('id');
        this.subCategoryService.getCategory(this.id).subscribe( result => {
            const postData = result.json();
            this.subcategory = {
            id: postData._id,
            name_uz: postData.name_uz,
            name_ru: postData.name_ru,
            category_id: postData.category_id
          };

            this.form.setValue({
            name_uz:   this.subcategory.name_uz,
            name_ru:   this.subcategory.name_ru,
            category_id: this.subcategory.category_id
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
    this.subCategoryService.post(
      this.form.value.name_uz,
      this.form.value.name_ru,
      this.form.value.category_id
    )
    .subscribe( res => {
      if(res) {
          this.form.reset();
          Swal.fire(
            'Good job!',
            'New Sub Category Saved!',
            'success'
          );
          this.router.navigate(['/admin/addSubCategory'])

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
      this.subCategoryService.update(
        this.id,
        this.form.value.name_uz,
        this.form.value.name_ru,
        this.form.value.category_id
        ).subscribe( result => {
          if(result.ok) {
            Swal.fire(
              'Good job!',
              'Change Category successfully',
              'success'
            );
            this.form.reset();
            this.router.navigate(['/admin/subCategory']);
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
