# Linux Handbook

> **"This repository is not a collection of software. It is a collection of solved problems."**

---

## Why This Exists

This project was born from a familiar frustration. 

Like many Linux users, you install an application, spend hours making it work, finally solve the problem... and a few months later, reinstall your system. Then everything starts over.

You spend a Saturday getting a Wayland app working, forget which environment variable fixed it, and are back to square one after the next reinstall. Those answers were never in one place—some were on GitHub, some inside Reddit threads, some on StackOverflow, and others buried deep in terminal history.

We don't scrape package indexes or use AI generators; we document the journey: what broke, why it broke, and the exact command that fixed it.

---

## How It Works

Linux already has excellent resources: the ArchWiki, official documentation, GitHub Issues, Reddit, and package managers. They all solve part of the problem.

Linux Handbook connects those pieces into a single, cohesive workflow:

```
Need software
      ↓
Choose the right alternative
      ↓
Install it
      ↓
Verify it
      ↓
Configure it
      ↓
Fix common problems
      ↓
Remove it cleanly
```

All of this happens in one place, without opening ten browser tabs.

---

## Our Philosophy

### 1. Search First
The homepage is the search bar. If you know what you need, you shouldn't have to browse through ten nested categories.

### 2. Commands Before Explanations
People visit playbooks to take action. Documentation supports commands; commands do not exist to support documentation. 

### 3. Every Problem Deserves a Fix
Every problem card must address:
- What happened?
- Why did it happen?
- How to fix it?
- How to verify that it is fixed?

### 4. Never Make the User Leave the Page
If installing or configuring an application requires opening multiple GitHub issues, Reddit posts, or blog articles, the playbook has failed.

### 5. Linux Should Feel Approachable
The interface should reduce anxiety, not increase it. It must feel quiet, calm, and helpful.

---

## For Contributors

### Write from Experience
Don't copy documentation. Use the software, break it, fix it, and then document the fix. The best playbooks are written by people who have already made the mistakes.

### Remove Confusion
When contributing, don't ask: *"What information can I add?"* Instead, ask: *"What confusion can I remove?"* Every command should reduce uncertainty, and every explanation should remove doubt.

### The Standard
Before publishing a guide, ask yourself:
> If someone reinstalls Linux tomorrow, can they completely install and configure this software using only this page?

If the answer is yes, it's ready.

One good playbook always helps someone.
