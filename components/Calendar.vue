<template>
  <div class="calendar">
    <client-only>
      <h2 class="text-3xl font-bold">Calendar</h2>
      <VDatePicker v-model="date" :attributes="attrs" @click.date="handleDateClick(date)"/>
      <div>
        <h1>New booking</h1>
        <div>
          <label>From</label>
          <select v-model="startHour.value">
            <option v-for="n in 24" :value="n - 1">{{ n - 1 }}</option>
          </select>
          <label>:</label>
          <select v-model="startMinute.value">
            <option v-for="n in 60" :value="n - 1">{{ n - 1 }}</option>
          </select>
        </div>
        <div>
          <label>To</label>
          <select v-model="endHour.value">
            <option v-for="n in 24" :value="n - 1">{{ n - 1 }}</option>
          </select>
          <label>:</label>
          <select v-model="endMinute.value">
            <option v-for="n in 60" :value="n - 1">{{ n - 1 }}</option>
          </select>
        </div>
        <textarea v-model="bookingDescription" placeholder="Booking description"></textarea>
        <button @click="createBooking" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book
        </button>
      </div>
      <table class="table-fixed">
        <colgroup>
          <col class="border"/>
          <col class="border"/>
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>{{selectedDate}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border">
            <td>00:00</td>
            <td rowSpan="12">
              <!-- <div v-for="(item, index) in array" :key="index">
                {{item.day}}
              </div> -->
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
    </client-only>
  </div>
</template>

<script setup lang="ts">
  import { ref } from '#imports'
  // const {data: bookings, error} = await useFetch("/api/bookings")
  
  // console.log(bookings)
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
  
    const handleDateClick = (clickedDate: Date) => {
      selectedDate.value = clickedDate.toDateString()
      console.log('clicked', selectedDate.value)
  };

  async function createBooking() {
    // const { body } = await $fetch('/api/bookings', {
    //   method: 'post',
    //   body: { test: 123 }
    // })
    console.log("start:", startHour.value, ":", startMinute.value, " to: ", endHour.value, ":", endMinute.value, "description:", bookingDescription.value)
  }

</script>

