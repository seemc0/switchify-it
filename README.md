# switchify-it
A simple, responsive content swapper for humans.

Project website (including an example): http://www.craigmcnaught.uk.to/switchify-it

# This is how you use it:
Download the Switchify-It package (1.27kb)
Extract it to your project folder
Link jQuery, switchify-it.min.js and switchify-it.css files in your document
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="js/switchify-it.min.js"></script>
<link href="css/switchify-it.css" rel="stylesheet" />
```
All you need are a few elements with the class "swap-content" and "swap-button", like so:
```<div class="swap-content" data-order="1">Initial content</div>
<div class="swap-content" data-order="2">Content After Button 1 is Clicked</div>
<div class="swap-content" data-order="3">Content After Button 2 is Clicked</div>

<button class="swap-button" data-order="1">Button 1</button>
<button class="swap-button" data-order="2">Button 2</button>
<button class="swap-button" data-order="3">Initial Content</button>
```
