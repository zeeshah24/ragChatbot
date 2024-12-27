const API_BASE_URL = 'http://localhost:8000/api';

export async function sendMessage(content: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from AI');
  }

  const data = await response.json();
  return data.content;
}