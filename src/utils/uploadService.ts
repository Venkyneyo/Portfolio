import { supabase } from './supabaseClient';
import { localApi } from './localApi';

export const uploadService = {
  /**
   * Upload a file. If Supabase is not available or local mode is enabled, it uploads to the local Express backend.
   * @param file The file object to upload
   * @param folder Optional subfolder path inside bucket
   * @returns Public URL of the uploaded asset
   */
  async uploadFile(file: File, folder: string = 'assets'): Promise<string> {
    // If Supabase keys are missing or offline mode is running, fall back to local Express server upload
    if (!supabase) {
      console.log('Supabase keys missing. Performing local Express upload...');
      try {
        const localUrl = await localApi.uploadFile(file);
        // Prepend host URL if necessary, or return relative path which Vite proxies
        return localUrl;
      } catch (err) {
        console.error('Local Express upload failed:', err);
        throw new Error('Local upload failed. Please verify that your Express backend is running on port 5000.');
      }
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    const bucketName = 'portfolio-media';

    // Upload to Supabase bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Fetch public URL
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      throw new Error('Failed to retrieve public URL from Supabase Storage.');
    }

    return data.publicUrl;
  }
};
