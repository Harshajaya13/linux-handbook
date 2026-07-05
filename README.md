# Linux Handbook

> "I didn't reset Ubuntu because Linux was hard.  
> I reset Ubuntu because I forgot what I had already figured out."

---

## The Identity

> **"This repository is not a collection of software. It is a collection of solved problems."**

This is our defining identity. We are not a package catalog, an app list, or static documentation. We exist to preserve and share the solutions earned through real experience.

---

## Why This Exists

This project was born from frustration. 

Like many Linux users, I would install an application, spend hours making it work, finally solve the problem... and a few months later, reinstall my system. Then everything started again.

- *Which package did I install? Was it apt, Flatpak, or AppImage?*
- *Why did Wayland break this application, and why did I need XWayland?*
- *Which configuration file did I edit?*
- *How did I fix that strange error?*

Those answers were never in one place. Some were on GitHub, some inside Reddit threads, some on StackOverflow, and others inside the ArchWiki or hidden deep in my terminal history.

The hardest part of Linux isn't finding software. It's remembering the journey. **Linux Handbook exists to preserve that journey.**

---

## Our Mission

Help someone go from:
> "I need this software."

to:
> "It's working."

**...without leaving the page.** Nothing more, nothing less.

---

## Why Linux Handbook?

Linux already has excellent resources: the ArchWiki, official documentation, GitHub Issues, Reddit, StackOverflow, and package managers. They all solve part of the problem.

**Linux Handbook connects those pieces into a single, cohesive workflow:**

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
- How do I fix it?
- How do I verify that it is fixed?

### 4. Never Make the User Leave the Page
If installing or configuring an application requires opening multiple GitHub issues, Reddit posts, or blog articles, the playbook has failed.

### 5. Linux Should Feel Approachable
Linux already has enough complexity. The interface should reduce anxiety, not increase it. It must feel quiet, calm, and helpful.

---

## What Makes Us Different?

* **We don't collect software; we document journeys.** Every page is written from actual installation experience—not copied from documentation, package indexes, or AI generators. Someone actually installed it, broke it, fixed it, and wrote the playbook.
* **We verify guides.** Every guide clearly states the tested distribution, version, desktop environment, session type (Wayland/X11), and last verification date.
* **We explain *why*, not just *how*.** Instead of blindly showing commands, we explain the reasoning behind the method (e.g., why choose apt over Flatpak, or vice-versa) so that the user is never left in doubt.

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

---

## A Note to Future Developers

One day, this repository will contain hundreds of applications. Maybe thousands. 

Some of the original maintainers will move on, and new contributors will arrive. If you are reading this years from now, thank you.

Every correction, every command, every verified installation, and every bug fix helps someone you will probably never meet. Someone is sitting in front of a terminal late at night, trying to make something work. 

If one page in this repository saves them an hour or gives them the confidence to keep using Linux, then this project has succeeded.

Let's leave Linux a little easier than we found it.
