import { Elysia, t } from 'elysia'

export const rooms = new Elysia({ prefix: '/rooms' })
    .post('/create', () => {
        console.log("Create a New Room!")
    })

export const app = new Elysia({ prefix: '/api' }).use(rooms)

export const GET = app.fetch
export const POST = app.fetch

export type App = typeof app