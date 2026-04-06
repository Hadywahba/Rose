import { About } from '@/lib/types/about/about';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data: About[] = [
      {
        name: 'Hady Wahba',
        email: 'hady@example.com',
        role: 'Frontend Developer',
        phone: '+201010432457',
        address: 'Alexandria, Egypt',
        github: ' https://github.com/Hadywahba  ',
        image: '/images/hady wahba - Frontend developer.jpg',
        linkedin: 'www.linkedin.com/in/hadywahba',
      },
    ];

    return NextResponse.json(data);
  } catch (error) {
    void error;
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
