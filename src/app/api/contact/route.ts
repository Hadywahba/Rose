import { ContactInfo } from '@/lib/types/contact/contact';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data: ContactInfo = {
      name: 'Hady Wahba',
      email: 'hadywahba19@gmail.com',
      role: 'Frontend Developer',
      phone: '+201010432457',
      address: 'Alexandria, Egypt',
      github: 'https://github.com/Hadywahba',
      portfolio: 'https://portfolio-six-lyart-57.vercel.app',
      linkedin: 'https://www.linkedin.com/in/hadywahba/',
    };

    return NextResponse.json(data);
  } catch (error) {
    void error;
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
