import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const usersFilePath = path.resolve(process.cwd(), 'data/users.json');

export const POST: APIRoute = async ({ request }) => {
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

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
  }

  const newUser = { id: Date.now().toString(), email, password };
  users.push(newUser);

  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

  return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
};
