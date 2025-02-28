# Fixing Telegram Thumbnails

Telegram has specific requirements for displaying link previews with thumbnails. Follow these steps to ensure your thumbnail appears when sharing your website on Telegram.

## Common Issues with Telegram Thumbnails

1. **Image Format**: Telegram prefers JPG/JPEG or PNG images with proper MIME types.
2. **Image Size**: Telegram works best with images between 300x300 and 1200x630 pixels.
3. **Caching**: Telegram aggressively caches link previews.
4. **URL Requirements**: Telegram requires absolute URLs with proper domain names.
5. **HTTPS**: Telegram requires secure HTTPS connections.

## Step-by-Step Solution

### 1. Convert Your Thumbnail to JPG Format

While PNG works for most platforms, Telegram sometimes has better compatibility with JPG:

1. Open your `pizza-thumbnail.png` in an image editor
2. Save it as `pizza-thumbnail.jpg` with high quality (90-100%)
3. Place it in your `/public` folder

### 2. Update Your HTML to Include Both Formats

```html
<meta property="og:image" content="https://ultimatepizzadough.xyz/pizza-thumbnail.jpg" />
<meta property="og:image:type" content="image/jpeg" />
```

### 3. Clear Telegram's Cache

Telegram caches link previews aggressively. To force Telegram to fetch a fresh version:

1. Add a query parameter to your URL when sharing:
   ```
   https://ultimatepizzadough.xyz?v=1
   ```
2. Increment the version number each time you want to test a new change.

### 4. Use Telegram's Instant View Debug Tool

Telegram has a tool to debug link previews:

1. Go to https://instantview.telegram.org/
2. Enter your website URL
3. Check if there are any issues with your Open Graph tags

### 5. Verify Image Accessibility

Make sure Telegram can access your image:

1. Open your image URL directly in a browser: 
   ```
   https://ultimatepizzadough.xyz/pizza-thumbnail.png
   ```
2. If it doesn't load, check your server configuration

### 6. Check Image Dimensions

Telegram works best with these dimensions:
- Minimum: 300x300 pixels
- Recommended: 1200x630 pixels (Facebook's recommended size)
- Maximum: 5000x5000 pixels

### 7. Test with a Different Device or Account

Sometimes the issue might be specific to your Telegram client or account. Try:
1. Sharing the link from a different device
2. Asking a friend to share the link
3. Using Telegram Web instead of the mobile app

## Advanced Solutions

If the above steps don't work, try these advanced solutions:

### 1. Add Schema.org Markup

Add structured data to your page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ultimate Pizza Dough Calculator",
  "description": "Calculate the perfect pizza dough recipe for any style and size.",
  "image": "https://ultimatepizzadough.xyz/pizza-thumbnail.jpg"
}
</script>
```

### 2. Use a Different CDN for Your Image

If your hosting provider has issues with Telegram's crawler:

1. Upload your image to a service like Imgur or Cloudinary
2. Update your Open Graph tags to use that URL

### 3. Check Server Response Headers

Make sure your server sends the correct Content-Type headers:

- For PNG: `Content-Type: image/png`
- For JPG: `Content-Type: image/jpeg`

## Still Having Issues?

If you're still experiencing problems, try:

1. Using a simpler image with less detail
2. Reducing the image file size (aim for under 300KB)
3. Testing with a completely different image to rule out image-specific issues
4. Checking if your domain is blocked or restricted by Telegram 