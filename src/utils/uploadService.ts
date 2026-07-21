import { supabase } from './supabaseClient';

export const uploadService = {
  /**
   * Upload a file to the 'portfolio-media' Supabase storage bucket
   * @param file The file object to upload
   * @param folder Optional subfolder path inside bucket (e.g. 'screenshots', 'resumes', 'profiles')
   * @returns Public URL of the uploaded asset
   */
  async uploadFile(file: File, folder: string = 'assets'): Promise<string> {
    if (!supabase) {
      throw new Error('Supabase is not configured. Upload is disabled in offline mode.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    const bucketName = 'portfolio-media';

    // 1. Upload to bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // 2. Fetch public URL
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      throw new Error('Failed to retrieve public URL for uploaded file.');
    }

    return data.publicUrl;
  }
};
