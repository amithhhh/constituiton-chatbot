#!/bin/bash

echo "🚀 Starting structured Git commits..."

# Initialize git if not already
if [ ! -d ".git" ]; then
  git init
  echo "📁 Git initialized"
fi

# Stage everything first (baseline commit)
echo "📦 Creating base commit..."
git add .
git commit -m "chore: initial project structure (frontend + backend)"

# Backend commit
echo "🧠 Committing backend..."
git rm -r --cached frontend/ 2>/dev/null
git add backend/
git commit -m "backend: initial API and ML pipeline setup"

# Frontend commit
echo "🎨 Committing frontend..."
git rm -r --cached backend/ 2>/dev/null
git add frontend/
git commit -m "frontend: initial UI and chat interface setup"

echo "✅ Structured commits completed!"
git log --oneline
