
'use client';

// import { API_ERRORS } from '@/constants/api-errors';
// import { LOGIN_PAGE } from '@/constants/pages';
// import { manageErrors } from '@/lib/manage-errors';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';
import { QueryClientProvider as QCProvider, QueryClient } from 'react-query';
// import { useAuthStore } from '@/hooks/store';
// import { signOut } from 'next-auth/react';
import { ReactQueryDevtools } from 'react-query/devtools';

export const QueryClientProvider: FC<any> = ({ children }) => {
  const router = useRouter();
//   const { revoke } = useAuthStore();

  const onRequestError = useCallback((error: any) => {
    const { response } = error;
    const data = response?.data as any;

    if (response?.status === 401 && data?.code === "unauthorized") {
    //   revoke();
    //   signOut();
    router.push("/login")
      return;
    }

  }, []);

  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            onError: onRequestError,
            retry: false,
          },
          mutations: {
            onError: onRequestError,
          },
        },
      }),
    []
  );

  return (
    <QCProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QCProvider>
  );
};
