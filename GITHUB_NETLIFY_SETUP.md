# Setting Up GitHub Actions with Netlify

This guide explains how to set up GitHub Actions to automatically deploy your project to Netlify when you push changes to your repository.

## Prerequisites

- GitHub repository with your project
- Netlify account with your site already set up
- Admin access to both GitHub repository and Netlify site

## Step 1: Get Your Netlify API Credentials

1. Log in to your Netlify account
2. Go to User Settings > Applications > Personal access tokens
3. Click "New access token"
4. Give it a description (e.g., "GitHub Actions")
5. Copy the generated token - you'll need it for the next step

Next, get your Netlify Site ID:

1. Go to your site settings in Netlify
2. Find your Site ID (API ID) in the Site information section
3. Copy this ID - you'll need it for the next step

## Step 2: Add Secrets to Your GitHub Repository

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: [Your Netlify personal access token]
5. Click "Add secret"
6. Add another secret:
   - Name: `NETLIFY_SITE_ID`
   - Value: [Your Netlify site ID]
7. Click "Add secret"

## Step 3: GitHub Actions Workflow

This repository already includes a GitHub Actions workflow file at `.github/workflows/netlify.yml` that will:

1. Build your project when you push to the main branch or create a pull request
2. Deploy the built site to Netlify
3. Add deployment comments to pull requests

The workflow uses the following GitHub Actions:
- `actions/checkout`: Checks out your repository
- `actions/setup-node`: Sets up Node.js
- `nwtgck/actions-netlify`: Deploys to Netlify

## Step 4: Push Changes to Trigger Deployment

1. Make changes to your project
2. Commit and push to GitHub
3. GitHub Actions will automatically build and deploy your site to Netlify

You can monitor the workflow in the "Actions" tab of your GitHub repository.

## Pull Request Previews

When you create a pull request, GitHub Actions will:
1. Build your project with the changes
2. Deploy a preview to Netlify
3. Add a comment to the pull request with the preview URL

This allows you to test changes before merging them into the main branch.

## Troubleshooting

If deployments fail, check:
1. GitHub Actions logs in the "Actions" tab
2. Netlify deploy logs in your Netlify dashboard
3. That your secrets are correctly set up
4. That your build command and publish directory are correct in the workflow file

## Additional Resources

- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [actions-netlify Documentation](https://github.com/nwtgck/actions-netlify) 