<template>
  <aside class="absolute top-0 right-0 text-sm w-64">
    <div class="bg-amber-700 text-black p-1 text-sm text-center">
      This is WIP.
      <a @click.prevent="toggle" href="#" class="underline">
        <span v-if="!showing">Learn more</span>
        <span v-if="showing">Close</span>
      </a>
    </div>
    <div v-if="showing" class="bg-slate-700 text-gray-100 px-2 py-1 font-light space-y-2">
      <p class="text-center font-semibold">Work in Progress</p>
      <p>The following are broken, missing or in progress:</p>
      <ul class="list-disc list-inside">
        <li>Named parameters</li>
        <li>Different order of parameters</li>
      </ul>
      <p>
        Probably way more things. This is just for fun right now.
      </p>
    </div>
  </aside>
</template>

<script setup>
  import { ref } from 'vue';

  const showing = ref(false);

  function toggle() {
    showing.value = !showing.value;
  }
</script>
