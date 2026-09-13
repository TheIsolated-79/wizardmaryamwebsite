document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const show = (element) => {
        if (element) element.classList.add("visible");
    };

    const hide = (element) => {
        if (element) element.classList.remove("visible");
    };


    const websiteCat = $("#website-cat");
    const websiteCatMessage = $("#website-cat-message");
    const themeToggle = $("#theme-toggle");
    const metaThemeColor = $("meta[name='theme-color']");
    const catMeowAudio = new Audio();
    const catSounds = [
        "assets/deepmeow.mp3",
        "assets/meowww.mp3",
        "assets/miumiumiumiu.mp3",
        "assets/meowryam.mp3",
        "assets/meow1.mp3"
    ];
    let catTalkTimer = null;

    const catSay = (message) => {

        if (!websiteCat || !websiteCatMessage) return;

        websiteCatMessage.textContent = message;
        websiteCat.classList.add("is-talking", "is-pouncing");

        clearTimeout(catTalkTimer);

        catTalkTimer = setTimeout(() => {
            websiteCat.classList.remove("is-talking");
        }, 2600);

        setTimeout(() => {
            websiteCat.classList.remove("is-pouncing");
        }, 600);
    };

    const moveCat = () => {

        if (!websiteCat) return;

        const margin = 70;
        const x = margin + Math.random() *
            Math.max(1, window.innerWidth - margin * 2);
        const y = margin + Math.random() *
            Math.max(1, window.innerHeight - margin * 2);

        websiteCat.style.left = `${x}px`;
        websiteCat.style.top = `${y}px`;
    };

    const catMessages = [
        "mrrp! I found something cute.",
        "I am supervising this interaction.",
        "That button has excellent taste.",
        "One tiny paw of approval.",
        "Maryam deserves all the good things."
    ];

    websiteCat?.addEventListener("click", event => {

        event.stopPropagation();

        const sound =
            catSounds[
                Math.floor(Math.random() * catSounds.length)
            ];

        catMeowAudio.pause();
        catMeowAudio.currentTime = 0;
        catMeowAudio.src = sound;
        catMeowAudio.play().catch(() => {});

        catSay(
            sound === "assets/meowryam.mp3"
                ? "Meowryam~"
                : "purrrr... that was a very good pet."
        );

        moveCat();
    });

    const applyTheme = (theme) => {

        const nextTheme = theme === "dark" ? "dark" : "light";

        document.body.dataset.theme = nextTheme;

        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                "content",
                nextTheme === "dark" ? "#12171d" : "#fff9dc"
            );
        }

        if (themeToggle) {
            const isDark = nextTheme === "dark";
            themeToggle.classList.toggle("is-dark", isDark);
            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.querySelector(".theme-toggle-thumb").textContent =
                isDark ? "🌙" : "☀️";
        }

        localStorage.setItem("maryam-theme", nextTheme);
    };

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("maryam-theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

    themeToggle?.addEventListener("click", () => {

        const nextTheme = document.body.dataset.theme === "dark"
            ? "light"
            : "dark";

        applyTheme(nextTheme);

    });

    const nextChapterButton = $("#next-chapter-button");
    const nextChapterMessage = $("#next-chapter-message");

    nextChapterButton?.addEventListener("click", () => {

        show(nextChapterMessage);
        nextChapterButton.textContent = "Chapter under progress ♡";
        nextChapterButton.disabled = true;

    });

    document.addEventListener("click", event => {

        if (!websiteCat || websiteCat.contains(event.target)) return;

        const interactiveTarget = event.target.closest(
            "a, button, input, .memory-card, .photo-frame, .song-card"
        );

        if (!interactiveTarget) return;

        const targetText = interactiveTarget.textContent.trim().toLowerCase();

        if (targetText.includes("heart") || targetText.includes("love")) {
            catSay("big heart energy detected. 💛");
        } else if (targetText.includes("hug") || targetText.includes("mwa")) {
            catSay("excellent choice. More affection, please.");
        } else if (targetText.includes("play") || targetText.includes("song")) {
            catSay("ooh, music! I like this one.");
        } else if (targetText.includes("star") || targetText.includes("gift")) {
            catSay("I helped. Probably.");
        } else {
            catSay(catMessages[Math.floor(Math.random() * catMessages.length)]);
        }
    });

    moveCat();
    setInterval(moveCat, 8500);


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const target = $(link.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       TINY SECRET
       ===================================================== */

    const tinySecret = $("#tiny-secret");
    const tinySecretMessage = $("#tiny-secret-message");

    if (tinySecret) {

        tinySecret.addEventListener("click", () => {

            show(tinySecretMessage);

            tinySecretMessage.textContent =
                "Who's a good girl? 🤭💛 You are. Obviously. Now come here, you adorable little troublemaker.";

            tinySecret.textContent =
                "okay... you caught me 🤭";

            tinySecret.disabled = true;

            createFloatingEmoji("🎀", 4);

        });

    }


    /* =====================================================
       PHOTO REVEAL
       ===================================================== */

    const photoFrame = $("#photo-frame");

    if (photoFrame) {

        const revealPhoto = () => {
            photoFrame.classList.add("revealed");
        };

        photoFrame.addEventListener("click", revealPhoto);

        photoFrame.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                revealPhoto();

            }

        });

    }


    /* =====================================================
       STORY QUESTION
       ===================================================== */

    const storyButton = $("#story-button");
    const storyResponse = $("#story-response");

    if (storyButton) {

        storyButton.addEventListener("click", () => {

            show(storyResponse);

            storyButton.textContent =
                "You remembered ♡";

            storyButton.disabled = true;

        });

    }


    /* =====================================================
       MEMORY VIEWER
       ===================================================== */

    const memoryCards = $$(".memory-card");

    const memoryModal = $("#memory-modal");
    const memoryModalClose = $("#memory-modal-close");
    const memoryModalMedia = $("#memory-modal-media");
    const memoryModalTitle = $("#memory-modal-title");
    const memoryModalNumber = $("#memory-modal-number");
    const memoryModalDescription =
        $("#memory-modal-description");


    const memoryData = {

        "1": {
            number: "MEMORY 01",
            title: "The Beginning",
            description:
                "The day we met on Discord over a Phone Guy bot call :). Funny how something so random could become something so important.",
            type: "image",
            src: "assets/memory1.png",
            alt: "Our first little memory"
        },

        "2": {
            number: "MEMORY 02",
            title: "A Little Moment",
            description:
                "The drawing you made for my birthday. Something little that became a memory I wanted to keep.",
            type: "image",
            src: "assets/memory2.png",
            alt: "Drawing from a birthday memory"
        },

        "3": {
            number: "MEMORY 03",
            title: "Something Special",
            description:
                "A tiny garden moment and that giggle. One of those little things that is impossible not to smile at.",
            type: "video",
            src: "assets/memory3.mp4"
        },

        "4": {
            number: "MEMORY 04",
            title: "DOSTHTA LABUBU",
            description:
                "DOSTHTA LABUBU. 😭💛 That's it. That's the memory.",
            type: "image",
            src: "assets/memory4.png",
            alt: "DOSTHTA LABUBU"
            }

    };


    const openMemory = (memoryNumber) => {

        const memory = memoryData[memoryNumber];

        if (!memory || !memoryModal) return;

        memoryCards.forEach(card => {
            card.classList.remove("flipped");
        });

        memoryModalNumber.textContent =
            memory.number;

        memoryModalTitle.textContent =
            memory.title;

        memoryModalDescription.textContent =
            memory.description;

        memoryModalMedia.innerHTML = "";

        if (memory.type === "video") {

            const video =
                document.createElement("video");

            video.src = memory.src;
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";

            video.setAttribute(
                "aria-label",
                "Maryam's garden video"
            );

            memoryModalMedia.appendChild(video);

        } else {

            const image =
                document.createElement("img");

            image.src = memory.src;
            image.alt = memory.alt || "";

            memoryModalMedia.appendChild(image);

        }

        memoryModal.classList.add("open");
        memoryModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            memoryModalClose?.focus();
        }, 50);

    };


    const closeMemory = () => {

        if (!memoryModal) return;

        memoryModal.classList.remove("open");

        memoryModal.setAttribute(
            "aria-hidden",
            "true"
        );

        memoryModalMedia.innerHTML = "";

        document.body.style.overflow = "";

    };


    memoryCards.forEach(card => {

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", event => {

            event.stopPropagation();

            openMemory(
                card.dataset.memory
            );

        });

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openMemory(
                    card.dataset.memory
                );

            }

        });

    });


    memoryModalClose?.addEventListener(
        "click",
        closeMemory
    );

    $(".memory-modal-backdrop")?.addEventListener(
        "click",
        closeMemory
    );


    /* =====================================================
       LOVE METER
       ===================================================== */

    let lovePoints = 0;

    const LOVE_GOAL = 50;

    const loveCount = $("#love-count");
    const loveHeart = $("#love-heart");
    const loveProgress = $("#love-progress");
    const loveSection = $("#love-meter");
    const loveProgressText =
        $("#love-progress-text");
    const loveMilestone =
        $("#love-milestone");
    const loveReveal =
        $("#love-reveal");


    if (
        loveProgress &&
        !$("#love-progress-bar")
    ) {

        const progressBar =
            document.createElement("div");

        progressBar.id =
            "love-progress-bar";

        loveProgress.appendChild(
            progressBar
        );

    }


    const loveProgressBar =
        $("#love-progress-bar");


    /* BEAUTIFUL 10-POINT MILESTONES */

    const loveMessages = {

        10:
            "Ten little hearts already? You have such a lovely way of making affection feel effortless. Every one of them feels like a tiny reminder of how sweet you are. 🌼💛",

        20:
            "Twenty hearts from you... You're far too generous with them, you know. I hope you realise how genuinely precious that sweetness of yours is. 🎀💛",

        30:
            "Thirty already. Somehow you keep finding little ways to make me feel cared for. You're ridiculously lovely, Maryam. Truly. 🌼✨",

        40:
            "Forty hearts. And every one feels like something I would happily keep. Thank you for being so wonderfully, effortlessly you. 💛",

        50:
            "Fifty hearts from you. I think I've officially run out of ways to tell you how much I appreciate that beautiful little heart of yours. 🥹💛"

    };

    const heartCatMessages = [
        "a heart for Maryam? Excellent choice. 💛",
        "mrrp! That love meter is looking adorable.",
        "another little heart safely delivered.",
        "I approve this extremely sweet behavior.",
        "keep going... I like where this is going. ✨"
    ];


    const updateLoveMeter = () => {

        if (loveCount) {
            loveCount.textContent =
                lovePoints;
        }

        const progress =
            Math.min(
                (lovePoints / LOVE_GOAL) * 100,
                100
            );

        if (loveProgressBar) {

            loveProgressBar.style.width =
                `${progress}%`;

        }


        if (loveProgressText) {

            if (lovePoints < 10) {

                loveProgressText.textContent =
                    "It's getting bigger... 👀";

            } else if (lovePoints < 50) {

                loveProgressText.textContent =
                    `${50 - lovePoints} more little hearts to go. ♡`;

            } else if (lovePoints === 50) {

                loveProgressText.textContent =
                    "FIFTY. 💛";

            } else {

                loveProgressText.textContent =
                    "MORE LOVE?? WAY TO GO 😭💛";

            }

        }


        if (loveHeart) {

            const scale =
                1 +
                Math.min(
                    lovePoints / 500,
                    0.16
                );

            loveHeart.style.transform =
                `scale(${scale})`;

        }

    };


    const createLoveConfetti = (
        amount = 4
    ) => {

        const container =
            $("#heart-confetti");

        if (!container) return;

        const hearts = [
            "💛",
            "🧡",
            "🩷",
            "🤍",
            "💖",
            "❤️",
            "💕",
            "💞"
        ];

        for (let i = 0; i < amount; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "confetti-heart";

            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];

            heart.style.left =
                `${35 + Math.random() * 30}%`;

            heart.style.top =
                `${55 + Math.random() * 25}%`;

            heart.style.setProperty(
                "--random-x",
                Math.random()
            );

            heart.style.fontSize =
                `${0.8 + Math.random() * 0.9}rem`;

            heart.style.animationDelay =
                `${Math.random() * 0.18}s`;

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3200);

        }

    };


    let loveBlastTriggered = false;


    const createLoveBlast = () => {

        const container =
            $("#heart-confetti");

        if (!container) return;

        const hearts = [
            "💛",
            "💛",
            "💛",
            "🧡",
            "🩷",
            "🤍",
            "💖"
        ];

        for (let i = 0; i < 35; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "confetti-heart big-confetti-heart";

            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];

            heart.style.left = "50%";
            heart.style.top = "50%";

            heart.style.setProperty(
                "--blast-x",
                `${(Math.random() - 0.5) * 100}vw`
            );

            heart.style.setProperty(
                "--blast-y",
                `${(Math.random() - 0.5) * 100}vh`
            );

            heart.style.setProperty(
                "--blast-rotate",
                `${(Math.random() - 0.5) * 720}deg`
            );

            heart.style.fontSize =
                `${1 + Math.random() * 1.7}rem`;

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 2800);

        }

    };


    loveHeart?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            lovePoints++;

            if (lovePoints === 10) {
                catSay("ten hearts already? Maryam is very loved. 🌼");
            } else if (lovePoints === 25) {
                catSay("halfway to a heart-shaped celebration! 💛");
            } else if (lovePoints === LOVE_GOAL) {
                catSay("FIFTY HEARTS! Initiating maximum purrfection! 🎉");
            } else {
                catSay(
                    heartCatMessages[
                        Math.floor(Math.random() * heartCatMessages.length)
                    ]
                );
            }

            updateLoveMeter();

            createLoveConfetti(
                lovePoints % 5 === 0
                    ? 6
                    : 3
            );


            if (
                loveMessages[lovePoints] &&
                loveMilestone
            ) {

                loveMilestone.textContent =
                    loveMessages[lovePoints];

                show(loveMilestone);

            }


            if (
                lovePoints === LOVE_GOAL &&
                !loveBlastTriggered
            ) {

                loveBlastTriggered = true;

                loveProgress?.classList.add("is-broken");
                loveSection?.classList.add("love-meter-broken");

                createLoveBlast();

                setTimeout(() => {

                    show(loveReveal);

                    loveReveal.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 2300);

            }

        }
    );


    /* =====================================================
       MWA
       ===================================================== */

    let mwaCount = 0;

    const mwaButton = $("#mwa-button");
    const mwaCounter = $("#mwa-counter");
    const mwaHint = $("#mwa-hint");
    const mwaMessage = $("#mwa-message");

    let passed100 = false;


    const mwaMilestones = {

        10:
            "10 kisses! Off to a sweet start~ 💋",

        20:
            "20 kisses! Someone's extra needy today 👀",

        30:
            "30 kisses! Cheek attack in progress! 💋✨",

        40:
            "40 kisses! My cheeks are getting super warm! 🥰",

        50:
            "50 kisses! Halfway to a hundred, keep going! 🚀",

        60:
            "60 kisses! Kissing spree alert! 🚨💋",

        70:
            "70 kisses! You really can't stop, can you? 💕",

        80:
            "80 kisses! Overdosing on affection over here! 😭❤️",

        90:
            "90 kisses! Almost at 100! 🏁💋",

        100:
            "100 KISSES! 💯💋 Unlocked the Ultimate Kiss Trophy! 🎉"

    };


    const createSlowKissConfetti = (
        amount = 35
    ) => {

        const kisses = [
            "💋",
            "😘",
            "😚",
            "💋",
            "❤️"
        ];

        for (let i = 0; i < amount; i++) {

            const kiss =
                document.createElement("span");

            kiss.className =
                "page-kiss-confetti";

            kiss.textContent =
                kisses[
                    Math.floor(
                        Math.random() *
                        kisses.length
                    )
                ];

            kiss.style.left =
                `${Math.random() * 95}%`;

            kiss.style.animationDelay =
                `${Math.random() * 0.8}s`;

            kiss.style.fontSize =
                `${1.3 + Math.random() * 1.4}rem`;

            document.body.appendChild(kiss);

            setTimeout(() => {
                kiss.remove();
            }, 4500);

        }

    };


    const createMwaPopup = () => {

        if (!mwaButton) return;

        const rect =
            mwaButton.getBoundingClientRect();


        const word =
            document.createElement("span");

        word.className =
            "mwa-popup-word";

        word.textContent =
            "MWA 💋";

        word.style.left =
            `${rect.left + rect.width / 2}px`;

        word.style.top =
            `${rect.top + rect.height / 2}px`;

        word.style.setProperty(
            "--mwa-x",
            `${(Math.random() - 0.5) * 120}px`
        );

        document.body.appendChild(word);

        setTimeout(() => {
            word.remove();
        }, 1500);


        const kiss =
            document.createElement("span");

        kiss.className =
            "mwa-popup-kiss";

        kiss.textContent =
            "💋";

        kiss.style.left =
            `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 45}px`;

        kiss.style.top =
            `${rect.top + rect.height / 2}px`;

        document.body.appendChild(kiss);

        setTimeout(() => {
            kiss.remove();
        }, 1500);

    };


    mwaButton?.addEventListener(
        "click",
        () => {

            mwaCount++;


            if (mwaCounter) {

                mwaCounter.textContent =
                    `Mwa count: ${mwaCount} 💋`;

                mwaCounter.classList.remove(
                    "pulse-counter"
                );

                void mwaCounter.offsetWidth;

                mwaCounter.classList.add(
                    "pulse-counter"
                );

            }


            if (
                mwaMilestones[mwaCount] &&
                mwaHint
            ) {

                mwaHint.textContent =
                    mwaMilestones[mwaCount];

            }


            createMwaPopup();


            if (
                mwaCount % 5 === 0
            ) {

                createSlowKissConfetti(5);

            } else {

                createSlowKissConfetti(2);

            }


            if (
                mwaCount >= 100 &&
                !passed100
            ) {

                passed100 = true;

                if (mwaMessage) {

                    mwaMessage.innerHTML = `
                        <div class="mwa-final-message">
                            <div class="mwa-final-decoration">
                                💋 ✨ 💋
                            </div>

                            <h3>
                                👑 OVER 100 KISSES! 💋
                            </h3>

                            <p>
                                You went past 100 kisses!
                                You are officially the sweetest
                                person ever. MWAH! ❤️✨
                            </p>
                        </div>
                    `;

                    show(mwaMessage);

                }

                createSlowKissConfetti(45);

            }

        }
    );


    /* =====================================================
       RISHU BEAR
       ===================================================== */

    let hugCount = 0;

    const teddyButton =
        $("#teddy");

    const hugButton =
        $("#teddy-hug-button");

    const teddyCounter =
        $("#teddy-counter");

    const teddySpeech =
        $("#teddy-speech");

    const teddyMood =
        $("#teddy-mood");

    const teddyMilestone =
        $("#teddy-milestone");

    const teddyDrawing =
        $("#teddy-drawing");


    const hugMessages = {

        5:
            "Rishu is very happy. 🧸💛",

        10:
            "Rishu says this is officially a cuddle emergency. 😭🧸",

        15:
            "Rishu has decided you are his favourite hug provider. ♡",

        20:
            "Rishu is drowning in love and has absolutely no complaints. 🧸💛",

        25:
            "Twenty-five hugs?! Rishu Bear feels extremely loved. 🥹🧸"

    };


    const giveHug = () => {

        hugCount++;


        if (teddyCounter) {

            teddyCounter.textContent =
                `${hugCount} hug${hugCount === 1 ? "" : "s"}`;

        }


        if (teddySpeech) {

            const speeches = [
                "Rishu Bear is very happy. 🧸",
                "Rishu Bear feels loved. 💛",
                "Rishu Bear wants another hug.",
                "Rishu Bear is smiling. 🥹",
                "Rishu Bear refuses to let go."
            ];

            teddySpeech.textContent =
                speeches[
                    Math.floor(
                        Math.random() *
                        speeches.length
                    )
                ];

        }


        if (teddyMood) {

            if (hugCount < 5) {

                teddyMood.textContent =
                    "waiting patiently";

            } else if (hugCount < 10) {

                teddyMood.textContent =
                    "very happy";

            } else if (hugCount < 20) {

                teddyMood.textContent =
                    "extremely cuddly";

            } else {

                teddyMood.textContent =
                    "completely spoiled";

            }

        }


        if (hugMessages[hugCount]) {

            teddyMilestone.textContent =
                hugMessages[hugCount];

            show(teddyMilestone);

        }


        /*
         * IMPORTANT:
         * No expensive animation on the actual bear image.
         * This keeps the page responsive.
         */

        if (teddyButton) {

            teddyButton.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.025)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 280,
                    easing:
                        "ease-out"
                }
            );

        }


        /* 25 HUG REWARD */

        if (
            hugCount === 25 &&
            teddyDrawing
        ) {

            show(teddyDrawing);

            teddyDrawing.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    };


    teddyButton?.addEventListener(
        "click",
        giveHug
    );

    hugButton?.addEventListener(
        "click",
        giveHug
    );


    /* =====================================================
       LETTERS
       ===================================================== */

    const letters = {

        beginning: {

            title:
                "The Beginning",

            date:
                "23 July 2026",

            label:
                "A letter for Maryam",

            mark:
                "✦",

            closing:
                "with an unreasonable amount of love,",

            from:
                "Rishu ♡",

            body: [

    "My dear Maryam,",

    "I still think it is a little funny that something as precious as you could have entered my life in such a completely random way. :)",

    "There was no grand beginning to us. No carefully planned introduction, no expectation that anything important would come from it. It was just a random Discord call, made because I was bored and lonely, and somehow I ended up talking to you.",

    "And then, of course, I had to begin with the most normal introduction imaginable:",

    "\"This is the femboys chat, you talk to femboys here.\"",

    "And you immediately went:",

    "\"WHAT! NO, I'M A GIRL!\" 😭",

    "BUT THEN YOU ACTUALLY PRETENDED. 😭😭",

    "I still think that is one of the funniest ways we could possibly have started talking. XD",

    "What makes it even funnier is that we just... kept talking.",

    "What was supposed to be some completely random Discord interaction somehow turned into us staying there and talking until FIVE IN THE MORNING. Like??? 😭",

    "And apparently, I had already decided that being normal around you was not going to happen, because I was flirting with you practically from the beginning. 👀",

    "I was already saying ridiculous things like \"my favourite song is the one she sings :)\" and a whole collection of other little compliments that I probably thought were incredibly smooth at the time. HEHE.",

    "Looking back, it is actually kind of adorable how quickly I started enjoying talking to you. There was just something about you that made the conversation feel so easy, like I had somehow known you for much longer than I actually had.",

    "And then there was that tiny little conversation about texting first.",

    "\"giggling i dont mind if you dont text first\"",

    "And then you said you could just text first.",

    "And I remember just sitting there like:",

    "\"MY GOD.\" 😭",

    "Because then you went on to say that I could add you if I wanted and that I shouldn't worry about reaching out first.",

    "It was such a small thing. Probably something you said without thinking much about it.",

    "But I remember it because it made talking to you feel so easy. I didn't have to worry about constantly finding something to say or wondering whether I was bothering you. You basically just went, \"don't worry, I'll text you too.\"",

    "And somehow, that little moment stayed with me.",

    "The first day was already strange enough. I had met a completely random girl on Discord, somehow talked to her until five in the morning, flirted with her far more than I probably should have, and somehow found myself looking forward to talking to her again.",

    "But the funniest part is that I didn't actually realise what was happening yet.",

    "Because it was on the second day that I fell for you.",

    "Not slowly. Not after some grand dramatic moment. I just... realised that somewhere between that first conversation and the next, you had stopped being some random person I met on Discord.",

    "You had become someone I genuinely wanted in my days.",

    "Someone I wanted to hear from.",

    "Someone I was already beginning to care about far more than I had expected to.",

    "And I think that is the part of our beginning that makes me smile the most.",

    "There was no grand announcement that something important had started. No little sign saying, \"hey, remember this moment, you're going to love this person.\"",

    "It was just you.",

    "Me.",

    "A random Discord call.",

    "A ridiculous femboy joke. 😭",

    "Five in the morning.",

    "A lot of flirting. 👀",

    "And somewhere in all of that, the beginning of us.",

    "If I could go back to that first conversation and tell the version of me sitting there exactly what that random girl on Discord would eventually mean to me, I probably would not believe it.",

    "But I think I would still be very glad to know that, somehow, out of all the random moments in the world, that one led me to you.",

    "And honestly, Maryam, I would choose that beginning again. Every single time. ♡"

],

        },

        month: {
    title: "One Month",
    date: "4 September 2026",
    label: "A letter for today",
    mark: "✿",
    closing: "With all the affection my little heart can fit,",
    from: "Your Rishu ♡",
    body: [
        "My sweetest Maryam,",
        "Happy one month. ♡",
        "I have been thinking about what I actually want to say in this letter, and somehow that feels harder than it should be.",
        "Because how do you put a whole month of someone into words?",
        "How do I explain the strange little transformation that happens when someone goes from being a completely random person you happened to meet one night, to someone whose name can instantly change the entire feeling of your day?",
        "I don't think I can.",
        "So maybe I won't try to explain all of it.",
        "Maybe I'll just tell you what this month has felt like from my side.",
        "It has felt a little like discovering a room in a house I thought I already knew.",
        "Something was always there. I simply hadn't opened the door yet.",
        "And then there was you.",
        "Suddenly there were conversations I looked forward to, messages I found myself rereading, stupid little jokes that somehow became *our* jokes, and moments that probably looked completely ordinary from the outside but somehow became precious to me.",
        "I think one of my favourite things about us is how many of our memories are made from things that were never supposed to become memories at all.",
        "A random Discord call.",
        "A Phone Guy bot.",
        "Me immediately telling you, \"this is the femboys chat, you talk to femboys here.\" 😭",
        "You going, \"WHAT! NO, I'M A GIRL!\"",
        "And then ACTUALLY PRETENDING. 😭😭",
        "Talking until five in the morning.",
        "You telling me you didn't mind if I didn't text first.",
        "The little \"giggling\" messages.",
        "The ridiculous flirting.",
        "The things that make absolutely no sense to anyone except us.",
        "DOSTHTA LABUBU.",
        "Your little giggles.",
        "And somehow, all of those completely ridiculous fragments have become some of my favourite pieces of this month.",
        "There are things about you that I don't think you realise I notice.",
        "I notice the way your personality comes through even in the smallest messages.",
        "I notice how easily you can turn something completely ordinary into something funny.",
        "I notice your little mannerisms, your silly reactions, the way you giggle when something genuinely gets you, and all those tiny pieces of you that probably feel insignificant because they are simply... you.",
        "But those are exactly the things I find myself becoming attached to.",
        "Your giggles especially.",
        "Maryam, I genuinely don't think your giggles understand the amount of power they possess.",
        "You could probably say absolutely nothing, start giggling for five seconds, and somehow my entire mood would be different.",
        "It is ridiculously unfair.",
        "And I hope you never stop giggling.",
        "But it isn't only the cute things I love about you.",
        "I admire you too.",
        "I admire how creative you are, how much thought you put into things, how organised and prepared you try to be, and the way you care about doing things properly.",
        "I have seen the way you care about your students and how much their little successes matter to you.",
        "I've seen how proud you can be of them, and how much effort you put into making things good for them.",
        "And honestly, Maryam, I am proud of you too.",
        "Not because you have to achieve some enormous thing to deserve it.",
        "Just because you are you.",
        "Because I have watched you keep going through difficult days, frustrating moments, tired moments, and all the little things life throws at you, and somehow you still manage to remain this wonderfully warm, funny, creative person.",
        "That means more to me than I think I have properly told you.",
        "There is also something rather funny I have realised this month.",
        "I used to like being alone.",
        "I genuinely did.",
        "I liked my own little world, my own thoughts, my own quiet, my own strange corners of existence.",
        "And then you appeared.",
        "Now I still like being alone sometimes.",
        "But there is a difference.",
        "Because now, somewhere inside that quiet, there is a little part of me that thinks, \"I wonder what Maryam is doing.\"",
        "I wonder what you are laughing about.",
        "I wonder what ridiculous thing you are going to say next.",
        "I wonder whether you've eaten properly.",
        "I wonder whether you are having a good day.",
        "I wonder what little story you'll tell me when we talk again.",
        "And somehow, I don't mind that.",
        "I actually like having someone to wonder about.",
        "You have quietly become part of my days without asking permission.",
        "And perhaps that is one of the most beautiful things about this month.",
        "You didn't arrive with some enormous dramatic entrance.",
        "You simply kept appearing.",
        "One conversation.",
        "Then another.",
        "Then another.",
        "Until eventually, there was a little place in my life that somehow had your name written all over it.",
        "And now I cannot look at the beginning without smiling at how impossible it would have sounded if someone had told me what was coming.",
        "That random girl from Discord.",
        "The one who insisted she was a girl after I accused her of being in the femboys chat. 😭",
        "The one I somehow ended up talking to until five in the morning.",
        "The one who became Maryam.",
        "My Maryam.",
        "The person I look forward to hearing from.",
        "The person whose voice I could listen to for far longer than I probably admit.",
        "The person whose little messages can make an otherwise ordinary day feel different.",
        "The person I now associate with an absurd number of tiny memories.",
        "The person who somehow made one month feel much larger than a month should feel.",
        "And I know one month is still only one month.",
        "There is so much we don't know.",
        "There are so many conversations we haven't had, places we haven't seen, jokes we haven't made, photographs we haven't taken, songs we haven't attached memories to, and ordinary days we haven't lived through together yet.",
        "That's actually what makes me happiest.",
        "There is still so much unwritten.",
        "This little website is full of memories from our first month, but one day I hope it feels almost hilariously incomplete.",
        "I hope there are so many more memories that four little memory cards could never possibly contain them.",
        "I hope there are inside jokes that would make absolutely no sense to anyone else.",
        "I hope there are photographs we look back at and laugh over.",
        "I hope there are songs that become ours simply because we happened to listen to them at the right moment.",
        "I hope there are ordinary Tuesdays that become precious for no reason other than the fact that you were there.",
        "And I hope, somehow, that we never lose the silliness that brought us here in the first place.",
        "Because I don't want us to become so serious that we forget the girl who pretended to be a femboy and the idiot who thought that was a perfectly reasonable way to start a conversation. 😭",
        "I want the laughter.",
        "I want the stupid jokes.",
        "I want the little \"giggling\" messages.",
        "I want the DOSTHTA LABUBU moments.",
        "I want your creativity and your ridiculousness and your softness and all those tiny things that make you unmistakably you.",
        "And more than anything, I want you to know that you don't have to become anything else to be important to me.",
        "You already are.",
        "So thank you, Maryam.",
        "Thank you for that random night.",
        "Thank you for staying up talking to me.",
        "Thank you for every laugh.",
        "Thank you for every little memory.",
        "Thank you for every time you made me smile without even realising you were doing it.",
        "Thank you for letting me know the person behind the messages.",
        "Thank you for letting me become your Rishu.",
        "And thank you for becoming my Maryam.",
        "If someone had told me on that first night that a random Discord call would eventually lead to me sitting here, trying to find enough words to explain what you mean to me, I probably would have laughed at them.",
        "But here I am.",
        "One month later.",
        "Still a little amazed that I found you at all.",
        "And perhaps that is the simplest way I can say it:",
        "Out of all the people I could have met, all the conversations I could have had, all the ordinary nights that could have passed unnoticed...",
        "somehow, I met you.",
        "And I am very, very glad that I did.",
        "Happy one month, Maryam.",
        "Here's to the first little chapter.",
        "And to all the pages we haven't written yet."
    ]
},

        future: {
    title: "For Everything Ahead",
    date: "For whenever you need it",
    label: "A letter to keep",
    mark: "✧",
    closing: "With love,",
    from: "Your Rishu ♡",
    body: [
        "My Maryam,",

        "I don't know what the future looks like.",

        "I don't know where either of us will be a year from now, what our days will look like, what strange little problems we'll be complaining about, what songs we'll have attached to memories, or how many completely ridiculous inside jokes we'll have accumulated by then.",

        "And honestly, I don't want to know everything.",

        "There is something beautiful about not having the pages written yet.",

        "Because somewhere in those unwritten pages, there are things we haven't discovered yet.",

        "There are conversations we've never had.",
        "There are versions of you I've never met.",
        "There are versions of me you haven't met either.",
        "There are ordinary mornings that haven't happened.",
        "There are nights we haven't stayed awake through.",
        "There are jokes we haven't laughed at yet.",
        "There are photographs that don't exist yet.",
        "There are songs we haven't heard at the right moment.",
        "There are memories waiting patiently somewhere ahead of us.",

        "And I think that's what I like most about the future.",

        "It hasn't happened yet.",

        "So I can imagine it.",

        "Sometimes I imagine something enormous.",
        "Some distant place.",
        "A completely different life.",
        "Two people looking back at a ridiculous little Discord conversation and wondering how something so random managed to become such a significant part of their lives.",

        "But strangely, the things I imagine most aren't enormous at all.",

        "They're little things.",

        "I imagine hearing you laugh about something completely stupid.",
        "I imagine you telling me some story and getting distracted halfway through because you've remembered another story.",
        "I imagine us having some ancient inside joke that neither of us can properly explain anymore.",
        "I imagine seeing something yellow and immediately thinking of you.",
        "I imagine hearing a song and having to stop for a second because it reminds me of some completely ordinary day with you.",

        "I imagine the future being full of tiny things that nobody else would understand the importance of.",

        "And I think those are the things I want most.",

        "Not perfection.",
        "Not some impossibly perfect story where everything goes exactly right.",
        "Just something real enough that the ordinary parts become precious.",

        "I want to know what your laugh sounds like after a hundred more conversations.",
        "I want to know which silly things you'll still find funny.",
        "I want to know what you'll become proud of.",
        "I want to see the things you create.",
        "I want to hear about the people you help.",
        "I want to watch you become even more of the person you are slowly becoming.",

        "Because one of the things I admire about you is that you're still becoming yourself.",

        "And I hope you never feel like you have to stop.",

        "I hope you keep your creativity.",
        "I hope you keep that ridiculous sense of humour.",
        "I hope you keep your little giggles.",
        "I hope you keep caring so deeply about the things and people that matter to you.",
        "I hope you keep being the person who can somehow turn a completely normal conversation into something I remember for weeks.",

        "And selfishly, I hope I get to see a lot of it.",

        "I hope there are more versions of 'Maryam' for me to discover.",

        "The sleepy Maryam.",
        "The excited Maryam.",
        "The ridiculously giggly Maryam.",
        "The organised Maryam.",
        "The creative Maryam.",
        "The dramatic Maryam.",
        "The 'WHAT! NO, I'M A GIRL!' Maryam. 😭",
        "And probably several versions I haven't even invented names for yet.",

        "I hope someday we look back at this little website and laugh.",

        "I hope you find the old photographs and say, 'oh my goodness, look how young we were.'",
        "I hope the memories section feels hilariously incomplete because there are too many things that happened afterwards to fit inside four little cards.",
        "I hope the timeline stops at Day 30 and makes us realise just how much came after it.",

        "Maybe there will be another website someday.",
        "Maybe there will be another letter.",
        "Maybe there will simply be an ordinary message saying something stupid like 'DOSTHTA LABUBU' and somehow that will still make us laugh.",

        "I don't know.",

        "But I hope there is something.",

        "Something gentle.",
        "Something honest.",
        "Something that survives the boring days as well as the beautiful ones.",

        "Because I've realised something about affection.",

        "It isn't only in the grand moments.",

        "Sometimes it is in remembering how someone takes their tea.",
        "Sometimes it is in knowing what makes them laugh.",
        "Sometimes it is seeing something during the day and thinking, 'Maryam would probably find this funny.'",
        "Sometimes it is keeping a tiny detail about them somewhere in your mind because you know it matters to them.",
        "Sometimes it is simply wondering whether they got home safely or whether they had a good day.",

        "I think those are the things that make someone quietly become part of your life.",

        "And you've already done that to me.",

        "You became part of the quiet places.",

        "Which is funny, really.",

        "Because I used to like being alone until I found you.",

        "And I still love my quiet.",
        "I still love my own little corners of the world.",
        "But now there is someone inside those corners that I didn't expect to find.",

        "You.",

        "So if the future gives us a thousand ordinary days, I hope at least some of them have you in them.",

        "If it gives us difficult days, I hope we remember that difficult days are only days.",
        "If it gives us beautiful ones, I hope we remember to appreciate them while they're happening.",
        "If it gives us ridiculous ones, I hope we laugh until we can't remember what started it.",

        "And if someday we look back at this first little chapter,",

        "I hope we don't just remember that we were happy.",

        "I hope we remember that we were learning.",
        "Growing.",
        "Changing.",
        "Trying.",
        "And choosing, in all the small ways that matter, to keep showing up.",

        "I don't want to write the ending of our story here.",

        "It would be rather unfair to the future.",

        "There are too many pages left blank.",

        "So I'll leave this letter unfinished in the only way that feels right.",

        "Not because I have nothing more to say.",

        "But because I hope one day there will be so much more to say that this little letter feels like the beginning of something impossibly larger.",

        "Maybe one day you'll read this again and know exactly what happened afterwards.",

        "I'll only be able to wonder.",

        "And somehow, I think that's beautiful.",

        "Because whatever comes next, I am grateful that the future is still a place where I can imagine you.",

        "So here's to the things we haven't lived yet.",

        "The conversations.",
        "The laughter.",
        "The photographs.",
        "The ridiculous jokes.",
        "The quiet days.",
        "The unexpected days.",
        "The songs.",
        "The memories.",
        "The little moments nobody else will ever understand.",

        "And whatever version of the future eventually finds us...",

        "I hope she still has those giggles.",

        "I hope she still makes ridiculous jokes.",

        "I hope she still has that wonderful little spark that made me want to know her better in the first place.",

        "And I hope, somewhere in that future, she still knows a certain Rishu who is very, very glad that a random Discord call happened one night.",

        "Until then,",

        "I'll leave the rest of the page blank.",

        "You can help me fill it."
    ]
}

    };


    const letterPopup =
        $("#letter-popup");

    const letterContent =
        $("#letter-content");

    let letterCloseTimer =
        null;

    let letterRevealTimer =
        null;


    const escapeHtml = (text) =>
        text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");


    const closeLetterPopup = () => {

        if (letterRevealTimer) {
            clearTimeout(letterRevealTimer);
            letterRevealTimer = null;
        }

        const writing =
            $(".letter-writing", letterContent);

        writing?.classList.remove(
            "is-ready"
        );

        letterPopup?.classList.remove(
            "is-open"
        );

        if (letterCloseTimer) {
            clearTimeout(letterCloseTimer);
        }

        letterCloseTimer =
            setTimeout(() => {

                letterPopup?.classList.add(
                    "hidden"
                );

                letterPopup?.setAttribute(
                    "aria-hidden",
                    "true"
                );

                if (letterContent) {
                    letterContent.innerHTML =
                        "";
                }

                document.body.style.overflow =
                    "";

                letterCloseTimer =
                    null;

            }, 420);

    };


    const openLetter = (type) => {

        const letter = letters[type];

        if (
            !letter ||
            !letterContent ||
            !letterPopup
        ) {
            return;
        }

        if (letterCloseTimer) {
            clearTimeout(letterCloseTimer);
            letterCloseTimer = null;
        }

        if (letterRevealTimer) {
            clearTimeout(letterRevealTimer);
            letterRevealTimer = null;
        }


        letterContent.innerHTML = `

            <button
                id="close-letter"
                type="button"
                aria-label="Close letter"
            >
                ×
            </button>

            <div
                class="letter-pressed-mark"
                aria-hidden="true"
            >
                ${escapeHtml(letter.mark || "✦")}
            </div>

            <div class="letter-writing">

                <div class="letter-meta">
                    <span>${escapeHtml(letter.label || "A little letter")}</span>
                    <span class="letter-meta-date">${escapeHtml(letter.date || "")}</span>
                </div>

                <h3>
                    ${escapeHtml(letter.title)}
                </h3>

                <div class="letter-body">

                    ${letter.body
                        .map(
                            paragraph =>
                                `<p>${escapeHtml(paragraph)}</p>`
                        )
                        .join("")
                    }

                </div>

                <div class="letter-signature">
                    ${escapeHtml(letter.closing || "with love,")}
                    <span class="letter-signature-name">
                        ${escapeHtml(letter.from || "Rishu ♡")}
                    </span>
                </div>

                <div
                    class="letter-footer-mark"
                    aria-hidden="true"
                >
                    ✦
                </div>

            </div>

        `;


        letterPopup.classList.remove(
            "hidden"
        );

        letterPopup.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

        letterContent.scrollTop = 0;


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                letterPopup.classList.add(
                    "is-open"
                );

            });

        });


        letterRevealTimer =
            setTimeout(() => {

                const writing =
                    $(".letter-writing", letterContent);

                writing?.classList.add(
                    "is-ready"
                );

                letterRevealTimer =
                    null;

            }, 420);


        const close =
            $("#close-letter");

        close?.addEventListener(
            "click",
            closeLetterPopup
        );

        close?.focus();

    };


    $$(".envelope").forEach(
        envelope => {

            envelope.addEventListener(
                "click",
                () => {

                    openLetter(
                        envelope.dataset.letter
                    );

                }
            );

        }
    );


    letterPopup?.addEventListener(
        "click",
        event => {

            if (
                event.target === letterPopup
            ) {

                closeLetterPopup();

            }

        }
    );


    /* =====================================================
       MUSIC PLAYER
       ===================================================== */

    const tracks = [

        {
            title:
                "Nashe Si Chad Gayi",

            artist:
                "Arijit Singh & Caralisa Monteiro · Vishal–Shekhar",

            audio:
                "assets/music1.mp3",

            image:
                "assets/musicimage1.png"

        },

        {
            title:
                "Got My Mind Set On You",

            artist:
                "George Harrison",

            audio:
                "assets/music2.mp3",

            image:
                "assets/musicimage2.png"

        },

        {
            title:
                "More Than You Know",

            artist:
                "Axwell / Ingrosso",

            audio:
                "assets/music3.mp3",

            image:
                "assets/musicimage3.png"

        },

        {
            title:
                "Now and Then",

            artist:
                "The Beatles",

            audio:
                "assets/music4.mp3",

            image:
                "assets/musicimage4.png"

        },

        {
            title:
                "Right Down The Line",

            artist:
                "Gerry Rafferty",

            audio:
                "assets/music5.mp3",

            image:
                "assets/musicimage5.png"

        },

        {
            title:
                "Enna Sona",

            artist:
                "Arijit Singh, AR Rahman",

            audio:
                "assets/music6.mp3",

            image:
                "assets/musicimage6.png"

        },

        {
            title:
                "Ishq",

            artist:
                "Ali Sethi",

            audio:
                "assets/music7.mp3",

            image:
                "assets/musicimage7.png"

        },

        {
            title:
                "I Say A Little Prayer",

            artist:
                "Aretha Franklin",

            audio:
                "assets/music8.mp3",

            image:
                "assets/musicimage8.png"

        }

    ];


    let activeTrack = -1;

    const audio =
        new Audio();

    audio.preload =
        "metadata";


    const songCards =
        $$(".song-card");

    const playButtons =
        $$(".play-song");

    const playerTitle =
        $("#player-title");

    const playerArtist =
        $("#player-artist");

    const playerArt =
        $("#player-art");

    const musicPlayer =
        $("#music-player");

    const musicPlay =
        $("#music-play");

    const musicPrev =
        $("#music-prev");

    const musicNext =
        $("#music-next");

    const musicProgress =
        $("#music-progress");

    const currentTime =
        $("#current-time");

    const remainingTime =
        $("#remaining-time");

    const duration =
        $("#duration");


    const formatTime = seconds => {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const mins =
            Math.floor(
                seconds / 60
            );

        const secs =
            Math.floor(
                seconds % 60
            )
                .toString()
                .padStart(2, "0");

        return `${mins}:${secs}`;

    };

    const syncProgressStyles = () => {

        if (!musicProgress) return;

        const value =
            Number(
                musicProgress.value
            ) || 0;

        musicProgress.style.setProperty(
            "--progress",
            `${value}%`
        );

    };


    const updatePlayer = () => {

        if (
            activeTrack < 0
        ) {
            return;
        }


        const track =
            tracks[activeTrack];


        playerTitle.textContent =
            track.title;

        playerArtist.textContent =
            track.artist;

        playerArt.src =
            track.image;

        playerArt.alt =
            `${track.title} artwork`;


        songCards.forEach(
            card => {

                card.classList.toggle(
                    "is-playing",
                    Number(
                        card.dataset.track
                    ) === activeTrack &&
                    !audio.paused
                );

            }
        );


        playButtons.forEach(
            button => {

                const card =
                    button.closest(
                        ".song-card"
                    );

                const isActive =
                    Number(
                        card.dataset.track
                    ) === activeTrack;


                button.textContent =
                    isActive &&
                    !audio.paused
                        ? "Pause"
                        : "Play";

            }
        );


        if (musicPlay) {

            musicPlay.textContent =
                audio.paused
                    ? "▶"
                    : "❚❚";

        }

        if (musicPlayer) {
            musicPlayer.classList.toggle(
                "is-playing",
                !audio.paused && activeTrack >= 0
            );
        }

    };


    const loadTrack = (
        index,
        shouldPlay = true
    ) => {

        if (
            index < 0 ||
            index >= tracks.length
        ) {
            return;
        }


        activeTrack =
            index;


        audio.src =
            tracks[index].audio;

        audio.load();


        if (currentTime) {
            currentTime.textContent =
                "0:00";
        }

        if (duration) {
            duration.textContent =
                "0:00";
        }

        if (remainingTime) {
            remainingTime.textContent =
                "-0:00";
        }

        if (musicProgress) {
            musicProgress.value =
                0;
            syncProgressStyles();
        }


        updatePlayer();


        if (shouldPlay) {

            audio.play()
                .then(() => {
                    updatePlayer();
                })
                .catch(() => {
                    updatePlayer();
                });

        }

    };


    playButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const card =
                        button.closest(
                            ".song-card"
                        );

                    const index =
                        Number(
                            card.dataset.track
                        );


                    if (
                        index !==
                        activeTrack
                    ) {

                        loadTrack(
                            index,
                            true
                        );

                        return;

                    }


                    if (
                        audio.paused
                    ) {

                        audio.play()
                            .then(
                                updatePlayer
                            )
                            .catch(
                                updatePlayer
                            );

                    } else {

                        audio.pause();

                        updatePlayer();

                    }

                }
            );

        }
    );


    musicPlay?.addEventListener(
        "click",
        () => {

            if (
                activeTrack < 0
            ) {

                loadTrack(
                    0,
                    true
                );

                return;

            }


            if (
                audio.paused
            ) {

                audio.play()
                    .then(
                        updatePlayer
                    )
                    .catch(
                        updatePlayer
                    );

            } else {

                audio.pause();

                updatePlayer();

            }

        }
    );


    musicPrev?.addEventListener(
        "click",
        () => {

            if (
                activeTrack < 0
            ) {

                loadTrack(
                    0,
                    true
                );

                return;

            }


            const previous =
                activeTrack === 0
                    ? tracks.length - 1
                    : activeTrack - 1;


            loadTrack(
                previous,
                true
            );

        }
    );


    musicNext?.addEventListener(
        "click",
        () => {

            if (
                activeTrack < 0
            ) {

                loadTrack(
                    0,
                    true
                );

                return;

            }


            const next =
                (
                    activeTrack + 1
                ) %
                tracks.length;


            loadTrack(
                next,
                true
            );

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "timeupdate",
        () => {

            if (
                !audio.duration
            ) {
                return;
            }


            if (musicProgress) {

                musicProgress.value =
                    (
                        audio.currentTime /
                        audio.duration
                    ) * 100;

                syncProgressStyles();

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }

            if (remainingTime && audio.duration) {

                const remaining =
                    Math.max(
                        0,
                        audio.duration - audio.currentTime
                    );

                remainingTime.textContent =
                    `-${formatTime(remaining)}`;

            }

        }
    );


    musicProgress?.addEventListener(
        "input",
        () => {

            if (
                !audio.duration
            ) {
                return;
            }


            audio.currentTime =
                (
                    Number(
                        musicProgress.value
                    ) / 100
                ) *
                audio.duration;

            syncProgressStyles();

        }
    );


    audio.addEventListener(
        "play",
        updatePlayer
    );

    audio.addEventListener(
        "pause",
        updatePlayer
    );


    audio.addEventListener(
        "ended",
        () => {

            const next =
                (
                    activeTrack + 1
                ) %
                tracks.length;

            loadTrack(
                next,
                true
            );

        }
    );


    /* =====================================================
       STARS
       ===================================================== */

    const foundStars =
        new Set();

    const starsFound =
        $("#stars-found");

    const starReward =
        $("#star-reward");

    const giftGrid =
        $("#gift-grid");

    const giftLockMessage =
        $("#gift-lock-message");

    const fakeStarMessage =
        $("#fake-star-message");


    const unlockGifts = () => {

        giftGrid?.classList.remove(
            "gifts-locked"
        );


        $$(".gift").forEach(
            gift => {

                gift.disabled =
                    false;

            }
        );


        if (giftLockMessage) {

            giftLockMessage.textContent =
                "You found all five. These are yours. ♡";

        }

    };


    $$(".hidden-star").forEach(
        star => {

            star.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const number =
                        star.dataset.star;


                    if (
                        foundStars.has(number)
                    ) {
                        return;
                    }


                    foundStars.add(number);

                    star.classList.add(
                        "found"
                    );


                    if (starsFound) {

                        starsFound.textContent =
                            foundStars.size;

                    }


                    createFloatingEmoji(
                        "⭐",
                        3
                    );


                    if (
                        foundStars.size === 5
                    ) {

                        show(starReward);

                        createFloatingEmoji(
                            "✨",
                            10
                        );

                        unlockGifts();

                    }

                }
            );

        }
    );


    /* CLEARLY NON-STAR DECOYS */

    $$(".fake-star").forEach(
        decoy => {

            decoy.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    if (fakeStarMessage) {

                        if (
                            decoy.dataset.decoy ===
                            "blush"
                        ) {

                            fakeStarMessage.textContent =
                                "THAT IS DEFINITELY NOT A STAR... 🤭";

                        } else {

                            fakeStarMessage.textContent =
                                "THAT'S NOT A STAR!";

                        }


                        show(
                            fakeStarMessage
                        );


                        setTimeout(
                            () => {

                                hide(
                                    fakeStarMessage
                                );

                            },
                            1700
                        );

                    }


                    decoy.animate(
                        [
                            {
                                transform:
                                    "translate(-50%, -50%) scale(1)"
                            },
                            {
                                transform:
                                    "translate(-50%, -50%) scale(1.15) rotate(5deg)"
                            },
                            {
                                transform:
                                    "translate(-50%, -50%) scale(1)"
                            }
                        ],
                        {
                            duration: 300,
                            easing: "ease-out"
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       GIFTS
       ===================================================== */

    const giftMessage =
        $("#gift-message");


    const giftData = {

        "1": {

            title:
                "A Bouquet For You 🌷",

            text:
                "If I could hand you a bouquet right now, I'd want it to be full of the prettiest flowers I could find — simply because you deserve something beautiful. So until I can do that properly, consider this a tiny digital bouquet sent especially for you. 💛",

            image:
                "https://i.pinimg.com/474x/d3/ca/e9/d3cae92d40eb8f560ebead53832cb81c.jpg"

        },


        "2": {

            title:
                "HUGS AND KISSES 💋",

            text:
                "Consider this a tiny little collection of hugs and kisses sent directly to you. One hug wasn't enough. One kiss wasn't enough either. So here — have all of them. 🤍",

            image:
                "https://media1.tenor.com/m/cCJohJfASEwAAAAC/h.gif"

        },


        "3": {

            title:
                "Your Choice 🎁",

            text:
                "This one is completely yours. Whenever you want something from me — an image, an answer to a question, something silly, something sweet, anything at all — just ask. I cannot say no. ;)"

        }

    };


    $$(".gift").forEach(
        gift => {

            gift.addEventListener(
                "click",
                () => {

                    if (
                        gift.disabled
                    ) {
                        return;
                    }


                    const data =
                        giftData[
                            gift.dataset.gift
                        ];


                    if (
                        !data ||
                        !giftMessage
                    ) {
                        return;
                    }


                    let html = `
                        <h3>
                            ${data.title}
                        </h3>

                        <p>
                            ${data.text}
                        </p>
                    `;


                    if (data.image) {

                        html += `
                            <img
                                src="${data.image}"
                                alt=""
                            >
                        `;

                    }


                    giftMessage.innerHTML =
                        html;


                    show(giftMessage);


                    gift.animate(
                        [
                            {
                                transform:
                                    "scale(1)"
                            },
                            {
                                transform:
                                    "scale(1.03)"
                            },
                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration: 350,
                            easing:
                                "cubic-bezier(0.22, 1, 0.36, 1)"
                        }
                    );


                    giftMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }
            );

        }
    );


    /* =====================================================
       LITTLE REMINDERS
       ===================================================== */

    const thingReminder =
        $("#thing-reminder-message");


    $$(".thing-card").forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    if (
                        !thingReminder
                    ) {
                        return;
                    }


                    thingReminder.innerHTML = `
                        <span class="reminder-kicker">
                            ${card.dataset.reminder}
                        </span>

                        <p>
                            ${card.dataset.reminderMessage}
                        </p>
                    `;


                    show(
                        thingReminder
                    );


                    $$(".thing-card").forEach(
                        other => {

                            other.classList.remove(
                                "is-selected"
                            );

                        }
                    );


                    card.classList.add(
                        "is-selected"
                    );


                    thingReminder.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }
            );

        }
    );


    /* =====================================================
       COMPLIMENTS
       ===================================================== */

    const complimentMessage =
        $("#compliment-message");


    $$(".compliment-card").forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    if (
                        complimentMessage
                    ) {

                        complimentMessage.innerHTML = `
                            <span>
                                a little reminder ♡
                            </span>

                            <p>
                                ${card.dataset.compliment}
                            </p>
                        `;

                        show(
                            complimentMessage
                        );

                    }


                    $$(".compliment-card").forEach(
                        other => {

                            other.classList.remove(
                                "is-selected"
                            );

                        }
                    );


                    card.classList.add(
                        "is-selected"
                    );


                    card.animate(
                        [
                            {
                                transform:
                                    "translateY(0)"
                            },
                            {
                                transform:
                                    "translateY(-6px) scale(1.02)"
                            },
                            {
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 400,
                            easing:
                                "cubic-bezier(0.22, 1, 0.36, 1)"
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       SURPRISE
       ===================================================== */

    const surpriseButton =
        $("#surprise-button");

    const surpriseContent =
        $("#surprise-content");


    surpriseButton?.addEventListener(
        "click",
        () => {

            show(
                surpriseContent
            );


            surpriseButton.textContent =
                "You found it ♡";


            surpriseButton.disabled =
                true;


            createFloatingEmoji(
                "💛",
                8
            );


            surpriseContent.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );


    /* =====================================================
       FLOATING EMOJI
       ===================================================== */

    function createFloatingEmoji(
        emoji,
        amount = 5
    ) {

        const container =
            $("#heart-confetti");

        if (!container) return;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const element =
                document.createElement("span");

            element.className =
                "confetti-heart";

            element.textContent =
                emoji;

            element.style.left =
                `${Math.random() * 100}%`;

            element.style.top =
                `${55 + Math.random() * 35}%`;

            element.style.fontSize =
                `${0.8 + Math.random() * 0.9}rem`;

            element.style.animationDelay =
                `${Math.random() * 0.25}s`;


            container.appendChild(
                element
            );


            setTimeout(
                () => {
                    element.remove();
                },
                3200
            );

        }

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealTargets = [

        ".story-content",
        ".story-question",
        ".memory-card",
        ".timeline-item",
        ".thing-card",
        ".envelope",
        ".song-card",
        ".gift",
        ".compliment-card"

    ];


    const revealElements =
        $$(revealTargets.join(","));


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                if (
                    memoryModal?.classList.contains(
                        "open"
                    )
                ) {

                    closeMemory();

                }


                if (
                    letterPopup?.classList.contains(
                        "is-open"
                    )
                ) {

                    closeLetterPopup();

                }

            }

        }
    );


    /* =====================================================
       TIME SINCE WE FIRST SPOKE
       ===================================================== */

    const FIRST_SPOKE_AT =
        Date.parse(
            "2026-07-23T12:23:49.099Z"
        );

    const sinceDays =
        $("#since-days");

    const sinceHours =
        $("#since-hours");

    const sinceMins =
        $("#since-mins");

    const sinceSecs =
        $("#since-secs");

    const pad2 = (value) =>
        String(value).padStart(2, "0");

    const updateSinceTimer = () => {

        if (
            !sinceDays ||
            !sinceHours ||
            !sinceMins ||
            !sinceSecs
        ) {
            return;
        }

        const now =
            Date.now();

        let diff =
            Math.max(
                0,
                now - FIRST_SPOKE_AT
            );

        const days =
            Math.floor(
                diff / 86400000
            );

        diff %= 86400000;

        const hours =
            Math.floor(
                diff / 3600000
            );

        diff %= 3600000;

        const mins =
            Math.floor(
                diff / 60000
            );

        diff %= 60000;

        const secs =
            Math.floor(
                diff / 1000
            );

        sinceDays.textContent =
            String(days);

        sinceHours.textContent =
            pad2(hours);

        sinceMins.textContent =
            pad2(mins);

        sinceSecs.textContent =
            pad2(secs);

    };

    updateSinceTimer();

    setInterval(
        updateSinceTimer,
        1000
    );


    /* =====================================================
       NEXT SECTION SCROLL
       ===================================================== */

    const nextSectionButton =
        $("#next-section");

    const nextSectionIcon =
        $("#next-section-icon");

    const pageSections =
        $$("main .section");

    const HEADER_SCROLL_OFFSET =
        100;

    const getNextSection = () =>
        pageSections.find(section => {
            const top =
                section.getBoundingClientRect()
                    .top;

            return top > HEADER_SCROLL_OFFSET + 8;
        });

    const updateNextSectionButton = () => {

        if (
            !nextSectionButton ||
            !nextSectionIcon
        ) {
            return;
        }

        const next =
            getNextSection();

        if (next) {

            nextSectionButton.classList.remove(
                "is-top"
            );

            nextSectionButton.setAttribute(
                "aria-label",
                "Next section"
            );

            nextSectionIcon.textContent =
                "↓";

        } else {

            nextSectionButton.classList.add(
                "is-top"
            );

            nextSectionButton.setAttribute(
                "aria-label",
                "Back to top"
            );

            nextSectionIcon.textContent =
                "↑";

        }

    };

    nextSectionButton?.addEventListener(
        "click",
        () => {

            const next =
                getNextSection();

            if (next) {

                next.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            } else {

                const top =
                    $("#top");

                top?.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            }

        }
    );

    window.addEventListener(
        "scroll",
        updateNextSectionButton,
        {
            passive:
                true
        }
    );

    window.addEventListener(
        "resize",
        updateNextSectionButton
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateLoveMeter();
    updatePlayer();
    updateNextSectionButton();

});