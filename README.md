# Wordle Word Finder

Simple app that finds 5 letter words given the good letters, bad letters, and letter positions.

## Setup

```bash
pnpm install
```

Download the english words file from https://github.com/dwyl/english-words

```bash
npm run words:download
```

Filter words that are not 5 letters and contains non-letter characters

```bash
npm run words:filter
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
