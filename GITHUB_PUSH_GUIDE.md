# Complete Guide: Push to GitHub

## Step 1: Install Git

1. **Download Git for Windows**:
   - Go to: https://git-scm.com/download/win
   - Download the installer (it will auto-detect 64-bit)
   - Run the installer

2. **Installation Settings** (use defaults, but make sure):
   - ✅ "Git from the command line and also from 3rd-party software"
   - ✅ "Use the OpenSSL library"
   - ✅ "Checkout Windows-style, commit Unix-style line endings"
   - ✅ "Use Windows' default console window"
   - ✅ "Enable file system caching"

3. **Restart Cursor/VS Code** after installation

4. **Verify installation**:
   - Open a new terminal in Cursor
   - Run: `git --version`
   - Should show something like: `git version 2.x.x`

---

## Step 2: Configure Git (First Time Only)

Open a terminal in Cursor and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

(Replace with your actual name and email - this will be used for commits)

---

## Step 3: Create GitHub Account (If You Don't Have One)

1. Go to: https://github.com
2. Click "Sign up"
3. Create your account (use email or GitHub signup)

---

## Step 4: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Click the "+" icon** in the top right → **"New repository"**
3. **Repository settings**:
   - Repository name: `Misora` (or whatever you prefer)
   - Description: "Skincare product tracker web app" (optional)
   - Visibility: **Public** or **Private** (your choice)
   - ⚠️ **DO NOT** check:
     - ❌ "Add a README file"
     - ❌ "Add .gitignore"
     - ❌ "Choose a license"
   - (We already have these files)
4. **Click "Create repository"**

---

## Step 5: Push Your Code

After creating the repository, GitHub will show you commands. But here's what to run in your Cursor terminal:

### 5a. Initialize Git (if not already done):
```bash
git init
```

### 5b. Add all files:
```bash
git add .
```

### 5c. Create first commit:
```bash
git commit -m "Initial commit: MISORA skincare tracker app"
```

### 5d. Rename branch to main:
```bash
git branch -M main
```

### 5e. Connect to GitHub (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/Misora.git
```

### 5f. Push to GitHub:
```bash
git push -u origin main
```

**Note**: You'll be prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - See below for how to create one

---

## Step 6: Create Personal Access Token (For Password)

GitHub no longer accepts passwords. You need a token:

1. **Go to GitHub** → Click your profile picture → **Settings**
2. **Scroll down** → **Developer settings** (left sidebar)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. **Settings**:
   - Note: "Misora Development"
   - Expiration: Choose (90 days or No expiration)
   - **Scopes**: Check ✅ **`repo`** (this gives full repository access)
6. **Click "Generate token"**
7. **Copy the token immediately** (you won't see it again!)
8. **Use this token as your password** when pushing

---

## Quick Command Summary

Once Git is installed and configured:

```bash
# In your Misora project directory
git init
git add .
git commit -m "Initial commit: MISORA skincare tracker app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Misora.git
git push -u origin main
```

---

## Troubleshooting

**"git: command not found"**
- Git isn't installed or not in PATH
- Restart Cursor after installing Git

**"Authentication failed"**
- Use Personal Access Token, not password
- Make sure token has `repo` scope

**"Repository not found"**
- Check the repository name matches
- Make sure you created the repo on GitHub first
- Verify your username is correct

**"Permission denied"**
- Check your GitHub username is correct
- Make sure you have access to the repository

---

## After Pushing

Once your code is on GitHub:
1. ✅ Your code is backed up
2. ✅ Ready to deploy to Vercel
3. ✅ Can continue making changes and pushing updates

## Next Steps After Push

1. Deploy to Vercel (connect GitHub repo)
2. Add environment variables in Vercel
3. Your app will be live!
