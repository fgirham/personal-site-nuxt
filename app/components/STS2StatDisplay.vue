<script setup lang="ts">
import { motion } from 'motion-v';

interface StatDisplayProps {
  value: number;
  label: string;
  suffix?: string;
}

defineProps<StatDisplayProps>();
</script>

<template>
  <motion.div
    class="flex flex-col items-center justify-center rounded-lg border border-accented bg-linear-to-br from-slate-50 to-slate-200  dark:from-slate-800 dark:to-slate-900 p-8 text-center"
    :initial="{ opacity: 0, scale: 0.9 }"
    :animate="{ opacity: 1, scale: 1 }"
  >
    <div class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      {{ label }}
    </div>
    <div class="mt-3 text-5xl font-bold dark:text-white">
      {{ value.toFixed(2) }}<span v-if="suffix" class="text-3xl">{{ suffix }}</span>
    </div>
  </motion.div>
</template>
