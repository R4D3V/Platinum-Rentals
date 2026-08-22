import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<Response>((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "ninety-nine-property-consultants" },
      (error, result) => {
        if (error) {
          resolve(
            NextResponse.json({ error: error.message }, { status: 500 }),
          );
        } else {
          resolve(NextResponse.json({ url: result!.secure_url }));
        }
      },
    );
    uploadStream.end(buffer);
  });
}
