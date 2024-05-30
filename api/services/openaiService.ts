import OpenAI from 'openai';
import { config } from '../config/env';

// Initialize the OpenAI client with the API key from the environment configuration
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

// Function to classify the email content and generate a suggested reply
export const classifyAndGenerateReply = async (emailContent: string): Promise<{ classification: string; reply: string }> => {
  // Create a prompt for the completion request
  const prompt = `Classify the email and suggest a reply: ${emailContent}`;

  // Request a completion from the OpenAI API
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 100,
  });

  // Extract the completion text
  const classification = response.choices[0].text.trim();
  let reply = '';

  // Determine the appropriate reply based on the classification
  switch (classification) {
    case 'Interested':
      reply = 'Thank you for your interest! Would you like to schedule a demo?';
      break;
    case 'Not Interested':
      reply = 'Thank you for your time. If you change your mind, please let us know.';
      break;
    case 'More information':
      reply = 'Could you please specify what additional information you need?';
      break;
    default:
      reply = 'Thank you for reaching out!';
      break;
  }

  return { classification, reply };
};
