import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const usersFilePath = path.resolve(process.cwd(), 'data/users.json');

export const POST: APIRoute = async ({ request, cookies }) => {
  let email, password;
  try {
    ({ email, password } = await request.json());
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ message: 'Invalid JSON in request body' }), { status: 400 });
  }

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
  }

  const usersData = await fs.readFile(usersFilePath, 'utf-8');
  const users = JSON.parse(usersData);

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // Set a simple session cookie
  cookies.set('user_id', user.id, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  return new Response(JSON.stringify({ message: 'Logged in successfully' }), { status: 200 });
};
