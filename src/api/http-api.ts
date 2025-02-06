import axios from 'axios';

const API_BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'Zgzj0uk2abhWTnFDfhUj5I9C1L4TilX21NNAZ0npar4';

export interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    portfolio_url?: string;
  };
}

export interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<UnsplashResponse> => {
  try {
    const response = await axios.get<UnsplashResponse>(
      `${API_BASE_URL}/search/photos`,
      {
        params: {
          query,
          page,
          per_page: 12,
          client_id: ACCESS_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', (error as Error).message);
    throw new Error('Failed to fetch images. Please try again later.');
  }
};
