<template>
   <div class="conent-body">
    <!-- row -->
    <div class="cotainer-fluid">
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            v-model='calendarOptions.weekends'
          />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.start }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template #eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

function createEventId() {
  // Generate a unique ID for the event
  return String(Date.now());
}

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect.bind(this), // Bind handleDateSelect method here
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        events: [] // Initial events array
      },
      currentEvents: [],
    }
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      axios.get('https://restaurant-n54j.onrender.com/api/events')
        .then(response => {
          this.currentEvents = response.data;
          this.calendarOptions.events = response.data; // Update the events in the calendar
        })
        .catch(error => {
          console.error('Failed to fetch events:', error);
        });
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event');

      if (title) {
        let event = {
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        };

        axios.post('https://restaurant-n54j.onrender.com/api/events', event)
          .then(() => {
            this.currentEvents.push(event);
            this.calendarOptions.events.push(event); // Add the new event to the calendar
          })
          .catch(error => {
            console.error('Failed to create event:', error);
          });
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        let eventId = clickInfo.event.id;

        axios.delete(`https://restaurant-n54j.onrender.com/api/events/${eventId}`)
          .then(() => {
            this.currentEvents = this.currentEvents.filter(event => event.id !== eventId);
            this.calendarOptions.events = this.calendarOptions.events.filter(event => event.id !== eventId); // Remove the event from the calendar
          })
          .catch(error => {
            console.error('Failed to delete event:', error);
          });
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  }
});
</script>

<style lang='css'>
/* CSS styles here */
</style>
