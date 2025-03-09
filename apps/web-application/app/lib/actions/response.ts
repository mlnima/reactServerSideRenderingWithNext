export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | unknown;
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