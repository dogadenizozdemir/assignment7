# Assignment 7 - E-commerce App

## File Organization
The project follows a modular structure inside the `src` directory:
- `api/`: Contains isolated fetch logic for products and mock authentication.
- `components/`: Reusable UI parts like NavBar, ProductCard, Layout, and ProtectedRoute.
- `context/`: Houses the AuthContext using useReducer for global user state.
- `hooks/`: Custom hooks (`useFetch`, `useLocalStorage`) for reusable component logic.
- `pages/`: Main route components (Home, ProductList, ProductDetail, Cart, Login, NotFound).
- `store/`: Zustand setup for complex, frequently changing cart state.

## 10. Reasoning Questions

**1. State choices:** 
The signed-in user lives in Context because it's a global state that rarely changes. The cart lives in a Zustand store due to its frequent updates and complex mutating actions. Filter values live in the URL search parameters so the filtered view can be easily shared via a link. The product list is managed locally via a custom hook, and the theme is stored in `localStorage` so it survives page reloads.

**2. Context versus store:** 
Context is ideal for the signed-in user because it rarely changes, avoiding unnecessary re-renders across the app. If the cart were in Context, every component consuming it would re-render on every minor cart update, which becomes less efficient. Zustand optimizes this by allowing components to select only the specific state slices they need without triggering global re-renders.

**3. Custom hooks:** 
The `useFetch` hook shares the asynchronous loading pattern, `AbortSignal` implementation, and the `loading`, `error`, and `data` state management between `ProductList` and `ProductDetail`. It deliberately does *not* share the actual fetched data itself; each component instance triggers its own independent API call and maintains its own local state.

**4. Route parameters:** 
The `id` read from the URL in `ProductDetail` is initially a string type. It mattered in my code when generating the "Next Product" link, where I had to explicitly convert it to a Number (`Number(id) + 1`) to prevent string concatenation.

**5. Protected routes:** 
Client-side protection via `ProtectedRoute` is a user-experience feature, not real security, because client code can always be inspected or bypassed by a determined user in the browser. To make it secure, a real backend server must validate authentication tokens on every API request and restrict access to sensitive data at the server level.

**6. Deep links:** 
If deployed on a plain static file server, reloading `/products/3` would result in a 404 error because the server would physically look for a directory named `products` and a file named `3`. It works on the Vite development server because it is configured as a Single Page Application (SPA) server, which redirects all unknown requests back to `index.html` so React Router can handle them.

## Notes on Self-Study Items
- **Updating one query-string parameter:** I used the `URLSearchParams` object to safely `.set()` or `.delete()` specific keys (like 'q' or 'category') based on user input, and then passed the updated object to `setSearchParams` to preserve other existing parameters.
- **Initialising store state from localStorage:** I added a `try-catch` block during the initial state setup in the Zustand store. If `JSON.parse` fails due to corrupted data, or if the item is missing, it safely falls back to an empty array `[]`.
- **Light/dark theme:** I created a `useLocalStorage` hook to persist the preference ('light' or 'dark'). I then applied this value directly to `document.body.className` in the `NavBar` component, allowing CSS rules to globally switch background and text colors based on the body's class name.