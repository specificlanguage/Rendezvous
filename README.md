# Rendezvous

> book travel easily with others

This is a webapp intended to work with travel with others, providing a little more information to coordinate travel between other users, whether for flights, and hotels. It's a bit of a work in progress and to me it's a little of ambitious side project I'm slowly working on over the past couple months. Eventually, this would be nice as a fully deployed app, but documentation for flight and hotel search and booking is [very cumbersome](https://amadeus4dev.github.io/developer-guides/resources/flights/#search-by-radius) and hard to come by, so development is pretty slow, unfortunately.

It's using Typescript, React, ChakraUI, Zustand (a simple version of Redux), Duffel (intended), Amadeus, and others. You may also want to checkout the [backend repository](https://github.com/specificlanguage/RendezvousBackend)

### Building

1. Run `pnpm i` to install all items
2. Setup a Firebase app and signup for [Google Maps Place API](https://developers.google.com/maps/documentation/places/web-service/overview)
3. Fill out an `.env` with
   3a. "VITE_BACKEND_URL" plus
   3b. "VITE_FIREBASE_[identifier]" for each Firebase app.
   3c. "VITE_GOOGLE_MAPS_API_KEY" (don't worry, as long as you restrict the API Key, it should be safe)
4. Run `pnpm dev` or `pnpm build`

### Todos:

- [ ] Login/Trip creation
- [ ] Display users from backend
- [ ] Create an import page to search flights
    - [x] Show flights
    - [ ] Correctly show the times for each time zone (it's only doing the local time zone to the user right now, which isn't good)
    - [ ] Allow user to select flight that will be imported
- [ ] Send email notifications about flights
- [ ] (Phase 2) Flight & hotel booking
