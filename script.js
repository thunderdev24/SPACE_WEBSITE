
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("musicOn") === "true") {
        music.currentTime = localStorage.getItem("musicTime") || 0;
        music.muted = false;

        const playNow = () => {
            music.play().then(() => {
                btn.innerText = "⏸ Music OFF";
            }).catch(()=>{});
        };

        if (music.readyState >= 3) {
            playNow();
        } else {
            music.addEventListener("canplay", playNow, { once: true });
        }
    }
});

// Button toggle
btn.onclick = () => {
    if (music.paused) {
        music.muted = false;
        music.play();
        btn.innerText = "⏸ Music OFF";
        localStorage.setItem("musicOn", "true");
    } else {
        music.pause();
        btn.innerText = "🔊 Music ON";
        localStorage.setItem("musicOn", "false");
    }
};

// Save time frequently
setInterval(() => {
    if (!music.paused) {
        localStorage.setItem("musicTime", music.currentTime);
    }
}, 500);

