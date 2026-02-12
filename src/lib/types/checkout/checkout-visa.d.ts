export interface VisaCheckoutResponse {
  session: StripeCheckoutSession;
}

export interface StripeCheckoutSession {
  id: string;
  object: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: 'unpaid' | 'paid' | 'no_payment_required';
  status: 'open' | 'complete' | 'expired';
  mode: 'payment' | 'subscription' | 'setup';
  success_url: string;
  cancel_url: string;
  url: string;
  created: number;
  expires_at: number;
  customer_email: string | null;
  customer_details: StripeCustomerDetails;
  metadata: Record<string, string>;
  payment_method_types: string[];
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  branding_settings?: {
    background_color?: string;
    button_color?: string;
    display_name?: string;
    font_family?: string;
    icon?: { file: string; type: string };
    logo?: { file: string; type: string };
  };
}

export interface StripeCustomerDetails {
  email: string | null;
  name: string | null;
  phone: string | null;
  address: null | {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}
