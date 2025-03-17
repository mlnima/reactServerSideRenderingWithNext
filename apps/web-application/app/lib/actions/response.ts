export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | unknown;
}

export function unwrapResponse<T>(
  response: ServerActionResponse<T>
): { success: boolean; data?: T; message?: string; error?: string | unknown } & T {
  const { success, message, error } = response;
  const data = response.data || {} as T;

  return {
    success,
    message,
    error,
    ...data as T
  };
}

export const successResponse = <T>({ data, message }: { data?: T, message?: string }): ServerActionResponse<T> => ({
  success: true,
  data,
  message: message || 'Request successful',
});

export const errorResponse = ({ message, error }: {
  message?: string,
  error?: unknown
}): ServerActionResponse<null> => ({
  success: false,
  message,
  error: error instanceof Error ? error.message : error, // Only include error details if necessary
});