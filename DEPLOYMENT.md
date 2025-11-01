# Deploying MCQ Testing Website to Netlify

This guide will help you deploy your MCQ testing website to Netlify.

## Prerequisites
- A Netlify account (free tier works fine)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
   - Click "Deploy site"

4. **Set Environment Variables** (if needed in future)
   - Go to Site settings → Environment variables
   - Add any required variables

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build your app**
   ```bash
   cd frontend
   yarn build
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod --dir=build
   ```

### Option 3: Drag and Drop (Quick Test)

1. **Build your app locally**
   ```bash
   cd frontend
   yarn build
   ```

2. **Drag and drop to Netlify**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `frontend/build` folder
   - Your site will be live instantly!

## Configuration File (Optional)

Create a `netlify.toml` file in your project root:

```toml
[build]
  base = "frontend"
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Important Notes

1. **This is a frontend-only app** - No backend server is needed since all processing happens in the browser using localStorage.

2. **CSV Processing** - The app processes CSV files entirely in the browser, so no server-side logic is required.

3. **Custom Domain** - After deployment, you can add a custom domain in Netlify settings.

4. **Environment Variables** - Currently, no environment variables are needed since the app doesn't connect to any backend services.

5. **SPA Routing** - The redirects rule in `netlify.toml` ensures that React Router works correctly on Netlify.

## Testing Your Deployment

1. After deployment, Netlify will provide you with a URL (e.g., `https://your-site-name.netlify.app`)
2. Test the following:
   - Upload a CSV file
   - Start and complete an exam
   - View results
   - Review answers
   - Download results

## Sample CSV File

A `sample_questions.csv` file is included in the root directory for testing purposes.

## Troubleshooting

- **Build fails**: Make sure all dependencies are listed in `package.json`
- **404 errors on refresh**: Add the redirects rule mentioned above
- **Blank page**: Check browser console for errors and ensure build completed successfully

## Support

For Netlify-specific issues, refer to [Netlify Documentation](https://docs.netlify.com/)
