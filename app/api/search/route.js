// app/api/search/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
