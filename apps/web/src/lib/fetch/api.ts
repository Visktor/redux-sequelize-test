const apiDefaults: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

async function get<T = unknown>(
  url: string,
  reqConfig?: RequestInit,
): Promise<
  { success: true; data: Promise<T> } | { success: false; error: unknown }
> {
  return fetch(url, {
    method: "GET",
    ...apiDefaults,
    ...reqConfig,
  })
    .then((response) => {
      const data = response.json() as Promise<T>;
      return {
        success: true,
        data,
      } as const;
    })
    .catch((error) => {
      console.error(
        `GET request error | URL: ${url}. Error: `,
        error instanceof Error ? error.message : error,
      );

      return {
        success: false,
        error: error,
      } as const;
    });
}

async function post<T = unknown>(
  url: string,
  body: BodyInit,
  reqConfig?: RequestInit,
): Promise<
  { success: true; data: Promise<T> } | { success: false; error: unknown }
> {
  return fetch(url, {
    method: "POST",
    body,
    ...apiDefaults,
    ...reqConfig,
  })
    .then((response) => {
      const data = response.json() as Promise<T>;
      return {
        success: true,
        data,
      } as const;
    })
    .catch((error) => {
      console.error(
        `POST request error | URL: ${url}. Error: `,
        error instanceof Error ? error.message : error,
      );

      return {
        success: false,
        error: error,
      };
    });
}

async function put<T = unknown>(
  url: string,
  body: BodyInit,
  reqConfig?: RequestInit,
): Promise<
  { success: true; data: Promise<T> } | { success: false; error: unknown }
> {
  return fetch(url, {
    method: "PUT",
    body,
    ...apiDefaults,
    ...reqConfig,
  })
    .then((response) => {
      const data = response.json() as Promise<T>;
      return {
        success: true,
        data,
      } as const;
    })
    .catch((error) => {
      console.error(
        `PUT request error | URL: ${url}. Error: `,
        error instanceof Error ? error.message : error,
      );

      return {
        success: false,
        error: error,
      };
    });
}

async function del<T = unknown>(
  url: string,
  reqConfig?: RequestInit,
): Promise<
  { success: true; data: Promise<T> } | { success: false; error: unknown }
> {
  return fetch(url, {
    method: "DELETE",
    ...apiDefaults,
    ...reqConfig,
  })
    .then((response) => {
      const data = response.json() as Promise<T>;
      return {
        success: true,
        data,
      } as const;
    })
    .catch((error) => {
      console.error(
        `DELETE request error | URL: ${url}. Error: `,
        error instanceof Error ? error.message : error,
      );

      return {
        success: false,
        error: error,
      };
    });
}

const appFetch = { get, post, put, delete: del };

export { appFetch };
