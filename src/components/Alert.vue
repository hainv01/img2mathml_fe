<template>
  <div
      class="top-0 right-0 h-50 w-50 mb-3 hidden w-full items-center border-red-400 border rounded-lg bg-red-100 py-5 px-6 text-red-700"
      role="alert">
    <strong class="mr-1">Holy guacamole! </strong> You should check in on
    some of those fields below.
    <button
        aria-label="Close"
        class="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        data-te-alert-dismiss
        type="button">
    <span
        class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
      <svg
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
        <path
            clip-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            fill-rule="evenodd"/>
      </svg>
    </span>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Alert"
}
</script>
