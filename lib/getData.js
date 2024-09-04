export async function getData(endpoint) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/api/${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Log the error response details for further investigation
      const errorDetails = await response.text();
      const error = new Error(`Failed to fetch data: ${response.statusText} - ${errorDetails}`);
      console.error(error);
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}
