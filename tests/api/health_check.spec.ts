import { test, expect } from '@playwright/test';

test.describe('API Health Check', () => {

  test('should return 200 OK for the main landing page', async ({ request }) => {
    const response = await request.get('/');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should return HTML content type', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    expect(headers['content-type']).toContain('text/html');
  });
});