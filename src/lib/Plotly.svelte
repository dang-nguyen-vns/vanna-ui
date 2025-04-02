<script lang="ts">
  import { onMount } from "svelte";
  export let fig: string;

  let figJson = JSON.parse(fig);

  let id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  onMount(() => {
    Plotly.newPlot(id, figJson, {
      responsive: true,
    });

    // Handle resizing
    const resizeHandler = () =>
      Plotly.Plots.resize(document.getElementById(id));
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  });
</script>

<div class="plot-container" {id}></div>

<style>
  .plot-container {
    width: "500px";
    height: "500px";
  }
</style>
