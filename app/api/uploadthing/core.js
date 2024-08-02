
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImageUploader: f({ image: { maxFileSize: "1MB" } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "jb" };
    }),

  bannerImageUploader: f({ image: { maxFileSize: "2MB" } })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),

  productImageUploader: f({ image: { maxFileSize: "1MB" } })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),
  marketLogoUploader: f({ image: { maxFileSize: "1MB" } })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),
  wholesalerPorfileImage: f({ image: { maxFileSize: "1MB" } })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),
  customerPorfileImage: f({ image: { maxFileSize: "1MB" } })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),
  multipleProductUploader: f({ image: { maxFileSize: "28MB" , maxFileCount: 4} })
  // Set permissions and file types for this FileRoute
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return {uploadedBy: "jb"};
  }),
};