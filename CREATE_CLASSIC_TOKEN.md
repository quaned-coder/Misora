# Create Classic Token (Not Fine-Grained)

## The Issue:
Fine-grained tokens have different permission structures. For Git operations, we need a **Classic Token**.

## Steps to Create Classic Token:

1. **Go to**: https://github.com/settings/tokens

2. **Look for "Personal access tokens"** section
   - You'll see two options:
     - **Tokens (classic)** ← We need this one!
     - Fine-grained tokens (what you created)

3. **Click "Tokens (classic)"**

4. **Click "Generate new token"** → **"Generate new token (classic)"**

5. **Fill in**:
   - **Note**: `Misora Development`
   - **Expiration**: Your choice
   - **Scopes**: Check ✅ **`repo`**
     - This will automatically check all repo permissions

6. **Scroll down and click "Generate token"**

7. **Copy the token** (starts with `ghp_` not `github_pat_`)

8. **Share the new token** and we'll push!

---

## Quick Link:
https://github.com/settings/tokens?type=beta

Then click "Tokens (classic)" tab at the top.
