## Hw1
---

### Goal

Mimic twitch UI

### Approach

Before I learn `flexbox`, I will postion all element. This is a very bad idea. 
It will hard to maintain in the future.

After I read flexbox chapter from tutorial page: [HTML & CSS IS HARD](https://internetingishard.com/html-and-css/flexbox/), code becomes more neatly.

Here is my step to approach this:

1. Create a component for one channel, copy it 9 times

2. Group all component and set the width with `1200px` and set flex container with `flex-wrap: wrap` in order to show only 3 channels in one row.

Although the layout is silimar to the goal, there is a gap between image and lower element: ![Imgur](https://i.imgur.com/YIa0ZSS.png)

To solve this, I set image's `diaply:block`.

### Extra question to answer:

1. List all `position` property:

    static, relative, fixed, absolute, sticky

1. What is the difference?

    
1.  Please compare three different `display` values

1. In which HTML elements are `inline` and which are `block`

1. If a element's `width` is `300px` and we add `padding: 10px`, what it the final `width` of this element?

1. How do we display `...` after a `<p>` when its content is overflow?