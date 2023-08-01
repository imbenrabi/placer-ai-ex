# Placer EX - ROCKS

ROCKS is a web application that allows users to interact with Nasa's meteor data. 

## Installation

To install the necessary dependencies, run the following command from project root:

```bash
  yarn install
```

## Start Dev Server

To start the server, use the following command from project root:

```bash
  yarn run start:server
```

## Start Client

To start the client, use the following command from project root:

```bash
  yarn run start:client
```

## Features

- I took json data file as if database (excluding the async server queries) 
- trpc for server and clients
- debouncing free text requests
- NextUI as design system

## Roadmap -> (what would I improve) 

- server requests caching mechanism
- better tests coverage (adding more component tests and e2e)
- sorting
