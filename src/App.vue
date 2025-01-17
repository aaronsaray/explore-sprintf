<template>
  <wip-message></wip-message>

  <main class="max-w-5xl mx-auto px-3 pt-10">
    <section class="text-center mb-14">
      <h1 class="antialiased tracking-wide text-5xl font-thin text-center text-gray-100 mb-8">
        Exploring 
        <span class="border-b-2 border-orange-700 pb-1">sprintf</span>
      </h1>
      <p>
        Learn the power and potential of <code class="text-gray-300">sprintf()</code> in the browser!
      </p>
    </section>
  
    <section class="grid grid-cols-2 space-x-12">
      <div>
        <fieldset class="mb-6">
          <legend class="text-gray-400 font-medium mb-2">
            Format string for <code>sprintf()</code>
          </legend>

          <textarea 
            v-model="formatString"
            class="w-full bg-slate-800 focus:bg-slate-950 border border-slate-700 focus:outline-none p-2 placeholder:text-slate-500 text-gray-50" 
            :class="{'border-rose-700': formatStringError }"
            placeholder="Enter your format string" 
            rows="1"
          ></textarea>
          
          <div class="text-sm transition-opacity opacity-80 hover:opacity-100">
            Need an example?
            <a @click.prevent="example" href="#" class="underline underline-offset-2 text-gray-400">Try this</a>
          </div>
        </fieldset>

        <fieldset v-if="fields.length" class="space-y-2">
          <legend class="text-gray-400 font-medium">Substitutions</legend>
          <div v-for="(field, idx) in fields" v-bind:key="idx">
            <label>
              <span class="w-10 inline-block text-gray-400">{{ field.token }}</span>
              <input v-model="fields[idx].value" class="bg-slate-800 focus:bg-slate-950 border border-slate-700 focus:outline-none p-2 placeholder:text-slate-500 text-gray-50" type="text">
            </label>
          </div>
        </fieldset>
      </div>

      <div>
        <div class="text-gray-400 font-medium mb-2">
          Formatted result
        </div>
        <div class="bg-slate-950 p-2 drop-shadow">
          <span v-if="!formattedString" class="uppercase text-sm bg-slate-800 px-1 py-0.5 rounded-sm">None</span>
          <span v-else :class="{'blur-sm': formatStringError }">{{ formattedString }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import WipMessage from './components/WipMessage.vue';
import { getTokens, sprintf } from './Sprintf';

function example() {
  formatString.value = 'My string "%s" is here.';
}

function calculateFormattedString() {
  try {
    formattedString.value = sprintf(formatString.value, ...fields.value.map(f => f.value));
    formatStringError.value = false;
  } catch {
    formatStringError.value = true;
  }
}

const formatString = ref('');
const formattedString = ref('');
const fields = ref([]);
const formatStringError = ref(false);

watch(formatString, newFormatString => {
  fields.value = [];

  getTokens(newFormatString).forEach(token => {
    if (token.token && token.token !== '%%') {
      const value = token.token === '%s' ? 'Example' : '0';
      fields.value.push({value, ...token});
    }
  });

  calculateFormattedString();
});

watch(
  () => fields,
  () => calculateFormattedString(),
  {
    deep: true
  }  
);
</script>
