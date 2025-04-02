# @vanna/svelte

A Svelte component library for building Vanna UIs.

## Installation

```bash
npm install @vanna/svelte
```

## Usage

```svelte
<script>
  import { TextInput, ChatPage, DataFrame } from '@vanna/svelte';
</script>

<ChatPage>
  <TextInput />
  <DataFrame />
</ChatPage>
```

## Components

### AgentMessage

A component for displaying agent messages in the chat interface.

### AgentResponse

Renders agent responses with support for various content types.

### ChatPage

Main container component for the chat interface.

### CodeBlock

Displays code snippets with syntax highlighting.

### DataFrame

Renders data in a tabular format.

### DownloadButton

A button component for downloading content.

### Feedback

Component for collecting user feedback.

### GreenButton

A styled button component.

### InChatButton

Interactive button component for in-chat actions.

### NewTrainingData

Component for handling new training data input.

### Plotly

Wrapper for Plotly.js charts.

### Sidebar

Navigation sidebar component.

### SqlInput

SQL query input component with syntax highlighting.

### TextInput

Text input component with various styling options.

### Title

Page title component.

### TrainingData

Component for displaying and managing training data.

## Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## License

See LICENSE file

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.
