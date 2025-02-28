# iOS Icon Generation Instructions

For iOS home screen icons to work properly, they need to be in PNG format. This README provides instructions on how to convert the SVG icons to PNG format.

## Converting SVG to PNG

### Option 1: Using a Web Browser

1. Open each SVG file in a web browser (Chrome, Firefox, Safari, etc.)
2. Right-click on the image and select "Save Image As..."
3. Save the file with the same name but change the extension from `.svg` to `.png`
4. Place all PNG files in the `public` folder

### Option 2: Using Online Converters

1. Use an online SVG to PNG converter like [Convertio](https://convertio.co/svg-png/) or [SVG2PNG](https://svgtopng.com/)
2. Upload each SVG file and download the corresponding PNG
3. Make sure to maintain the same dimensions and filenames (just change the extension)

### Option 3: Using Command Line Tools

If you have Node.js installed, you can use tools like `svg2png`:

```bash
npm install -g svg2png
svg2png public/apple-icon.svg public/apple-icon.png
svg2png public/apple-icon-152.svg public/apple-icon-152.png
svg2png public/apple-icon-167.svg public/apple-icon-167.png
svg2png public/apple-icon-180.svg public/apple-icon-180.png
```

## Required PNG Files

You need to convert the following SVG files to PNG:

1. `apple-icon.svg` → `apple-icon.png`
2. `apple-icon-152.svg` → `apple-icon-152.png`
3. `apple-icon-167.svg` → `apple-icon-167.png`
4. `apple-icon-180.svg` → `apple-icon-180.png`

## Why PNG is Required for iOS

While SVGs are great for web use, iOS requires PNG format for home screen icons. SVG icons will not display correctly when a web app is added to the home screen on iOS devices. 