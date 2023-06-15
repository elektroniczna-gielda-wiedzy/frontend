import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  async getBase64Image(image: { blob: () => any }) {
    
    const blob = await image.blob();
    const reader = new FileReader();

    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return reader.result;
    
  }

  async getImage(url: string) {
    const headers = {
      Authorization: TokenService.getToken(),
    };
    
    return fetch(url, { headers })
      .then(this.getBase64Image)
      .then((base64Image: any) => {
        return base64Image;
      });
  }
}
