<script lang="ts">
  import { onMount } from "svelte";
  export let index: number = 0;
  export let delayPerItem: number = 150;

  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, index * delayPerItem);
  });
</script>

{#if show}
  <slot />
{/if}
