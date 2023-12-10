import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Page from '../app/page';

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: 'user_xyz' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_xyz',
        fullName: 'Test Test',
      },
    }),
  };

  return mockedFunctions;
});

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  };
});

test(`Home`, async () => {
  render(await Page());
  expect(screen.getByText('Login')).toBeTruthy();
});
