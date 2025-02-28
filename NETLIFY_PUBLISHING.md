# Publishing to Netlify

This guide will help you publish your Ultimate Pizza Dough Calculator to Netlify for hosting while using GitHub for version control.

## Prerequisites

- A GitHub account
- A Netlify account
- Git installed on your local machine
- Node.js and npm installed

## Steps to Publish

### 1. GitHub Repository Setup

1. Create or use your existing GitHub repository
2. Make sure your code is committed and pushed to GitHub
3. Ensure your repository is public or that you have connected Netlify to your GitHub account

### 2. Connect Netlify to GitHub

1. Go to [Netlify](https://app.netlify.com/) and sign in to your account
2. Click on "Add new site" > "Import an existing project"
3. Select GitHub as the Git provider
4. Authenticate with GitHub if prompted
5. Select your repository from the list

### 3. Configure Build Settings

1. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
2. Click "Deploy site"

### 4. Configure Site Settings

After the initial deployment, you can configure various aspects of your site:

1. **Custom Domain**:
   - Go to "Site settings" > "Domain management"
   - Click on "Add custom domain"
   - Follow the instructions to set up your domain

2. **Site Name**:
   - Go to "Site settings" > "General" > "Site details"
   - Click "Change site name"
   - Enter a preferred name to get a URL like `your-site-name.netlify.app`

3. **Environment Variables** (if needed):
   - Go to "Site settings" > "Build & deploy" > "Environment"
   - Add any environment variables your application needs

### 5. Continuous Deployment

With the GitHub integration, Netlify will automatically:
- Deploy when you push to your main branch
- Create preview deployments for pull requests
- Allow you to roll back to previous deployments

To customize this behavior:
1. Go to "Site settings" > "Build & deploy" > "Continuous deployment"
2. Configure branch deploy settings, build hooks, etc.

## Netlify Configuration Files

This project includes the following Netlify configuration files:

### 1. `netlify.toml`

This file in the root directory configures build settings, redirects, and headers:

```toml
[build]
  command = "npm run build"
  publish = "dist"

# Handle SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Enable HTTPS security headers
[[headers]]
  for = "/*"
  [headers.values]
    # Security headers...
```

### 2. `_redirects`

Located in the `public` folder, this file ensures proper routing for the single-page application:

```
/* /index.html 200
```

## Netlify Features to Consider

### 1. Netlify Forms

If you want to add a contact form to your site, you can use Netlify Forms by adding the `netlify` attribute to your form:

```html
<form name="contact" netlify>
  <!-- form fields -->
</form>
```

### 2. Netlify Functions

For serverless functions, you can use Netlify Functions:

1. Create a `netlify/functions` directory
2. Add your serverless functions there
3. They will be automatically deployed with your site

### 3. Deploy Previews

Netlify automatically creates deploy previews for pull requests, allowing you to:
- Preview changes before merging
- Share preview links with collaborators
- Test changes in a production-like environment

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check the Netlify deployment logs
2. Make sure all dependencies are correctly installed
3. Verify that your code builds locally with `npm run build`

### 404 Errors on Routes

If you see 404 errors when navigating your deployed site:

1. Make sure the redirects are properly configured
2. Check that your router is configured correctly

### Mixed Content Warnings

If you get mixed content warnings:

1. Make sure all your resources (images, scripts, etc.) use HTTPS
2. Check for hardcoded HTTP URLs in your code

## Monitoring and Analytics

1. Netlify provides basic analytics for your site
2. You can also integrate with Google Analytics as you've already set up 