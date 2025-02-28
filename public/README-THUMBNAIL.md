# Thumbnail Generation Instructions

For better compatibility with social media platforms and messaging apps, it's recommended to convert the SVG thumbnail to PNG format.

## How to Generate a PNG Thumbnail

1. **Option 1: Using a Web Browser**
   - Open the `pizza-thumbnail.html` file in a web browser
   - Take a screenshot of the page (make sure to capture the entire container)
   - Crop the screenshot to the container boundaries
   - Save the image as `pizza-thumbnail.png` in the `public` folder
   - Update the `index.html` file to use the PNG instead of SVG for the Open Graph image tags

2. **Option 2: Using Online Converters**
   - Upload the `pizza-thumbnail.svg` file to an online SVG to PNG converter
   - Download the PNG file and save it as `pizza-thumbnail.png` in the `public` folder
   - Update the `index.html` file to use the PNG instead of SVG for the Open Graph image tags

3. **Option 3: Using Command Line Tools**
   If you have Node.js installed, you can use tools like `svg2png`:
   ```
   npm install -g svg2png
   svg2png public/pizza-thumbnail.svg public/pizza-thumbnail.png
   ```

## Updating the HTML File

After generating the PNG, update the `index.html` file by changing:

```html
<meta property="og:image" content="/pizza-thumbnail.svg" />
<meta name="twitter:image" content="/pizza-thumbnail.svg" />
```

to:

```html
<meta property="og:image" content="/pizza-thumbnail.png" />
<meta name="twitter:image" content="/pizza-thumbnail.png" />
```

## Why PNG is Preferred for Social Media

While SVGs are great for web use, many social media platforms and messaging apps have limited support for SVG files as Open Graph images. Using a PNG ensures maximum compatibility across different platforms. 