import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

const eventsFilePath = path.resolve(process.cwd(), 'data/events.json');

export const PUT: APIRoute = async ({ request, cookies, params }) => {
  const userId = cookies.get('user_id')?.value;
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { eventId } = params;
  let updatedEventData;
  try {
    updatedEventData = await request.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ message: 'Invalid JSON in request body' }), { status: 400 });
  }

  const eventsData = await fs.readFile(eventsFilePath, 'utf-8');
  const events = JSON.parse(eventsData);

  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex === -1) {
    return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
  }

  if (events[eventIndex].userId !== userId) {
    return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
  }

  // A simple merge, not deep. The form data is structured to match the event object.
  events[eventIndex] = { ...events[eventIndex], ...updatedEventData };

  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));

  return new Response(JSON.stringify({ message: 'Event updated successfully' }), { status: 200 });
};
