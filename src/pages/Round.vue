<template>
  <div class="h-svh w-screen bg-white">
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
import { nextTick, ref } from "vue"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"

const captureAndSave = async (elementName: string, exportName = "") => {
  await nextTick()
  const element = document.getElementById(elementName)

  try {
    if (!element) {
      throw new Error("Element not found")
    }
    const dataUrl = await toPng(element)
    const blob = await (await fetch(dataUrl)).blob()
    saveAs(blob, `${exportName === "" ? elementName : exportName}.png`)
  } catch (error) {
    console.error("Error capturing and saving image:", error)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
