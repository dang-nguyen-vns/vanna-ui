<script lang="ts">
  import TailwindCss from "./lib/TailwindCSS.svelte"; // This is necessary for tailwind to work
  import Sidebar from "./lib/Sidebar.svelte";
  import "preline";
  import { onMount } from "svelte";
  import Title from "./lib/Title.svelte";
  import AgentMessage from "./lib/AgentMessage.svelte";
  import UserMessage from "./lib/UserMessage.svelte";
  import TextInput from "./lib/TextInput.svelte";
  import SidebarToggleButton from "./lib/SidebarToggleButton.svelte";
  import InChatButton from "./lib/InChatButton.svelte";
  import AgentResponse from "./lib/AgentResponse.svelte";
  import ArbitraryAgentMessage from "./lib/ArbitraryAgentMessage.svelte";
  import SlowReveal from "./lib/SlowReveal.svelte";
  import type {
    ApiData,
    MessageContents,
    Method,
    Page,
    QuestionLink,
  } from "./lib/types.ts";
  import Thinking from "./lib/Thinking.svelte";
  import Text from "./lib/Text.svelte";
  import DataFrame from "./lib/DataFrame.svelte";
  import Plotly from "./lib/Plotly.svelte";
  import GreenButton from "./lib/ActionButton.svelte";
  import ChatPage from "./lib/ChatPage.svelte";
  import TrainingData from "./lib/TrainingData.svelte";
  import { v4 } from "uuid";

  let message = "Loading...";

  onMount(async () => {
    getQuestionHistory();

    // Load suggested questions immediately on mount
    newApiRequest("generate_questions", "GET", []).then(setSuggestedQuestions);

    // Check the URL to see what page we're on
    const url = new URL(window.location.href);
    const page = url.hash.slice(1);
    currentPage = "chat";
    window.location.hash = "#" + v4();

    // if (page === "training-data") {
    //   getTrainingData();
    // } else {
    //   currentPage = "chat";
    //   window.location.hash = "#" + v4();
    // }
  });

  let messageLog: MessageContents[] = [];
  let suggestedQuestions: MessageContents | null = null;
  let trainingData: MessageContents | null = null;
  let question_asked = false;
  let thinking = false;
  let marked_correct: boolean | null = null;

  let currentPage: Page;

  let questionHistory: QuestionLink[] = [];

  function clearMessages() {
    messageLog = [];
    question_asked = false;
    thinking = false;
    marked_correct = null;
  }

  import { tick } from "svelte";

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function playMessageSequence(messages: MessageContents[]) {
    for (const msg of messages) {
      console.log("Adding message", msg, new Date().toISOString());

      addMessage(msg);
      await tick();
      if (msg.type === "plotly_figure") await delay(2000);
      await delay(1000); // adjust delay as needed
    }
  }

  async function newQuestion(question: string) {
    const messages: MessageContents[] = [];

    messages.push({ type: "user_question", question });
    question_asked = true;

    const sqlMsg = await newApiRequest("generate_sql", "GET", { question });
    if (sqlMsg.type === "sql") {
      window.location.hash = sqlMsg.id;
      messages.push(sqlMsg);

      const dfMsg = await newApiRequest("run_sql", "GET", { id: sqlMsg.id });
      if (dfMsg.type === "df") {
        messages.push(dfMsg);

        const plotMsg = await newApiRequest("generate_plotly_figure", "GET", {
          id: dfMsg.id,
        });
        if (plotMsg.type === "plotly_figure") {
          messages.push(plotMsg);

          questionHistory = [...questionHistory, { question, id: plotMsg.id }];

          const followupMsg = await newApiRequest(
            "generate_followup_questions",
            "GET",
            { id: plotMsg.id }
          );

          messages.push(followupMsg);
        }
      }
    }

    await playMessageSequence(messages);
  }

  function rerunSql(id: string) {
    addMessage({ type: "user_question", question: "Re-run the SQL" });
    newApiRequest("run_sql", "GET", { id: id })
      .then(addMessage)
      .then((msg: MessageContents) => {
        if (msg.type === "df") {
          newApiRequest("generate_plotly_figure", "GET", { id: msg.id })
            .then(addMessage)
            .then((msg: MessageContents) => {
              if (msg.type === "plotly_figure") {
                newApiRequest("generate_followup_questions", "GET", {
                  id: msg.id,
                }).then(addMessage);
              }
            });
        }
      });
  }

  function getQuestionHistory() {
    newApiRequest("get_question_history", "GET", []).then(setQuestionHistory);
  }

  function getTrainingData() {
    window.location.hash = "training-data";
    currentPage = "training-data";

    newApiRequest("get_training_data", "GET", []).then(setTrainingData);
  }

  function newQuestionPage() {
    window.location.hash = "";
    currentPage = "chat";
    clearMessages();
  }

  function loadQuestionPage(id: string) {
    window.location.hash = id;
    currentPage = "chat";
    clearMessages();
    question_asked = true;
    newApiRequest("load_question", "GET", { id: id }).then(addMessage);
  }

  function removeTrainingData(id: string) {
    trainingData = null;
    newApiRequest("remove_training_data", "POST", { id: id }).then(
      (msg: MessageContents) => {
        newApiRequest("get_training_data", "GET", []).then(setTrainingData);
      }
    );
  }

  function addMessage(msg: MessageContents): MessageContents {
    messageLog = [...messageLog, msg];
    scrollToBottom();
    return msg;
  }

  function setTrainingData(data: MessageContents): MessageContents {
    trainingData = data;
    return data;
  }

  function setSuggestedQuestions(data: MessageContents): MessageContents {
    suggestedQuestions = data;
    return data;
  }

  function setQuestionHistory(data: MessageContents): MessageContents {
    if (data.type === "question_history") {
      questionHistory = data.questions;
    }

    return data;
  }

  function onTrain(trainingDataContents: string, trainingDataType: string) {
    trainingData = null;
    let args: { [key: string]: string } = {};
    args[trainingDataType] = trainingDataContents;
    newApiRequest("train", "POST", args)
      .then(setTrainingData)
      .then((msg: MessageContents) => {
        if (msg.type !== "error") {
          newApiRequest("get_training_data", "GET", []).then(setTrainingData);
        }
      });
  }

  async function newApiRequest(
    endpoint: string,
    method: Method,
    args: Object
  ): Promise<MessageContents> {
    try {
      // apiStatus = { status: 'Loading' };
      thinking = true;

      let queryString: string = "";
      let response: Response;

      // Generate query string from props
      if (method === "GET") {
        queryString = Object.entries(args)
          .filter(([key, _]) => key !== "endpoint" && key !== "addMessage") // Exclude 'endpoint' from the query string
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");

        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v0/${endpoint}?${queryString}`
        );
      } else {
        let jsonArgs = JSON.stringify(args);

        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v0/${endpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonArgs,
          }
        );
      }

      if (!response.ok) {
        throw new Error(
          "The server returned an error. See the server logs for more details."
        );
      }
      const data: MessageContents = await response.json();

      thinking = false;

      return data;
    } catch (error) {
      // apiStatus = { status: 'Error', error: "Put the error here" };
      thinking = false;

      return { type: "error", error: String(error) };
    }
  }

  function scrollToBottom() {
    // Delay for 100ms to allow the DOM to update
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  }

  function findQuestionSql() {
    let question = messageLog.find((msg) => msg.type === "user_question");
    if (question && question.type === "user_question") {
      let sql = messageLog.find((msg) => msg.type === "sql");
      if (sql && sql.type === "sql") {
        return { question: question.question, sql: sql.text };
      }
    }
    return null;
  }

  function onUpdateSql(sql: string) {
    let question = messageLog.find((msg) => msg.type === "user_question");
    if (question && question.type === "user_question") {
      let questionSql = { question: question.question, sql: sql };

      newApiRequest("train", "POST", questionSql);

      // Remove the user's SQL from the message log
      messageLog = messageLog.filter((msg) => msg.type !== "user_sql");

      // Add the user's SQL to the message log
      addMessage({ type: "sql", text: sql, id: window.location.hash });
    }
  }

  $: {
    if (marked_correct === true) {
      let questionSql = findQuestionSql();
      if (questionSql) {
        newApiRequest("train", "POST", questionSql);
      }
    } else if (marked_correct === false) {
      addMessage({ type: "user_sql" });
    }
  }
</script>

<main>
  <Sidebar
    {getTrainingData}
    {newQuestionPage}
    {loadQuestionPage}
    {questionHistory}
  />

  {#if currentPage === "chat"}
    <ChatPage
      {suggestedQuestions}
      {messageLog}
      {newQuestion}
      {rerunSql}
      {onUpdateSql}
      bind:question_asked
      bind:thinking
      bind:marked_correct
    />
  {:else if currentPage === "training-data"}
    <TrainingData {trainingData} {removeTrainingData} {onTrain} />
  {/if}
</main>
