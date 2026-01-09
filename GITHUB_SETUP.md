# Pushing to GitHub - Step by Step Guide

## Step 1: Install Git (if not already installed)

### Windows:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer (use default settings)
3. Restart your terminal/Cursor after installation

### Verify installation:
Open a new terminal and run:
```bash
git --version
```

## Step 2: Configure Git (first time only)

Set your name and email (replace with your GitHub info):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

In your project directory (Misora), run:
```bash
git init
```

## Step 4: Add All Files

```bash
git add .
```

## Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Misora skincare tracker app"
```

## Step 6: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it `Misora` (or whatever you prefer)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 7: Connect and Push

GitHub will show you commands, but here they are:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Misora.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

You'll be prompted for your GitHub username and password (or use a Personal Access Token).

## Step 8: Set Up GitHub Codespaces (Optional)

After pushing:
1. Go to your repository on GitHub
2. Click the green **Code** button
3. Select **Codespaces** tab
4. Click **Create codespace on main**

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository → Select your Misora folder
4. Click "Publish repository" button

## Troubleshooting

**If you get authentication errors:**
- GitHub no longer accepts passwords for HTTPS
- Use a Personal Access Token instead:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use the token as your password when pushing

**If you want to use SSH instead:**
```bash
# Use SSH URL instead
git remote add origin git@github.com:YOUR_USERNAME/Misora.git
```
