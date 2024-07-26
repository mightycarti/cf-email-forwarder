# Cloudflare Email Worker Forwarder

Receive, parse, and forward emails to a webhook URL using Cloudflare Workers. This project allows you to convert Cloudflare email objects into .eml raw format and JSON.

## Features

- **Receive Emails:** Receive emails via Cloudflare Workers.
- **Parse Emails:** Convert Cloudflare email objects to `.eml` raw format and `JSON` for easy processing.
- **Forward Emails:** Send parsed emails to a specified webhook URL.

## Installation

### Install Wrangler

Wrangler is a command-line tool for building and managing Cloudflare Workers.

Install it as a dev dependency:
~~~bash
npm i wrangler --save-dev
~~~

Or install it globally:
~~~bash
npm i -g wrangler
~~~

### Clone the Repository

Clone the repository to your local machine:
~~~bash
git clone git@github.com:mightycarti/cf-email-forwarder.git
~~~

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:
~~~bash
npm i
~~~

## Usage

### Run Locally

To run the project locally, use Wrangler or npm:
~~~bash
wrangler dev
~~~
or
~~~bash
npm run dev
~~~

Then open `http://localhost:8787` in your browser.

### Deploy to Cloudflare Workers

Deploy your project to Cloudflare Workers with:
~~~bash
wrangler deploy
~~~
or
~~~bash
npm run deploy
~~~

Enjoy using the Cloudflare Email Worker Forwarder! If you have any questions or issues, feel free to open an issue on the repository. Happy coding!