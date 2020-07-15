import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { News } from 'src/app/shared/model/newsModel';
import { News_Service } from 'src/app/shared/service/news_Service';

@Component({
  selector: 'app-admin-add-news',
  templateUrl: './admin-add-news.component.html',
  styleUrls: ['./admin-add-news.component.css']
})
export class AdminAddNewsComponent implements OnInit {

  status = 'create';
  id = null ;
  imagePreview: any;
  form: FormGroup;
  categories = [];
  subcategories = [];
  news: News;
  image;
  isLoad = true;
  imageview = true;

  constructor(
    private newsService: News_Service,
    // private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.form = new FormGroup({
      name_uz: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      name_ru: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description_uz: new FormControl(null, { validators: [Validators.required] }),
      description_ru: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoad = false;
        this.status = 'edit';
        this.id = paramMap.get('id');
        this.newsService.getNews(this.id).subscribe( result => {
            const postData = result.json();
            this.image = postData.image_original_name;
            this.imageview = false;

            this.news = {
            id: postData._id,
            name_uz: postData.name_uz,
            name_ru: postData.name_ru,
            description_uz: postData.description_uz,
            description_ru: postData.description_ru,
            image_original_name: postData.image_original_name
          };
            this.form.setValue({
            name_uz:   this.news.name_uz,
            name_ru:   this.news.name_ru,
            description_uz:  this.news.description_uz,
            description_ru:   this.news.description_ru,
            image:   this.news.image_original_name,
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
      this.newsService.post(
        this.form.value.name_uz,
        this.form.value.name_ru,
        this.form.value.description_uz,
        this.form.value.description_ru,
        this.form.value.image
      )
      .subscribe( res => {
          if (res) {
            this.form.reset();
            Swal.fire(
              'Good job!',
              'New News Saved!',
              'success'
            );
            this.router.navigate(['/admin/news']);

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
        this.newsService.update(
          this.id,
          this.form.value.name_uz,
          this.form.value.name_ru,
          this.form.value.description_uz,
          this.form.value.description_ru,
          this.form.value.image
          ).subscribe( result => {
            if (result.ok) {
              Swal.fire(
                'Good job!',
                'Change News successfully',
                'success'
              );
              this.form.reset();
              this.router.navigate(['/admin/news']);
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
