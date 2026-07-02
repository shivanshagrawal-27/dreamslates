export interface ImageGenerationOptions {
  prompt: string;
  aspectRatio: '9:16' | '16:9' | '1:1' | '21:9';
  quality?: 'standard' | 'hd';
}

export interface ImageProvider {
  name: string;
  isEnabled(customKey?: string): boolean;
  generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string>;
}
