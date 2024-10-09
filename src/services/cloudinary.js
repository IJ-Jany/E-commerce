import { v2 as cloudinary } from 'cloudinary';
import {unlinkSync} from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: 'dl1s6fzaz', 
        api_key: '956799847513382', 
        api_secret: '5Z8fcqAZWjEeOMVKC3C6zHPLT34' // Click 'View API Keys' above to copy your API secret
    });
   export  const cloudinaryUpload = async (path, public_id, folder) => {
  let uploadResult;
  try {
    uploadResult = await cloudinary.uploader
     .upload(path, {
             public_id,
             folder
         }
     )
     unlinkSync(path)
  } catch (error) {
    unlinkSync(path)
    console.error("Upload Error", error);
    return {error: 'Upload failed' , uploadResult:null};
  }
      
  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto'
  });
  
  console.log(optimizeUrl);
  
  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
  });
  
 return (optimizeUrl, autoCropUrl, uploadResult)

    }