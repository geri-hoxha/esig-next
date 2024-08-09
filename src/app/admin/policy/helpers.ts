// Function to get query parameters from the current URL
export function getQueryParams() {
    // Get current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Create an object to store the query parameters
    const queryParams: { [key: string]: string } = {};

    // Iterate over the search parameters and populate the queryParams object
    for (const [key, value] of searchParams?.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}

// Function to push query parameters to the current URL
export function pushQueryParams(params: any) {
    // Get current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Append or set the provided parameters
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            searchParams.set(key, params[key]);
        }
    }

    // Update the URL with the new parameters
    url.search = searchParams.toString();
    window.history.pushState({ path: url.href }, "", url.href);
}

export function removeQueryParam(paramKey: string) {
    // Get current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Remove the specified parameter
    searchParams.delete(paramKey);

    // Update the URL with the new parameters
    url.search = searchParams.toString();
    const newUrl = url.toString();

    // Replace the current URL with the new URL
    window.history.replaceState({ path: newUrl }, "", newUrl);
}

// Define the decorator
export const withErrorHandling = (fn:(...args:any) =>  void | Promise<void>, throwError:boolean = true) => {
    return async function(...args:any) {
      try {
        return await fn(...args);
      } catch (error) {
        
        console.log(error);
        
        // Throw this error if the parent function needs to know, for ex: stop execution
        if(throwError) {
          throw error;
        }
        return; // or some default value
      }
    };
  };