<script lang="ts">
  import { onMount } from "svelte";
  import type { QuestionLink } from "./types";

  export let getTrainingData: () => void;
  export let newQuestionPage: () => void;
  export let loadQuestionPage: (id: string) => void;
  export let questionHistory: QuestionLink[];

  // Sort by ID assuming higher = newer
  $: recentQuestions = questionHistory
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
</script>

<!-- Sidebar -->
<div
  id="application-sidebar"
  class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-80 bg-white border-r border-gray-200 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 dark:bg-slate-900 dark:border-gray-700"
>
  <nav
    class="flex flex-col h-full justify-between"
    data-hs-accordion-always-open
  >
    <!-- Header -->
    <div class="flex flex-col items-center px-4 py-6">
      <img src="/company_logo.png" alt="Company Logo" class="w-28 h-auto" />
      <p class="text-xl font-semibold text-blue-600 mt-2 text-center">
        Department of Agriculture
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col space-y-2 w-full mt-6">
        <button
          class="flex items-center gap-2 border border-sky-400 text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg px-4 py-2 text-sm font-medium transition"
          on:click={() => console.log("Agriculture Wiki")}
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          Agriculture Wiki
        </button>

        <button
          class="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-sm font-medium transition"
          on:click={() => console.log("Durian Traceability")}
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
          Durian Traceability
        </button>
      </div>

      <!-- Toggle Button (Mobile Only) -->
      <div class="lg:hidden mt-4">
        <button
          type="button"
          class="w-8 h-8 inline-flex items-center justify-center rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:text-gray-400 dark:focus:ring-offset-gray-800"
          data-hs-overlay="#application-sidebar"
          aria-label="Close sidebar"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu -->
    <div class="flex-1 overflow-auto px-4">
      <ul class="space-y-1.5">
        <li>
          <button
            on:click={getTrainingData}
            class="flex items-center gap-2 w-full py-2 px-3 text-sm text-slate-700 hover:bg-gray-100 rounded-md dark:text-slate-300 dark:hover:bg-gray-900"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347M6.75 15v-3.675A55.378 55.378 0 0112 8.443"
              />
            </svg>
            Training Data
          </button>
        </li>

        {#each recentQuestions as q}
          <li>
            <button
              on:click={() => loadQuestionPage(q.id)}
              class="flex items-center gap-2 w-full py-2 px-3 text-sm text-slate-700 hover:bg-gray-100 rounded-md dark:text-slate-300 dark:hover:bg-gray-900"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9M3 11.25c0 1.6 1.123 2.994 2.707 3.227a48.33 48.33 0 003.423.379c.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741V11.25z"
                />
              </svg>
              {q.question}
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
      <div
        class="flex items-center justify-between text-xs text-green-600 mb-2"
      >
        <span class="flex items-center gap-2">
          <span class="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
          v0.0.1
        </span>
      </div>
      <a
        href="#replace"
        class="flex items-center justify-between gap-3 py-2 px-3 text-sm text-slate-700 hover:bg-gray-100 rounded-md dark:text-slate-300 dark:hover:bg-gray-900"
      >
        Logout
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
          />
          <path
            fill-rule="evenodd"
            d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
          />
        </svg>
      </a>
    </div>
  </nav>
</div>
