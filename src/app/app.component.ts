import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EIM Products';
  productForm: any;
  Isupdating: boolean = false;
  products: any = [];
  imageUrl: string | ArrayBuffer;
  isLoading: boolean = true;
  preventBtn: boolean = false;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getProduct().subscribe((res) => {
      this.products = res.data;
      this.isLoading = false;
    });
    this.form();
  }
  form() {
    this.productForm = new FormGroup({
      _id: new FormControl(),
      prodName: new FormControl('', [Validators.required]),
      prodPrice: new FormControl('', [Validators.required]),
      prodDes: new FormControl('', [Validators.required]),
      prodImage: new FormControl(),
    });
  }

  openModal(action, prod) {
    this.preventBtn = false;
    if (action === 'update') {
      this.Isupdating = true;
      this.productForm.patchValue({
        _id: prod._id,
        prodName: prod.prodName,
        prodPrice: prod.prodPrice,
        prodDes: prod.prodDes,
        prodImage: prod.prodImage,
      });
    } else if (action === 'delete') {
      this.Isupdating = false;
      this.isLoading = true;
      this.appService.deleteProduct(prod._id).subscribe((res) => {
        this.ngOnInit();
      });
    } else {
      this.Isupdating = false;
    }
  }

  onSubmit() {
    this.preventBtn = true;
    this.productForm.patchValue({
      prodImage: this.imageUrl,
    });
    let product = this.productForm.value;
    if (this.Isupdating) {
      this.isLoading = true;
      $('#addModal').modal('hide');
      this.appService.updateProduct(product).subscribe((res) => {
        this.ngOnInit();
      });
    } else {
      this.isLoading = true;
      $('#addModal').modal('hide');
      this.appService.createProduct(product).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  getBase64($event) {
    let file = $event.target.files[0];
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let data = reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        this.imageUrl = reader.result;
      };
      reader.onerror = (error) => reject(error);
    });
  }
}
