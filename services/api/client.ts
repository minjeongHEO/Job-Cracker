/** 공통 fetch 로직 */
export async function fetchWithErrorHandling(url: string, params: unknown) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Error:', errorData);
      throw new Error(errorData.error || 'Failed to generate question');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
