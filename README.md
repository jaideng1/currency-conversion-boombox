# currency-conversion-boombox
Animate the Google currency conversion to the music.

Create a new bookmark on Chrome, and paste this link in:
```
javascript:(function(){ window.m_script = document.createElement("script"); window.m_script.setAttribute("src", "https://jaideng1.github.io/currency-conversion-boombox/main.js"); document.body.appendChild(window.m_script); window.m_script.addEventListener("load", () => { alert("Script has been loaded successfully."); window.m_script.setAttribute("src", "https://raw.githubusercontent.com/jaideng1/currency-conversion-boombox/main/main.js"); document.body.appendChild(window.m_script); window.m_script.addEventListener("error", (e) => { alert("There was an error loading the script."); console.warn(e); }) }); console.log("called"); })();
```

Whenever you're on the currency conversion page and press on the conversion, it'll load in the scripts. After loading, press on the "Load" button (the "Follow" button but edited) - this may not work if you're following the currency beforehand.

Accepts any audio file.
