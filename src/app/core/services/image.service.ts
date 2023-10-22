import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  baseUrl = environment.serverUrl;
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
    url = `${this.baseUrl}${url}`;

    return new Promise((resolve: (value?: string) => any) => {
      this.http
        .get(url, { headers, responseType: 'blob' })
        .subscribe(async (res) => {
          resolve(await this.getBase64Image(res));
        });
    });
  }

  async readImageFile(event: any) {
    const max_size = 20971520;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 15200;
    const max_width = 25600;
    const selectedFile = event.target.files[0] ?? null;

    return new Promise<any>((resolve, reject) => {
      if (!selectedFile) {
        reject('No file selected');
      }
      if (selectedFile.size > max_size) {
        reject('Maximum size allowed is ' + max_size / 1000 + 'Mb');
      }
      if (allowed_types.indexOf(selectedFile.type) === -1) {
        reject('Only Images are allowed ( JPG | PNG )');
      }

      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const imgBase64 = e.target.result;
        const filename = selectedFile?.name ?? '';
        resolve({
          filename,
          imgBase64,
        });
      };

      fileReader.readAsDataURL(selectedFile);
    });
  }
}
