import ImageKit from 'imagekit';
import config from '@/lib/config';
import { NextResponse } from 'next/server';

const {
  env: {
    imagekit: { urlEndpoint, publicKey, privateKey },
  },
} = config;

const imagekit = new ImageKit({
  publicKey: publicKey!,
  privateKey: privateKey!,
  urlEndpoint: urlEndpoint!,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
