'use client';
import config from '@/lib/config';
import { toast } from "sonner"
import {
  ImageKitContext,
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
} from 'imagekitio-next';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

const authenticator = async () => {
  try {
    // Use relative URL to work on both localhost and Vercel
    const response = await fetch('/api/auth/imagekit');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch authentication parameters: ${errorText}`
      );
    }

    const data = await response.json();
    const { token, expire, signature } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication Error: ${error.message}`);
  }
};

const {
  env: {
    imagekit: { urlEndpoint, publicKey, privateKey },
  },
} = config;

const imageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    toast(`Error during upload: ${err.message}`);
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast(`${res.filePath} uploaded successfully!`);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey!}
      urlEndpoint={urlEndpoint!}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button className="upload-btn" onClick= {(e) => {e.preventDefault();

        if(ikUploadRef.current) { ikUploadRef.current?.click() }
        }}>
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>

         {file && <p className='upload-filename'>{file.filePath}    </p>}
      </button>

      {file && ( <IKImage alt={file.filePath} path={file.filePath} width={500} height={300}/> )}

    </ImageKitProvider>
  );
};

export default imageUpload;
