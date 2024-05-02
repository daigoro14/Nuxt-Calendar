import { Booking } from "~/models/booking"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const bookings = await Booking.find({date: query.param})
    return {
        bookings
    }

})