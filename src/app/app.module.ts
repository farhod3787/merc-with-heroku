import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgxMaskModule} from 'ngx-mask';

import {
  MatSliderModule ,
  MatInputModule,
  MatButtonModule ,
  MatIconModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './website/home/home.component';
import { NavbarComponent } from './website/navbar/navbar.component';
import { FooterComponent } from './website/footer/footer.component';
import { CatalogComponent } from './website/catalog/catalog.component';
import { AboutComponent } from './website/about/about.component';
import { MagazinComponent} from './website/magazin/magazin.component';
import { GalleryComponent } from './website/gallery/gallery.component';
import { NewsComponent } from './website/news/news.component';
import { CallBackComponent } from './website/call-back/call-back.component';
import { AboutWeComponent } from './website/about-we/about-we.component';
import { AllNewsComponent } from './website/all-news/all-news.component';
import { AllCatalogComponent } from './website/all-catalog/all-catalog.component';
import { ContactComponent } from './website/contact/contact.component';
import { AboutProductComponent } from './website/about-product/about-product.component';
import { ProductsComponent } from './website/products/products.component';
import { SortProductsComponent } from './website/sort-products/sort-products.component';
import { BasketComponent } from './website/basket/basket.component';
import { MotorsComponent } from './website/motors/motors.component';
import { ChassisComponent } from './website/chassis/chassis.component';
import { AccessoryComponent } from './website/accessory/accessory.component';
import { EngineOilComponent } from './website/engine-oil/engine-oil.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminSignComponent } from './admin/admin-sign/admin-sign.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminAddCategoryComponent } from './admin/admin-add-category/admin-add-category.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { AdminAddSubCategoryComponent } from './admin/admin-add-sub-category/admin-add-sub-category.component';
import { LanguageComponent } from './website/language/language.component';
import { AdminContactsComponent } from './admin/admin-contacts/admin-contacts.component';
import { AdminAddNewsComponent } from './admin/admin-add-news/admin-add-news.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { NewAboutComponent } from './website/new-about/new-about.component';
import { PeymentDeleveryComponent } from './website/peyment-delevery/peyment-delevery.component';
import { ConvenientPaymentComponent } from './website/convenient-payment/convenient-payment.component';
import { HelpComponent } from './website/help/help.component';
import { VideoNewsComponent } from './website/video-news/video-news.component';
import { PopularNewsComponent } from './website/popular-news/popular-news.component';
import { DeliveryComponent } from './website/delivery/delivery.component';
import { AdminOrdersWaitingComponent } from './admin/admin-orders-waiting/admin-orders-waiting.component';
import { AdminOrdersSuccessComponent } from './admin/admin-orders-success/admin-orders-success.component';
import { AdminVideoNewsComponent } from './admin/admin-video-news/admin-video-news.component';
import { NotFoundComponent } from './website/not-found/not-found.component';
import { SearchWithIDComponent } from './website/search-with-id/search-with-id.component';
import { TopProductComponent } from './website/top-product/top-product.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CatalogComponent,
    AboutComponent ,
    MagazinComponent,
    GalleryComponent,
    NewsComponent,
    CallBackComponent,
    AboutWeComponent,
    AllNewsComponent,
    AllCatalogComponent,
    ContactComponent,
    AboutProductComponent,
    ProductsComponent,
    SortProductsComponent,
    BasketComponent,
    MotorsComponent,
    ChassisComponent,
    AccessoryComponent,
    EngineOilComponent,
    AdminHomeComponent,
    AdminProductsComponent,
    AdminNavbarComponent,
    AdminSignComponent,
    AdminAddProductComponent,
    AdminCategoriesComponent,
    AdminAddCategoryComponent,
    AdminUsersComponent,
    AdminSubCategoryComponent,
    AdminAddSubCategoryComponent,
    LanguageComponent,
    AdminContactsComponent,
    AdminAddNewsComponent,
    AdminNewsComponent,
    NewAboutComponent,
    PeymentDeleveryComponent,
    ConvenientPaymentComponent,
    HelpComponent,
    VideoNewsComponent,
    PopularNewsComponent,
    DeliveryComponent,
    AdminOrdersWaitingComponent,
    AdminOrdersSuccessComponent,
    AdminVideoNewsComponent,
    NotFoundComponent,
    SearchWithIDComponent,
    TopProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
