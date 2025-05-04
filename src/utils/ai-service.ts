
// This is a utility file for making AI API requests

export async function fetchAIResponse(question: string, apiKey: string): Promise<string> {
  try {
    // If no API key is provided, throw an error
    if (!apiKey) {
      throw new Error('API key is required to get AI responses');
    }

    // Make the actual API call to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful study assistant that provides clear, concise answers to academic questions.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.5,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response from Groq API:', errorData);
      throw new Error(`Groq API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw new Error('Failed to get AI response: ' + (error instanceof Error ? error.message : String(error)));
  }
}
