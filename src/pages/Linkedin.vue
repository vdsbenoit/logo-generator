<template>
  <div class="h-svh w-screen bg-white">
    <!-- Linkedin Cover -->
    <div class="ml-2 mt-5 flex flex-col justify-start">
      <div
        id="logo-linkedin"
        class="relative ring-1"
        :style="{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
        }"
        style="background: radial-gradient(ellipse at bottom, #262626 0%, #0a0a0a 100%)"
      >
        <!-- star background -->
        <div
          v-for="(layer, indexLayer) in starLayers"
          :id="`background-stars-layer-${indexLayer}`"
          :key="indexLayer"
          class="absolute inset-0 z-10 h-full w-full overflow-hidden"
        >
          <div v-for="(offset, indexOffset) in [0, HEIGHT]" :key="indexOffset">
            <div
              v-for="(star, indexStar) in layer.stars"
              :key="indexStar"
              class="pointer-events-none absolute"
              :style="{
                top: star.top + offset + 'px',
                left: star.left + 'px',
              }"
            >
              <img
                src="@/assets/frite-background.png"
                alt="moving fry"
                class="w-auto"
                :style="{
                  height: `${layer.height}rem`,
                  transform: `rotate(${star.rotation}deg)`,
                }"
              />
            </div>
          </div>
        </div>
        <!-- Logo + text -->
        <div class="relative z-20 flex h-full w-full items-center justify-center">
          <img ref="logoElement" class="h-[50%]" src="@/assets/logo.png" />
          <p ref="titleElement" class="ml-4 text-[4.5rem] font-bold text-neutral-100">frite.dev</p>
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex items-center">
        <button
          class="ml-2 mt-5 rounded bg-gray-300 px-2 py-1 font-semibold"
          @click="captureAndSave('logo-linkedin')"
        >
          Export
        </button>
      </div>
      <div class="flex items-center">
        <button class="ml-2 mt-5 rounded bg-gray-300 px-2 py-1 font-semibold" @click="setStars">
          Reset stars
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding } from "@vueuse/core"
import saveAs from "file-saver"
import { toPng } from "html-to-image"
import { nextTick, onMounted, ref } from "vue"

// Interfaces & Types

interface Star {
  top: number
  left: number
  rotation: number // in degrees
}

interface StarLayer {
  stars: Star[]
  height: number // in rem
}

// Constants & Variables

// width and height from the linkedin cover image
const WIDTH = 1584
const HEIGHT = 396
const START_DENSITY = 1

const NB_STARS = ((HEIGHT * WIDTH) / 40000) * START_DENSITY
let starLayers = ref<StarLayer[]>([])
const logoElement = ref<HTMLElement | null>(null)
const logoRect = useElementBounding(logoElement)
const titleElement = ref<HTMLElement | null>(null)
const titleRect = useElementBounding(titleElement)

function isNotIntersecting(
  element1Rect: any,
  element2X: number,
  element2Y: number,
  element2Size: number,
): boolean {
  const element2Rect = {
    top: element2Y,
    left: element2X,
    bottom: element2Y + element2Size,
    right: element2X + element2Size,
  }
  return (
    element2Rect.left > element1Rect.right.value ||
    element2Rect.right < element1Rect.left.value ||
    element2Rect.top > element1Rect.bottom.value ||
    element2Rect.bottom < element1Rect.top.value
  )
}

const generateStars = (n: number): Star[] => {
  const stars: Star[] = []

  // create a grid of stars to spread them evenly
  const rows = Math.ceil(Math.sqrt(n))
  const cols = Math.ceil(n / rows)
  const cellWidth = WIDTH / cols
  const cellHeight = HEIGHT / rows

  let count = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (count < n) {
        // Generate random position within the current grid cell
        const x = col * cellWidth + Math.random() * cellWidth
        const y = row * cellHeight + Math.random() * cellHeight
        // Ensure the star is not overlapping with the logo or title
        if (isNotIntersecting(logoRect, x, y, 30) && isNotIntersecting(titleRect, x, y, 30)) {
          const star: Star = {
            left: x,
            top: y,
            rotation: Math.random() * 360,
          }
          stars.push(star)
        }
        count++
      }
    }
  }
  return stars
}

const setStars = () => {
  console.log("set stars")
  starLayers.value = [
    { stars: generateStars(NB_STARS * 6), height: 0.5 },
    { stars: generateStars(NB_STARS * 2), height: 0.75 },
    { stars: generateStars(NB_STARS), height: 1.5 },
  ]
}

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

onMounted(() => {
  setStars()
})
</script>

<style scoped></style>
