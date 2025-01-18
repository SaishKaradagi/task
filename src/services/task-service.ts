import { db } from "@/lib/firebase/db";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Task, TaskCreate } from "@/types/task";
import { uploadFileToCloudinary } from "@/lib/cloudinary"; // Assuming you have a cloudinary helper

const COLLECTION = "tasks";

export const taskService = {
  // Create a new task with Cloudinary file upload support
  async createTask(task: TaskCreate, file: File | null): Promise<string> {
    let fileUrl: string | null = null;

    // If there's a file, upload it to Cloudinary
    if (file) {
      fileUrl = await uploadFileToCloudinary(file); // Upload file to Cloudinary
    }

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...task,
      fileUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  },

  // Update an existing task with Cloudinary file update support
  async updateTask(
    id: string,
    task: Partial<Task>,
    file: File | null
  ): Promise<void> {
    let fileUrl: string | null = task.fileUrl;

    // If a new file is provided, upload it to Cloudinary
    if (file) {
      fileUrl = await uploadFileToCloudinary(file); // Upload file to Cloudinary
    }

    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      ...task,
      fileUrl, // Update fileUrl if a new file is uploaded
      updatedAt: new Date().toISOString(),
    });
  },

  // Delete an existing task
  async deleteTask(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Get all tasks for a specific user
  async getUserTasks(userId: string): Promise<Task[]> {
    const q = query(
      collection(db, COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Task)
    );
  },
};

// Helper function to handle Cloudinary upload
async function uploadFileToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // Use your Cloudinary upload preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url; // Return the URL of the uploaded file
}
