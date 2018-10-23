## Hw8

### Goal

Using webpack to bundle all scripts

### Approach

**Why webpack? what is webpack?**

when the web app grows, we may have bunch of javascript files. We want to save requests to server.
With webpack, all javascript files css and other assets can be bundled as one file.
Also, webpack can save transmission time via minified codes without affecting logics.
Moreover, webpack builds a dependency graph. It will save us time if we have to maintain dependencies by ourselves.

**How to write webpack**

[The official doc](https://webpack.js.org/guides/getting-started/) gets really full documentation to fulfill my needs. 
Frankly speaking, I only read to [chapter: asset management](https://webpack.js.org/guides/asset-management/).