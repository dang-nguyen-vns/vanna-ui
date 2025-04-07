<script lang="ts">
  import { onMount } from "svelte";
  import { tick } from "svelte";

  let copied = false;

  async function copyToClipboard() {
    const el = document.getElementById("code-content");
    if (el) {
      const text = el.innerText;
      await navigator.clipboard.writeText(text);
      copied = true;
      await tick();
      setTimeout(() => (copied = false), 1500);
    }
  }
</script>

<div
  class="relative bg-stone-100 text-gray-900 rounded-xl overflow-auto p-4 text-sm font-mono whitespace-pre-wrap border border-stone-300"
>
  <button
    class="absolute top-2 right-2 text-xs bg-white hover:bg-stone-200 text-gray-800 px-2 py-1 rounded border border-stone-300 transition-all"
    on:click={copyToClipboard}
  >
    {#if copied}
      Copied!
    {:else}
      Copy
    {/if}
  </button>

  <div id="code-content">
    <slot />
  </div>
</div>
