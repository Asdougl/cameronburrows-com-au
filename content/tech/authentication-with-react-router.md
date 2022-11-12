---
title: 'Authentication with React Router 6'
date: '2022-11-12'
tags:
  - react
  - router
  - authentication
  - tutorial
summary: 'How to handle asynchronous authentication in React Router 6'
packages:
  - react-router@6
  - react@18
---

Throughout the various versions of React Router the best ways to handle authentication have changed, and with React Router version 6 there are new ways to handle authentication that can help to unlock a better developer experience. For this guide you'll need a good understanding of React and will be written in TypeScript.

## Project Setup

If you're following along to add this to an existing project, you can skip these steps, but if you're looking to implement this from scratch, let's create an empty vite project. Follow the prompts and setup with React and TypeScript.

```
npm init vite@latest
```

Next install react router 6, as well as zustand which we will use as a simple store for our authentication status.

```
npm i react-router-dom zustand
```

Then with that setup we now need to build our basic app scaffold. In `main.tsx` let's add the BrowserRouter component, that will wrap our `<App />` component, but be within the React Strict Mode tags.

```tsx
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

Then finally in the `App.tsx` we can clear out all the existing boilerplate and use this as our router.

Finally we'll need a couple pages to navigate to, so let's create `views/Login.tsx`

```tsx
import { login } from '../auth'

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => login()}>Login</button>
    </div>
  )
}
```

and a home page `views/Home.tsx`

```tsx
import { useAuth } from '../auth'

export const Home = () => {
  const { username } = useAuth((state) => ({ username: state.username }))

  return (
    <div>
      <h1>Hello {username}</h1>
    </div>
  )
}
```

## Our Authentication Service

The whole objective of this guide is around handling async authentication, so if you don't already have something in mind we can create a simple dummy authentication serivce in `src/auth.ts` using a timeout to simulate a network request and then zustand to create a simple store.

```typescript
import create from 'zustand'

export const useAuth = create<{ username: string | null; loading: boolean }>(
  () => ({
    username: null,
    loading: false,
  })
)

export const login = () =>
  new Promise<void>((res) => {
    useAuth.setState({ loading: true })
    setTimeout(() => {
      useAuth.setState({ username: 'John', loading: false })
      res()
    }, 1000)
  })
```

## Creating our Route Controllers

In our router we need to setup a basic routing structure which differentiates between authenticated routes and non-authenticated routes into two distinct groups.

```tsx
function App() {
  return (
    <Routes>
      {/* authenticated */}
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
      {/* non-authenticated */}
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}
```

Then each of those parent `<Route />` elements needs an `element` prop to act as that route's handler, which needs to check authentication status, show a loader if need be and finally show or redirect depending upon what that route needs todo. This can also be a great place to add an layouts that differentiate authenticated and unauthenticated routes.

Let's start with the route controller for the authenticated routes, by creating `controllers/authenticated.tsx`. Here we pull the authentication state from our zustand store and conditionally render what makes the most sense.

```tsx
import { login, useAuth } from '../auth'
import { Navigate, Outlet } from 'react-router-dom'

export const Authenticated = () => {
  const { username, loading, attempted } = useAuth((state) => ({
    username: state.username,
    loading: state.loading,
    attempted: state.attempted,
  }))

  if (!attempted) {
    // if the user has not attempted to login, show a loading indicator
    login()
  }

  if (loading || !attempted) {
    // if loading, show a loading indicator
    return <div>Loading...</div>
  }

  if (!username) {
    // if the user is not logged in, redirect to login
    return <Navigate to="/login" />
  }

  // if the user is logged in and the auth state is loaded, show the children routes
  return <Outlet />
}
```

First we need to know whether a login has been attempted, if not we should attempt to login and then show the loading indicator. Then the loading state is checked, and if auth is being fetched (or simulated in our case) then we can just show our loader of choice. Then when the login resolves, if the username is not known then we will redirect the user back to the Login page using the Navigate component from react router. Finally if we know the username then we will return the Outlet component from react router, which allows sub-routes to be rendered here.

Using this method we can easily handle the complete auth lifecycle within our router, allowing the browser's path to remain the same while we figure out whether the user is logged in or not.

Next we can create our unauthenticated controller `controllers/unauthenticated.tsx` which should do much the opposite of our authenticated route.

```tsx
import { useAuth } from '../auth'
import { Navigate, Outlet } from 'react-router-dom'

export const Unauthenticated = () => {
  const { username, loading } = useAuth((state) => ({
    username: state.username,
    loading: state.loading,
  }))

  if (!attempted) {
    // if the user has not attempted to login, show a loading indicator
    login()
  }

  if (loading || !attempted) {
    // if loading, show a loading indicator
    return <div>Loading...</div>
  }

  if (username) {
    // if the user is logged in and the auth state is loaded, navigate to the home page
    return <Navigate to="/" />
  }

  // if the user is not logged in, show the children routes
  return <Outlet />
}
```

Again we pull through the zustand store and do much the same as the authenticated controller except here we invert the action when the authentication has resolved, navigating away when logged in and continuing on when login failed.

This would be best paired with storing tokens in localStorage or using an out-of-the-box auth solution which should remember users between visits.

Finally let's add our controllers to `App.tsx` so we can limit access to our routes.

```tsx
function App() {
  return (
    <Routes>
      {/* authenticated */}
      <Route element={<Authenticated />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/* non-authenticated */}
      <Route element={<Unauthenticated />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}
```

## Conclusion

By following this method we can very easily determine what routes are hidden behind authentication and what routes are publically accessible. This limits the need for any custom `<ProtectedRoute />` components that many people had used in previous versions of react router, and allows developers to just use the inbuilt functionality of React Router 6 without special wrappers or even much consideration to whether a page can be accessed or not.
