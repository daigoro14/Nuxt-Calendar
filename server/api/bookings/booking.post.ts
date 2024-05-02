import { Booking } from "~/models/booking"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const booking = new Booking({
        date: body.date, 
        startTime: {
            hour: body.startTime.hour,
            minute: body.startTime.minute
        },
        endTime: {
            hour: body.endTime.hour,
            minute: body.endTime.minute
        },
        description: body.description

    })
    await booking.save({ timeout: 15000 });

    return { body }
  })