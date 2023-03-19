import { H3Event, setResponseStatus } from "h3"

export default defineEventHandler(async (event: H3Event) => {
    // if (!notion) {
    //     event.res.statusCode = 400
    //     event.res.end()
    //     return throwError('😱 Something goes wrong!!!')
    // }

    return setResponseStatus(event, 200, 'OK')
})