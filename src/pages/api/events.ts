import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const eventsFilePath = path.resolve(process.cwd(), 'data/events.json');

export const POST: APIRoute = async ({ request, cookies }) => {
  const userId = cookies.get('user_id')?.value;
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  let name, slug;
  try {
    ({ name, slug } = await request.json());
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ message: 'Invalid JSON in request body' }), { status: 400 });
  }

  if (!name || !slug) {
    return new Response(JSON.stringify({ message: 'Name and slug are required' }), { status: 400 });
  }

  const eventsData = await fs.readFile(eventsFilePath, 'utf-8');
  const events = JSON.parse(eventsData);

  const existingEvent = events.find(event => event.slug === slug);
  if (existingEvent) {
    return new Response(JSON.stringify({ message: 'Event slug already exists' }), { status: 409 });
  }

  const newEvent = { 
    id: Date.now().toString(), 
    userId, 
    name, 
    slug,
    // Adding default values for the rest of the event data schema
    "logo": {
        "url": "",
        "width": 100,
        "height": 100
    },
    "font": {
        "name": "Roboto",
        "url": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
    },
    "colors": {
        "primary": "#000000",
        "secondary": "#FFFFFF",
        "accent": "#FF0000"
    },
    "seating": {
        "tables": []
    },
    "guests": []
  };
  events.push(newEvent);

  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));

  return new Response(JSON.stringify({ message: 'Event created successfully' }), { status: 201 });
};
