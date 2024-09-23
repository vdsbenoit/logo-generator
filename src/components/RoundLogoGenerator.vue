<template>
  <div class="h-svh w-screen bg-white">
    <div id="capture" class="flex h-[132px] w-[320px] items-center justify-center  border-black">
      <div class="h-[60%] rounded-full bg-neutral-900 p-3">
        <img class="size-full" src="@/assets/logo.png" />
      </div>
      <p class="text-[2.7rem] ml-4 font-bold text-neutral-900">frite.dev</p>
    </div>

    <button class="ml-4 mt-10 rounded bg-gray-300 px-2 py-1 font-semibold" @click="captureAndSave">
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
