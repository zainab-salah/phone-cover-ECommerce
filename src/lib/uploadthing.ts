import { OurFileRouter } from '@/app/api/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()



  import {
 
    generateUploadDropzone,
  } from "@uploadthing/react";
  
 
 
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  