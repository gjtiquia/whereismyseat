import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const eventsFilePath = path.resolve(process.cwd(), 'data/events.json');

export const GET: APIRoute = async ({ params }) => {
  const { eventSlug } = params;

  if (!eventSlug) {
    return new Response(JSON.stringify({ message: 'Event slug is required' }), { status: 400 });
  }

  try {
    const eventsData = await fs.readFile(eventsFilePath, 'utf-8');
    const events = JSON.parse(eventsData);
    const event = events.find(e => e.slug === eventSlug);

    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};
