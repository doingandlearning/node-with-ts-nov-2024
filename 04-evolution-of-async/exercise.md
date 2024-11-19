**Exercise: Web Crawler**

You're tasked to write a simple web crawler that fetches information from a public API and then fetches further data based on the initial fetch.

1. Use the `swapi.dev` API. First, fetch a random person (`https://swapi.dev/api/people/{random_id}`) or accept an id as a command line argument (process.argv).

2. Once you get the person's data, populate the rest (or some of the rest) of the data fields. An example is the `homeworld` property of the person's data which is a URL.

3. Fetch the supplementary details and enrich the data object from the provided URLs.

- Promise.all([])

4. Either print to the console, write to a file.

While you could write up to three versions of this web crawler, I'd suggest the most relevant would be c:

a) Using callbacks.
b) Using promises.
c) Using async/await.

Ensure you handle any potential errors at each step, including handling cases where a person or planet does not exist. You can simulate longer delays using `setTimeout` to make the asynchrony more noticeable. This API can be quite slow though, so that may not be a problem.

_Bonus_: Make the fetch request abortable. If the request takes longer than 5 seconds, it should be aborted.
