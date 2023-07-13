# BASE BACKEND

## Getting Started

### Step 1

- Clone the project
- Setup
  - Run the following commands

    - ```bash
      npm i
      ```

- Run the containers and initialize the DB

  - Run the following commands

    - ```bash
      docker compose up --build -d
      ```

    - ```bash
      npx prisma migrate dev
      ```

- Bring the containers down and remove them
  - Run the following commands

    - ```bash
      docker compose down --remove-orphans 
      ```

### TO DO

- Create/Edit your DB Schema
  - Edit the ```schema.prisma``` file in ```prisma/schema.prisma```
  - Prisma Docs: [Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client)
- Routes & Controllers
  - Create/Edit the Routes in ```routes``` folder
  - Create/Edit the Controllers in ```controllers``` folder
  - Useful Link: [Node + Express](https://dev.to/ericchapman/nodejs-express-part-5-routes-and-controllers-55d3)
- WebSockets
  - Remove or Use the WebSocket if needed
  - SocketIO: [SocketIO - Getting Started](https://socket.io/get-started/chat)
  - [x] **already implemented SocketIO*
