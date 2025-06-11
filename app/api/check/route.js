import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Get the address from the URL query parameter
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Normalize the address (convert to lowercase for case-insensitive comparison)
    const normalizedAddress = address.toLowerCase();

    // Read the whitelist file
    const whitelistPath = path.join(process.cwd(), 'data/whitelist.txt');
    const whitelistData = fs.readFileSync(whitelistPath, 'utf8');

    // Split by new line and clean each address (remove spaces)
    const whitelistedAddresses = whitelistData
      .split('\n')
      .map((addr) => addr.trim().toLowerCase())
      .filter((addr) => addr !== ''); // Remove empty lines

    // Check if the address is in the whitelist
    const isWhitelisted = whitelistedAddresses.includes(normalizedAddress);

    return NextResponse.json({
      address: address,
      isWhitelisted: isWhitelisted
    });
  } catch (error) {
    console.error('Error checking whitelist address:', error);
    return NextResponse.json(
      { error: 'Failed to check address whitelist status' },
      { status: 500 }
    );
  }
}
