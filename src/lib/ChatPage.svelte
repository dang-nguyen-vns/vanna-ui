<script lang="ts">
  import { onMount } from "svelte";
  import type { MessageContents } from "./types.ts";
  import UserMessage from "./UserMessage.svelte";
  import AgentResponse from "./AgentResponse.svelte";
  import Text from "./Text.svelte";
  import SlowReveal from "./SlowReveal.svelte";
  import InChatButton from "./InChatButton.svelte";
  import Title from "./Title.svelte";
  import DataFrame from "./DataFrame.svelte";
  import Plotly from "./Plotly.svelte";
  import Thinking from "./Thinking.svelte";
  import SidebarToggleButton from "./SidebarToggleButton.svelte";
  import GreenButton from "./GreenButton.svelte";
  import TextInput from "./TextInput.svelte";
  import Error from "./Error.svelte";
  import CodeBlock from "./CodeBlock.svelte";
  import SqlInput from "./SqlInput.svelte";

  export let suggestedQuestions: MessageContents | null = null;
  export let messageLog: MessageContents[] = [];
  export let newQuestion: (question: string) => void;
  export let rerunSql: (id: string) => void;
  export let clearMessages: () => void;
  export let onUpdateSql: (sql: string) => void;
  export let question_asked: boolean;
  export let marked_correct: boolean | null;
  export let thinking: boolean;

  let inputValue = "";
  let pendingQuestion: string | null = null;
  let previousLength = 0;

  // 🔁 Reactively derive the current chat ID from hash
  $: chatId = location.hash || "#default";

  // ✅ Save the log into localStorage keyed by hash
  function saveToHistory(question: string, log: MessageContents[]) {
    let history: Record<string, { question: string; log: MessageContents[] }> =
      {};

    try {
      const existing = localStorage.getItem("chat_history");
      if (existing) {
        history = JSON.parse(existing);
      }
    } catch (e) {
      console.error("Failed to parse chat history", e);
    }

    history[chatId] = { question, log: [...log] };
    localStorage.setItem("chat_history", JSON.stringify(history));
  }

  // 👇 Called on submit
  function handleNewQuestion(question: string) {
    pendingQuestion = question;
    previousLength = messageLog.length;
    newQuestion(question);
    inputValue = "";
  }

  // 📦 Save to history when new message comes in
  $: {
    if (pendingQuestion && messageLog.length > previousLength) {
      saveToHistory(pendingQuestion, [...messageLog]);
      pendingQuestion = null;
      previousLength = messageLog.length;
    }
  }

  // 🔄 Load saved history on page mount based on hash
  onMount(() => {
    const historyStr = localStorage.getItem("chat_history");
    if (historyStr) {
      const history = JSON.parse(historyStr);
      if (history[chatId]) {
        messageLog = [...history[chatId].log];
      }
    }
  });
</script>

<div
  class="h-screen w-full lg:pl-80 flex flex-col bg-gray-50 dark:bg-slate-900"
>
  <div class="flex-1 overflow-y-auto px-4 pb-4">
    <Title />

    {#if suggestedQuestions && suggestedQuestions.type == "question_list" && !question_asked}
      <AgentResponse>
        <Text>
          <div class="mb-3 font-semibold text-slate-700 dark:text-slate-200">
            {suggestedQuestions.header}
          </div>
          <div class="flex flex-wrap gap-2">
            {#each suggestedQuestions.questions as question}
              <InChatButton message={question} onSubmit={handleNewQuestion} />
            {/each}
          </div>
        </Text>
      </AgentResponse>
    {/if}

    <ul class="mt-8 space-y-6">
      {#each messageLog as message}
        {#if message.type === "user_question"}
          <UserMessage message={message.question} />
        {:else if message.type === "sql"}
          <AgentResponse>
            <Text>
              <CodeBlock>
                <SlowReveal text={message.text} />
              </CodeBlock>
            </Text>
          </AgentResponse>
        {:else if message.type === "df"}
          <AgentResponse>
            <DataFrame id={message.id} df={message.df} />
          </AgentResponse>
        {:else if message.type === "plotly_figure"}
          <AgentResponse>
            <Plotly fig={message.fig} />
          </AgentResponse>
          <AgentResponse>
            <Text>Were the results correct?</Text>
            {#if marked_correct === null}
              <div class="flex gap-2 mt-2">
                <InChatButton
                  message="Yes"
                  onSubmit={() => (marked_correct = true)}
                />
                <InChatButton
                  message="No"
                  onSubmit={() => (marked_correct = false)}
                />
              </div>
            {/if}
          </AgentResponse>
          {#if marked_correct === true}
            <UserMessage message="Yes, the results were correct." />
          {:else if marked_correct === false}
            <UserMessage message="No, the results were not correct." />
          {/if}
        {:else if message.type === "error"}
          <AgentResponse>
            <Error message={message.error} />
          </AgentResponse>
        {:else if message.type === "question_cache"}
          <UserMessage message={message.question} />
          <AgentResponse>
            <Text><CodeBlock>{message.sql}</CodeBlock></Text>
          </AgentResponse>
          <AgentResponse>
            <DataFrame id={message.id} df={message.df} />
          </AgentResponse>
          <AgentResponse>
            <Plotly fig={message.fig} />
          </AgentResponse>
        {:else if message.type === "user_sql"}
          <UserMessage message="Put your SQL here">
            <SqlInput onSubmit={onUpdateSql} />
          </UserMessage>
        {/if}
      {/each}

      {#if thinking}
        <Thinking />
      {/if}
    </ul>
  </div>

  <footer
    class="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 sticky bottom-0 w-full z-10 p-4"
  >
    <div class="max-w-4xl mx-auto space-y-3">
      <SidebarToggleButton />
      {#if question_asked}
        <div class="flex gap-2">
          {#each messageLog as msg}
            {#if msg.type === "question_cache"}
              <GreenButton
                message="Re-Run SQL"
                onSubmit={() =>
                  msg.type === "question_cache" ? rerunSql(msg.id) : undefined}
              />
            {/if}
          {/each}
        </div>
      {/if}
      <div class="w-full">
        <TextInput
          onSubmit={handleNewQuestion}
          bind:value={inputValue}
          class="w-full"
        />
      </div>
    </div>
  </footer>
</div>
