<template>
  <div class="h-svh w-screen bg-white">
    <div
      id="logo-full-dark"
      class="flex h-[132px] w-[320px] items-center justify-center bg-neutral-900"
    >
      <div class="h-[60%] rounded-full">
        <img class="size-full" src="@/assets/logo.png" />
      </div>
      <p class="ml-4 text-[2.7rem] font-bold text-neutral-100">frite.dev</p>
    </div>

    <button
      class="my-5 ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
      @click="captureAndSave('logo-full-dark')"
    >
      Export as PNG
    </button>

    <div class="h-[132px] w-[320px] ring-1 ring-black">
      <div id="logo-full-light" class="flex h-full w-full items-center justify-center">
        <div class="h-[60%] rounded-full bg-neutral-900 p-3">
          <img class="size-full" src="@/assets/logo.png" />
        </div>
        <p class="ml-4 text-[2.7rem] font-bold text-neutral-900">frite.dev</p>
      </div>
    </div>

    <button
      class="my-5 ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
      @click="captureAndSave('logo-full-light')"
    >
      Export as PNG
    </button>

    <div
      id="logo-round"
      class="flex h-fit w-fit items-center justify-center rounded-full bg-neutral-900"
    >
      <img class="p-16" src="@/assets/logo.png" />
    </div>

    <button
      class="my-5 ml-4 rounded bg-gray-300 px-2 py-1 font-semibold"
      @click="captureAndSave('logo-round')"
    >
      Export as PNG
    </button>
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
</script>

<style scoped>
/* Add any additional styles here */
</style>
