## Hw4

### Goal

Connect with real world data from twitch

### Approach

The logic is quite simple.

1. search the streams for League of Legends using twitch API

1. retrieve user_id from the results of streams in order to get more detail about user

1. render results into HTML

In this assignment, I force myself using ES6 async/await writing style. If someone is interested, here is the good [reference](https://developers.google.com/web/fundamentals/primers/async-functions).

Also, in this scenario, I insert HTML into document rather than replacing the contents. Therefore, I choose to use ` insertAdjacentHTML().` [Ref](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)