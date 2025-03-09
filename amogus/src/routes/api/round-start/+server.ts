import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();

        const response = await fetch('https://your-lambda-endpoint.amazonaws.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return json(
                { 
                    success: false, 
                    message: `Failed to process request: ${response.status} ${response.statusText}`, 
                    details: errorText 
                }, 
                { status: response.status }
            );
        }

        const data = await response.json();
        return json({ success: true, message: data.body });
    } catch (error) {
        console.error('Error processing request:', error);
        return json(
            { 
                success: false, 
                message: 'Internal server error', 
                details: error instanceof Error ? error.message : String(error) 
            }, 
            { status: 500 }
        );
    }
};