import {Schema, model} from 'mongoose'

const BookingSchema = new Schema({
    date: {
        type: String,
    },
    description: {
        type: String
    },
    startTime: {
        hour: {type: Number},
        minute: {type: Number}
    },
    endTime: {
        hour: {type: Number},
        minute: {type: Number}
    }
})

export const Booking = model<any>('Booking', BookingSchema)

export default defineEventHandler(async (event) => {

    // const bookings = await Booking.find()
    return {
        // bookings
        hello: "world"
    }

})