import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Initialize Lambda client
const lambda = new LambdaClient({
    region: 'us-east-1' // Change to your Lambda's region
});

export const POST = async ({ request }: RequestEvent) => {
    try {
        const body = await request.json();
        
        const command = new InvokeCommand({
            FunctionName: 'amogus-lambda',  // Replace with your Lambda function name
            Payload: Buffer.from(JSON.stringify({ emails: body.emails }))
        });
        
        const response = await lambda.send(command);
        
        if (response.StatusCode === 200 && response.Payload) {
            const payloadString = Buffer.from(response.Payload).toString();
            const result = JSON.parse(payloadString);
            
            if (result.errorMessage) {
                console.error('Lambda execution error:', result.errorMessage);
                return json({ 
                    success: false, 
                    message: 'Lambda execution failed', 
                    error: result.errorMessage 
                }, { status: 500 });
            }
            
            return json({ 
                success: true, 
                message: result.body 
            });
        } else {
            console.error('Lambda invocation failed:', response);
            return json({ 
                success: false, 
                message: 'Failed to send emails', 
                statusCode: response.StatusCode 
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error calling Lambda:', error);
        return json({ 
            success: false, 
            message: 'Internal server error', 
            error: error instanceof Error ? error.message : String(error) 
        }, { status: 500 });
    }
};