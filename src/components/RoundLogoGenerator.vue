<template>
  <div class="h-svh w-screen bg-white">
    <button class="my-5 ml-4 rounded bg-gray-300 px-2 py-1 font-semibold" @click="exportAll">
      Export all
    </button>

    <!-- NOTE: I use a x5 zoom for the medium exports  -->

    <!-- Full dark -->

    <div class="mt-5 grid grid-cols-2">
      <div
        id="logo-full-dark"
        class="flex h-[132px] w-[320px] items-center justify-center"
        style="background: radial-gradient(ellipse at bottom, #262626 0%, #0a0a0a 100%)"
      >
        <div class="h-[60%] rounded-full">
          <img class="size-full" src="@/assets/logo.png" />
        </div>
        <p class="ml-4 text-[2.7rem] font-bold text-neutral-100">frite.dev</p>
      </div>

      <div class="flex items-center">
        <button
          class="ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
          @click="captureAndSave('logo-full-dark')"
        >
          Export logo-full-dark
        </button>
      </div>
    </div>

    <!-- Full light -->

    <div class="mt-5 grid grid-cols-2">
      <div class="h-[132px] w-[320px] ring-1 ring-black">
        <div id="logo-full-light" class="flex h-full w-full items-center justify-center bg-white">
          <div
            class="h-[60%] rounded-full p-3"
            style="background: radial-gradient(ellipse at bottom, #171717 0%, #0a0a0a 100%)"
          >
            <img class="size-full" src="@/assets/logo.png" />
          </div>
          <p class="ml-4 text-[2.7rem] font-bold text-neutral-950">frite.dev</p>
        </div>
      </div>

      <div class="flex items-center">
        <button
          class="ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
          @click="captureAndSave('logo-full-light')"
        >
          Export logo-full-light
        </button>
      </div>
    </div>

    <!-- Full transparent -->

    <div class="mt-5 grid grid-cols-2">
      <div class="h-[132px] w-[320px] ring-1 ring-black">
        <div
          id="logo-full-transparent"
          class="flex h-full w-full items-center justify-center bg-white"
        >
          <div
            class="h-[60%] rounded-full p-3"
            style="background: radial-gradient(ellipse at bottom, #171717 0%, #0a0a0a 100%)"
          >
            <img class="size-full" src="@/assets/logo.png" />
          </div>
          <p class="ml-4 text-[2.7rem] font-bold text-neutral-950">frite.dev</p>
        </div>
      </div>

      <div class="flex items-center">
        <button
          class="ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
          @click="captureAndSave('logo-full-transparent')"
        >
          Export logo-full-transparent
        </button>
      </div>
    </div>

    <!-- Round -->

    <div class="mt-5 grid grid-cols-2">
      <div
        id="logo-round"
        class="flex h-fit w-fit items-center justify-center rounded-full"
        style="background: radial-gradient(ellipse at bottom, #171717 0%, #0a0a0a 100%)"
      >
        <img class="p-16" src="@/assets/logo.png" />
      </div>

      <div class="flex items-center">
        <button
          class="ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
          @click="captureAndSave('logo-round')"
        >
          Export logo-round
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from "vue"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"

const captureAndSave = async (elementName: string) => {
  await nextTick()
  const element = document.getElementById(elementName)

  try {
    if (!element) {
      throw new Error("Element not found")
    }
    const dataUrl = await toPng(element)
    const blob = await (await fetch(dataUrl)).blob()
    saveAs(blob, `${elementName}.png`)
  } catch (error) {
    console.error("Error capturing and saving image:", error)
  }
}
const exportAll = async () => {
  await captureAndSave("logo-full-dark")
  await captureAndSave("logo-full-light")
  await captureAndSave("logo-full-transparent")
  await captureAndSave("logo-round")
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
