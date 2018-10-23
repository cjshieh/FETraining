## Hw5

### Goal

Add placeholder and infinite scroll

### Approach

**placeholder**

Adding placeholder is to avoid disrupting the content. We could set image container with arbitrary width and height.
But to let user know it will be an image, I choose to put an placeholder image.

There are two approaches to define image container.
- create a `<div>` or set pesudo-element `::before`

I choose pesudo-element. So that it could manipulate less DOM operations.

**infinite scroll**
We need to know whether user scroll down to the page. If it is, we request data again.
However, to avoid multiple requests, we add a control flag. If data is loading, we won't ask again.
