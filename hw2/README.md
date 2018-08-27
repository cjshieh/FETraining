## Hw2

### Goal

Add animation while hovering each channel

### Approach

Just add `transition: <property> <duration> <timing-function>` in the target element.

so the final CSS will be
``` css
.outer {

 transition: box-shadow 0.5s ease-in, filter 0.5s ease-in;
}

.outer:hover {
  box-shadow: 10px 5px 5px rgba(83, 74, 74, 0.5);
  filter: brightness(150%);
```

More about [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) and [filter](https://css-tricks.com/almanac/properties/f/filter/)

### Extra self practice question:

1. If we want to trigger transition after hovering for 1 sec, how do we do?

    add `transition-delay: 1s` in `.outer:hover`

1. Why do we need to avoid using `transition: all`? 

    For performance issue, we just need to choose which property to do transition.