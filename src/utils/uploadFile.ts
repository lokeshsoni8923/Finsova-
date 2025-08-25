export interface UploadResponse {
    success: boolean;
    filePath?: string;
    error?: string;
  }
  
  export async function uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  
    return res.json();
  }
  