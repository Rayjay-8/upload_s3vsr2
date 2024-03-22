import { S3Client, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2  = new S3Client({
  // region:"sa-east-1",
  region:"auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ID,
    secretAccessKey: process.env.R2_SECRETE,
    
  }
});


async function getFile(){
  const params = {
    Bucket: "videos-remotion-uploadbyclient",
    Key: "rem222.png",
    ContentType: "image/png",//"video/mp4",
   };

   const command = new GetObjectCommand(params)
   const url = await getSignedUrl(r2, command, {expiresIn: 60})
   return url
}

async function uploadTo(filePath, onProgress) {
  //  const fileStream = fs.createReadStream(filePath);
   const params = {
     Bucket: "videos-remotion-uploadbyclient",
     Key: "rem222.png",
     ContentType: "image/png",//"video/mp4",
    };
    // Body: fileStream,
  
    const command = new PutObjectCommand(params)
    const url = await getSignedUrl(r2, command, {expiresIn: 60})
   return url
 }


 async function init(){
  //  const url = await uploadTo("rempng.png", (e)=>{
  //    console.log("LOG: ", e)
  //  })
  const url = await getFile()
   console.log(url)
 }

 init()
