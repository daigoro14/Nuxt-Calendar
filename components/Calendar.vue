<template>
  <div class="calendar flex flex-col sm:flex-row h-screen">
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-bold">Calendar</h2>
      <VDatePicker v-model="date" :attributes="attrs" @click.date="handleDateClick(date)"/>
      <div>
        <h1 class="text-2xl text-center">New booking</h1>
        <div class="flex justify-center">
          <label>From: </label>
          <select v-model="startHour">
            <option v-for="n in 24" :value="n - 1">{{ n - 1 }}</option>
          </select>
          <label>:</label>
          <select v-model="startMinute">
            <option v-for="n in 60" :value="n - 1">{{ n - 1 }}</option>
          </select>
        </div>
        <div class="flex justify-center">
          <label>To: </label>
          <select v-model="endHour">
            <option v-for="n in 24" :value="n - 1">{{ n - 1 }}</option>
          </select>
          <label>:</label>
          <select v-model="endMinute">
            <option v-for="n in 60" :value="n - 1">{{ n - 1 }}</option>
          </select>
        </div>
        <textarea class="h-60 w-full border-solid border-2 rounded border-gray-200" v-model="bookingDescription" placeholder="Booking description"></textarea>
        <button @click="createBooking" class="mb-20 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book
        </button>
      </div>
    </div>
    <table class="table-fixed h-full w-full text-center">
      <colgroup>
        <col class="border"/>
        <col class="border"/>
      </colgroup>
      <thead>
        <tr>
          <th class="w-20"></th>
          <th>{{selectedDate}}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border">
          <td>00:00</td>
          <td rowSpan="12" class="relative p-2">
            <div v-for="booking in bookings">
              <div v-if="booking.date === selectedDate" :key="booking.id" :style="styleBooking(booking.startTime, booking.endTime)" class="absolute flex items-center w-56 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
                <span class="flex-1">{{booking.description}}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr class="border">
          <td>02:00</td>
        </tr>
        <tr class="border">
          <td>04:00</td>
        </tr>
        <tr class="border">
          <td>06:00</td>
        </tr>
        <tr class="border">
          <td>08:00</td>
        </tr>
        <tr class="border">
          <td>10:00</td>
        </tr>
        <tr class="border">
          <td>12:00</td>
        </tr>
        <tr class="border">
          <td>14:00</td>
        </tr>
        <tr class="border">
          <td>16:00</td>
        </tr>
        <tr class="border">
          <td>18:00</td>
        </tr>
        <tr class="border">
          <td>20:00</td>
        </tr>
        <tr class="border">
          <td>22:00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { ref, useFetch } from '#imports'
  
  const date = ref(new Date())

  const attrs = ref([
    {
      key: 'today',
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },
      dates: new Date()
    }
  ])

  const currentDate = new Date()
  const selectedDate = ref<Date | null>(currentDate.toDateString())
  const startHour = ref(0);
  const startMinute = ref(0);
  const endHour = ref(0);
  const endMinute = ref(0);
  const bookingDescription = ref('');
  const url = ref(`/api/bookings/booking`)
  const bookings = ref([])

  const fetchData = async () => {
        try {
          const response = await fetch(`${url.value}?param=${encodeURIComponent(selectedDate.value)}`)
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()
          bookings.value = data.bookings
        } catch (error) {
          console.error('Error fetching data:', error.message)
        }
      }

    fetchData()


    const handleDateClick = async (clickedDate: Date) => {
      selectedDate.value = clickedDate.toDateString()
      await fetchData() 
}

  async function createBooking() {
    if  (startHour.value < endHour.value || (startHour.value === endHour.value && startMinute.value < endMinute.value)) {
      const { body } = await $fetch('/api/bookings/booking', {
        method: 'post',
        body: { 
          date: selectedDate.value,
          startTime: {
            hour: startHour.value,
            minute: startMinute.value
          }, 
          endTime: {
            hour: endHour.value,
            minute: endMinute.value
          }, 
          description: bookingDescription.value,
        }
      })
      await fetchData()
      startHour.value = 0
      startMinute.value = 0
      endHour.value = 0
      endMinute.value = 0
      bookingDescription.value = ""
    } else {
      console.log("Something went wrong, ensure that the start of your booking is earlier than the end")
    }
  }

  // Calculate the starting time of a booking within the 24 hours in %. Example would a booking at 12pm be at 50% of the day. Minutes are converted and calculated to hours 
  function positionBooking(start) {
    const minutesInHours = start.minute / 60
    const totalHour = start.hour + minutesInHours
    const procentOfADay = totalHour / 24 * 100
    return `${procentOfADay}`
  }

  // Calculate the height of a booking by the length of the booking
  function heightOfBooking(start, end){
    const startMinutesInHours = start.minute / 60
    const totalStartHour = start.hour + startMinutesInHours
    const endMinutesInHours = end.minute / 60
    const totalEndHour = end.hour + endMinutesInHours
    const heightInProcent = (totalEndHour - totalStartHour) / 24 * 100
    return heightInProcent
  }

  function styleBooking(start, end) {
    const bookingHeight = heightOfBooking(start, end)
    const bookingPosition = positionBooking(start)
    return `top: ${bookingPosition}%; height: ${bookingHeight}%`
  }


</script>

