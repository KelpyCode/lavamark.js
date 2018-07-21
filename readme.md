# lavamark.js
A library to watermark text - invisibly!

## [See it in action!](https://codepen.io/xaotic/full/MBeaGR/)

## Wait what?
Yes! You can hide text inside text without your users noticing!

## But why?
There are a couple use cases to this.
* You generally want to hide text inside text
* You want to know _who_ has copied a text from your site
* thats actually every actual use case I've found so far for this

## How does it work?
lavamark.js uses invisible unicode characters to transform information. It puts it somewhere inside the given visible text. Incase users copy it, they will copy the watermark aswell, which makes you able to look it up.

--------
### Node.js
First off, install the package.
```bash
npm install --save lavamark
# or if you use yarn:
yarn add lavamark
```

Now you have to import the module:

```js
const lavamark = require("lavamark");
// or
import * as lavamark from "lavamark";
```

### Browser
Incase you want to use lavamark.js in the browser, import the script `/dist/main.browser.js`, either put it on your server or directly reference it from Github.

`index.html`
```html
<head>
    <script src="//github.com/XaoticLabs/lavamark.js/blob/master/dist/main.browser.js"></script>
    <script src="/example.js"></script>
</head>
```

`example.js`
```js
alert(
    lavamark.mark(
        "Hey, there's something hidden in this text!", 
        "And it is THIS!"
    )
);
```

--------
Now, you can use the `lavamark` variable and access its functions.

### Making a watermarked string
This is really easy! No really, its easier than stealing candies from a child.
```js
let visibleText = "This text will be displayed";
let hiddenText = "This text will be hidden inside the visible text";

lavamark.mark(visibleText, hiddenText); 
// -> returns watermarked text, which looks exactly like visibleText, but has the information of hiddenText

// Alternatively you can set an index, at which the information will be set
lavamark.mark(visibleText, hiddenText, 4);
```

### Reading out a watermarked string
This is pretty much just as easy. All you need is a string instance of an watermarked text. You may just copy-paste watermarked text into the code.

Unfortunately for the sake of ASCII support in this readme file, I will have to strip unicodes in the following example. (It does work fine though!)

```js
let watermarkedText = lavamark.mark("There totally isn't anything fishy going on with this string!", "that was a lie, i am very evil indeed");

lavamark.read(watermarkedText); // -> "that was a lie, i am very evil indeed"
```

### Checking if a watermark exists
```js
let str = lavamark.read(watermarkedText);

if(str === null)
    console.log("No watermark found!");
else
    console.log("Watermark found:", str);

```

--------

## References

* [Github Repo](https://github.com/XaoticLabs/lavamark.js)
* [NPM Package](https://www.npmjs.com/package/lavamark)
* [anti.team](https://anti.team)

## Credits
made by [anti.team](https://anti.team) - Xaotic

## License
This project uses the [MIT License](license.md).