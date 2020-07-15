import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/categoryService';
import { ProductService } from 'src/app/shared/service/productsService';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/productModel';
import Swal from 'sweetalert2';
import { SubCategoryService } from 'src/app/shared/service/sub_categoryService';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  status = 'create';
  id = null ;
  imagePreview: any;
  form: FormGroup;
  categories = [];
  subcategories = [];
  product: Product;
  image;
  isLoad = true;
  imageview = true;
  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router


  ) {
    this.getCategories();
   }

  ngOnInit() {
    this.form = new FormGroup({
      name_uz: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      name_ru: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description_uz: new FormControl(null, { validators: [Validators.required] }),
      description_ru: new FormControl(null, { validators: [Validators.required] }),
      id_number: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      category_id: new FormControl(null, { validators: [Validators.required] }),
      subcategory_id: new FormControl(null, { validators: [Validators.required] }),
      quantity: new FormControl(null, { validators: [Validators.required] }),
      brand: new FormControl(null, { validators: [Validators.required] }),
      model: new FormControl(null, { validators: [Validators.required] }),
      configuration: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      sale: new FormControl(null, { validators: [Validators.required] }),
      rating: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoad = false;
        this.status = 'edit';
        this.id = paramMap.get('id');
        this.productService.getProduct(this.id).subscribe( result => {
            const postData = result.json();
            this.image = postData.image_original_name;
            this.imageview = false;
            this.product = {
            id: postData._id,
            name_uz: postData.name_uz,
            name_ru: postData.name_ru,
            description_uz: postData.description_uz,
            description_ru: postData.description_ru,
            id_number: postData.id_number,
            image_original_name: postData.image_original_name,
            category_id: postData.category_id,
            subcategory_id: postData.subcategory_id,
            quantity: postData.quantity,
            brand: postData.brand,
            model: postData.model,
            configuration: postData.configuration,
            price: postData.price,
            sale: postData.sale,
            rating: postData.rating
          };
            this.form.setValue({
            name_uz:   this.product.name_uz,
            name_ru:   this.product.name_ru,
            description_uz:  this.product.description_uz,
            description_ru:   this.product.description_ru,
            id_number: this.product.id_number,
            image:   this.product.image_original_name,
            category_id:  this.product.category_id,
            subcategory_id:  this.product.subcategory_id,
            quantity:   this.product.quantity,
            brand:  this.product.brand,
            model:   this.product.model,
            configuration:  this.product.configuration,
            price:   this.product.price,
            sale: this.product.sale,
            rating: this.product.rating
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
      this.productService.post(
        this.form.value.name_uz,
        this.form.value.name_ru,
        this.form.value.description_uz,
        this.form.value.description_ru,
        this.form.value.id_number,
        this.form.value.image,
        this.form.value.category_id,
        this.form.value.subcategory_id,
        this.form.value.quantity,
        this.form.value.brand,
        this.form.value.model,
        this.form.value.configuration,
        this.form.value.price,
        this.form.value.sale,
        this.form.value.rating
      )
      .subscribe( res => {
          if (res) {
            // this.form.reset();
            Swal.fire(
              'Good job!',
              'New Product Saved!',
              'success'
            );
            // this.router.navigate(['/admin/products']);

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error in Save New Product',
              timer: 3000
            });
          }
      });
    } else {
        this.productService.update(
          this.id,
          this.form.value.name_uz,
          this.form.value.name_ru,
          this.form.value.description_uz,
          this.form.value.description_ru,
          this.form.value.id_number,
          this.form.value.image,
          this.form.value.category_id,
          this.form.value.subcategory_id,
          this.form.value.quantity,
          this.form.value.brand,
          this.form.value.model,
          this.form.value.configuration,
          this.form.value.price,
          this.form.value.sale,
          this.form.value.rating

          ).subscribe( result => {
            if (result.ok) {
              Swal.fire(
                'Good job!',
                'Change Product successfully',
                'success'
              );
              this.form.reset();
              this.router.navigate(['/admin/products']);
            }  else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error in Update Product',
                timer: 3000
              });
            }
          });

    }

  }

  getCategories() {
    this.categoryService.getAll().subscribe( res => {
      this.categories = res.json();
    });
  }

  selectCat(id) {
    this.subcategoryService.getSelected(id).subscribe( res => {
      this.subcategories = res.json();
    });
  }


  onInputChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader()  ;
    reader.onload = () => {
    this.imagePreview = reader.result;                   // rasm tanlanganda ko'rsatish
    this.imageview = true;
    };
    reader.readAsDataURL(file);
  }

}
