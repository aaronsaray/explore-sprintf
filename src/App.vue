<template>
  <wip-message></wip-message>

  <main class="grow w-full max-w-5xl mx-auto px-3 pt-10 mb-32">
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
            class="w-full bg-slate-800 focus:bg-slate-950 border focus:outline-none p-2 placeholder:text-slate-500 text-gray-50"
            :class="{'border-rose-700': formatStringError, 'border-slate-700': !formatStringError }"
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
          <table v-if="fields.length">
            <tr v-for="(field, idx) in fields" v-bind:key="idx">
              <td class="py-3 pe-2">
                <label :for="'f-${idx}'">
                  <span class="text-gray-400">{{ field.token }}</span>
                </label>
              </td>
              <td>
                <input :id="'f-${idx}'" v-model="fields[idx].value" class="bg-slate-800 focus:bg-slate-950 border border-slate-700 focus:outline-none p-2 placeholder:text-slate-500 text-gray-50 w-52" type="text">
              </td>
            </tr>
          </table>
          <div >

          </div>
        </fieldset>
      </div>

      <div>
        <div class="text-gray-400 font-medium mb-2">
          Formatted result
        </div>
        <div class="bg-slate-950 p-2 drop-shadow overflow-x-auto">
          <span v-if="!resultString" class="uppercase text-sm bg-slate-800 px-1 py-0.5 rounded-sm">None</span>
          <span v-else :class="{'blur-sm': formatStringError }">{{ resultString }}</span>
        </div>
      </div>
    </section>
  </main>

  <article class="max-w-3xl mx-auto px-4 pb-10 text-xl">
    <h3 class="text-center mb-4 text-2xl">What is sprintf?</h3>
    <p>
      <code class="text-lg">sprintf()</code> takes a format string and returns it formatted based on the template parameters and instructions you've provided.
      You can learn more at <a href="https://www.php.net/sprintf" class="transition-all underline underline-offset-2 hover:text-gray-400">php.net/sprintf</a>.
    </p>
  </article>
</template>

<script setup>
import { ref, watch } from 'vue';
import WipMessage from './components/WipMessage.vue';
import { getTokens, sprintf } from './lib/Sprintf';

function example() {
  formatString.value = 'My string "%s" is here.';
  fields.value = [];
}

function getDefaultValueFor(type) {
  const values = {
    'b': 1,
    'c': 65,
    'd': 2,
    'e': 3123,
    'E': 4123,
    'f': 52.34,
    'F': 62.34,
    'g': 7.12,
    'G': 8.12,
    'h': 9.12,
    'H': 10.12,
    'o': 321,
    's': 'Example',
    'u': 22,
    'x': 31,
    'X': 42,
  };

  if (type in values) {
    return values[type];
  }

  throw Error('Invalid token type: "' + type + '"');
}

function refreshResultString() {
  formatStringError.value = false;

  try {
    const result = sprintf(formatString.value, ...fields.value.map(f => f.value));
    resultString.value = result;
  } catch {
    formatStringError.value = true;
  }
}

const formatString = ref('');
const formatStringError = ref(false);
const fields = ref([]);
const resultString = ref('');

watch(formatString, newFormatString => {
  fields.value.forEach(f => f.confirmed = false);

  getTokens(newFormatString).filter(t => t.token && t.token !== '%%').forEach(token => {
    // find the first of this type that is not confirmed
    const firstOfTypeNotConfirmed = fields.value.find(f => !f.confirmed && f.token === token.token);

    if (firstOfTypeNotConfirmed) { // if found, flip to confirmed and continue with the loop
      firstOfTypeNotConfirmed.confirmed = true;
    } else { // if not found, add to the fields list with the default value and confirm it
      fields.value.push({value: getDefaultValueFor(token.type), confirmed: true, ...token});
    }
  });

  // remove any unconfirmed
  fields.value = fields.value.filter(f => f.confirmed);

  refreshResultString();
});

watch(fields, () => {
  refreshResultString();
}, { deep: true})
</script>
