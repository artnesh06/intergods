// File: app/api/getWizardFiles/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    // Path to the wizard images directory
    const wizardDir = path.join(process.cwd(), 'public', 'images', 'wizards');

    // Read all files in the directory
    const files = await fs.readdir(wizardDir);

    // Filter only image files
    const imageFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(
        extension
      );
    });

    // Sort files naturally (so "10" comes after "9" instead of after "1")
    imageFiles.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/) || '0');
      const numB = parseInt(b.match(/\d+/) || '0');
      return numA - numB;
    });

    return NextResponse.json({ files: imageFiles });
  } catch (error) {
    console.error('Error reading wizard files:', error);
    return NextResponse.json(
      { error: 'Failed to read wizard files', message: error.message },
      { status: 500 }
    );
  }
}
