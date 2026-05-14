# GitHub Remote Guide

This file explains the basic steps to add your local code to a GitHub remote repository and push changes.

## 1. Initialize Git (if needed)

If your project is not already a Git repository:

```bash
cd "c:\Users\hxsin\OneDrive\Desktop\Coding\Projects\Task Manager"
git init
```

## 2. Add a remote repository

Replace `<your-username>` and `<repo-name>` with your GitHub repo details:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
```

## 3. Add files and commit

```bash
git add .
git commit -m "Initial commit"
```

## 4. Push to GitHub

```bash
git push -u origin main
```

If your repo uses `master` instead of `main`, use:

```bash
git push -u origin master
```

## 5. Update an existing repo

If the remote already has commits, fetch and merge first:

```bash
git pull origin main --allow-unrelated-histories
```

git push -u origin main

## 6. Push later changes

After making more changes:

```bash
git add .
git commit -m "Describe changes"
git push
```

## 7. Useful commands

- `git status` — check current branch and changed files
- `git log --oneline` — view commit history
- `git remote -v` — show configured remotes
- `git branch` — see current branch

---

This guide helps you add code from your local Task Manager project to GitHub using a remote repository.
