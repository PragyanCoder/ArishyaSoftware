import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const MERCHANT_ID = '8SKBAV-VYF86F-7VP1MZ-LXEEG2';
const PAYOUT_API_KEY = 'G9PXG9-XB1W57-NB794S-D8S5CH';
const API_URL = 'https://api.oxapay.com';

// Helper Functions
function generateSignature(data: any, apiKey: string): string {
  const sortedParams = Object.keys(data)
    .sort()
    .reduce((acc, key) => {
      if (data[key] !== undefined && data[key] !== null) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as any);

  const signString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}:${value}`)
    .join('|');

  return CryptoJS.HmacSHA256(signString, apiKey).toString();
}

function generateNonce(): string {
  return Math.random().toString(36).substring(7);
}

function getBaseUrl(): string {
  // Check if we're in production (custom domain)
  if (window.location.hostname === 'arishya.software') {
    return 'https://arishya.software';
  }
  // For Netlify deployments
  if (window.location.hostname.includes('netlify.app')) {
    return window.location.origin;
  }
  return window.location.origin;
}

// Main API Functions
export async function createPayment({
  amount,
  currency = 'USD',
  order_id,
  email,
  description
}: {
  amount: number;
  currency: string;
  order_id: string;
  email: string;
  description?: string;
}) {
  try {
    const baseUrl = getBaseUrl();
    const data = {
      merchant: MERCHANT_ID,
      amount: amount.toFixed(2),
      currency,
      order_id,
      email,
      description: description || `Payment for Order #${order_id}`,
      callback_url: `${baseUrl}/payment/callback`,
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const sign = generateSignature(data, MERCHANT_ID);
    
    const response = await axios.post(`${API_URL}/merchants/request`, {
      ...data,
      sign
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Payment creation failed');
    }

    return response.data;
  } catch (error: any) {
    console.error('Payment creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create payment');
  }
}

export function generateOrderId(): string {
  return uuidv4().substring(0, 8).toUpperCase();
}