# Publishing to GitHub

This guide will help you publish your Ultimate Pizza Dough Calculator to GitHub and set up GitHub Pages for hosting.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and npm installed

## Steps to Publish

### 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository `ultimate-pizza-dough-calculator`
4. Add a description (optional)
5. Choose whether to make it public or private
6. Do not initialize the repository with a README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Initialize Git in Your Local Project

If you haven't already initialized Git in your project, run:

```bash
git init
```

### 3. Update Repository Information

Make sure your package.json has the correct repository information:

1. Open package.json
2. Update the repository URL to match your GitHub username:
   ```json
   "repository": {
     "type": "git",
     "url": "git+https://github.com/YOUR_USERNAME/ultimate-pizza-dough-calculator.git"
   },
   "homepage": "https://YOUR_USERNAME.github.io/ultimate-pizza-dough-calculator",
   ```

### 4. Update Vite Configuration

Make sure your vite.config.ts has the correct base path:

```typescript
base: process.env.NODE_ENV === 'production' ? '/ultimate-pizza-dough-calculator/' : '/',
```

### 5. Commit Your Code

```bash
git add .
git commit -m "Initial commit"
```

### 6. Add Remote Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/ultimate-pizza-dough-calculator.git
```

### 7. Push to GitHub

```bash
git push -u origin main
```

## Setting Up GitHub Pages

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "GitHub Actions"

### 2. Wait for Deployment

The GitHub Actions workflow will automatically build and deploy your site when you push to the main branch.

1. Go to the "Actions" tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once completed, your site will be available at `https://YOUR_USERNAME.github.io/ultimate-pizza-dough-calculator/`

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check the GitHub Actions logs for details
2. Make sure all dependencies are correctly installed
3. Verify that your code builds locally with `npm run build`

### 404 Errors

If you see 404 errors when navigating your deployed site:

1. Make sure the base path in vite.config.ts is correct
2. Check that the GitHub Pages source is correctly set
3. Ensure the repository name matches the path in your configuration

## Custom Domain (Optional)

To use a custom domain:

1. Go to your repository settings
2. Scroll down to the "GitHub Pages" section
3. Under "Custom domain", enter your domain name
4. Update the base path in vite.config.ts to '/'
5. Follow GitHub's instructions for configuring DNS records 