/** 공통 fetch 로직 */
export async function fetchWithErrorHandling(url: string, params: unknown) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const errorData = await response.json();

  if (!response.ok) {
    throw new Error(errorData.message || 'Server Error: Failed to generate question');
  }
  return errorData;
}
