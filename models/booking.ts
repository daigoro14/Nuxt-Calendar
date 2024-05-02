import {Schema, model} from 'mongoose'

const BookingSchema = new Schema({
    date: {
        type: String, required: true
    },
    description: {
        type: String
    },
    startTime: {
        hour: {type: Number, required: true},
        minute: {type: Number, required: true}
    },
    endTime: {
        hour: {type: Number, required: true},
        minute: {type: Number, required: true}
    }
})

export const Booking = model<any>('Booking', BookingSchema)
