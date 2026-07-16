LUMINA CLAN — ASSETS
=====================

HOW TO ADD YOUR LOGO
---------------------
1. Rename your logo file to exactly:   lumina-logo.webp
2. Drop it into this "assets" folder (same folder as this file).
3. Reload the site.

That's it — no code changes needed. The logo will automatically appear:
  - On the login screen (large, floating with a gentle animation)
  - On the home screen (small, above the title)

If no logo file is present, a themed placeholder icon (💠) is shown
instead, so the site never looks broken while you're getting your
artwork ready.

Tips:
  - Square images work best (e.g. 512x512).
  - Transparent background (.webp supports transparency) looks best
    against the dark Minecraft-style panels.
  - Want a different filename or format (.png, .svg)? Change the
    "LOGO_PATH" value in config.js and update the two <img src="..."> 
    references in index.html to match.

OTHER ASSETS
------------
Everything else (sounds, particles, backgrounds) is generated
procedurally with CSS/emoji/WebAudio — no external files required.
Feel free to drop custom PNG/OGG assets here later to replace the
built-in placeholders.
