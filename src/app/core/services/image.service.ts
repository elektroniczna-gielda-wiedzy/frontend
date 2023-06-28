import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  baseUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient) {}

  private async getBase64Image(blob: Blob) {
    const reader = new FileReader();

    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return reader.result?.toString();
  }

  async getImage(url: string) {
    const headers = {
      Authorization: TokenService.getToken(),
    };
    url = `${this.baseUrl}/${url}`;

    return new Promise((resolve: (value?: string) => any) => {
      this.http
        .get(url, { headers, responseType: 'blob' })
        .subscribe(async (res) => {
          resolve(await this.getBase64Image(res));
        });
    });
  }
}
