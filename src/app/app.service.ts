import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'http://localhost:3000/eim/product';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(map((res) => res));
  }
  createProduct(newProd): Observable<any> {
    return this.http.post(`${this.url}/new`, newProd);
  }
  updateProduct(updateProd): Observable<any> {
    return this.http.put(`${this.url}/${updateProd._id}`, updateProd);
  }
  deleteProduct(prod_id): Observable<any> {
    return this.http.delete(`${this.url}/${prod_id}`);
  }
}
