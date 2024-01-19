
# Layoff Detector System Server

## Front End Link and Project Demo 

<a href = "https://github.com/saksham1236/saksham-tandon-capstone-lws-front-end">https://github.com/saksham1236/saksham-tandon-capstone-lws-front-end</a>


## Demo

Coming soon 😊


### Run Locally

Clone the project

```bash
  git clone https://github.com/saksham1236/saksham-tandon-capstone-lws-server
```

Go to the project directory

```bash
  cd /**folder that you cloned**/
```

Install dependencies

```bash
  npm install
```

Start the React Server

```bash
  nodemon exec
```


## API Reference

#### Get the full List

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /search/${companyName}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `search`      | `string` | **Required**. Search Query for fetching a specific list for the company with queried string |
