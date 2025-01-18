// src/lib/firebase/storage.ts
// src/lib/cloudinary/storage.ts

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/your_cloud_name/upload";
const UPLOAD_PRESET = "your_upload_preset"; // Define the upload preset you configured in Cloudinary

export async function uploadFileToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET); // Cloudinary preset
  formData.append("cloud_name", "your_cloud_name"); // Cloud name

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary file upload failed");
  }

  const data = await response.json();
  return data.secure_url; // Returns the URL of the uploaded file
}
