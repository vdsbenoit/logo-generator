<template>
  <div class="h-svh w-screen bg-white">
    <div id="capture" class="flex h-[132px] w-[320px] items-center bg-neutral-900">
      <img class="h-5/6 ml-3 p-4" src="@/assets/logo.png" />
      <p class="text-4xl font-bold text-neutral-100">frite.dev</p>
    </div>
    <button class="mt-10 rounded bg-gray-300 px-2 py-1" @click="captureAndSave">
      Export as PNG
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from "vue"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"

const captureAndSave = async () => {
  await nextTick()
  const element = document.getElementById("capture")

  try {
    if (!element) {
      throw new Error("Element not found")
    }
    const dataUrl = await toPng(element)
    const blob = await (await fetch(dataUrl)).blob()
    saveAs(blob, "new-logo.png")
  } catch (error) {
    console.error("Error capturing and saving image:", error)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
