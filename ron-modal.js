/*!
 * Ron Modern Modal v1.0.0
 * Advanced modal with auto-dismiss timer & Keep Open feature
 * Simple API with icon customization (SVG, Font Awesome, Emoji, HTML)
 * FIXED: Custom SVG icons, emoji sizing
 * MIT License
 */

(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        global.RonModal = factory();
    }
})(typeof window !== "undefined" ? window : this, function() {
    "use strict";

    // ============================================
    // DEFAULT BUILT-IN SVG ICONS
    // ============================================
    const DEFAULT_ICONS = {
        info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
        danger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M368 128c0 44.4-25.4 83.5-64 106.4l0 21.6c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32l0-21.6c-38.6-23-64-62.1-64-106.4C80 57.3 144.5 0 224 0s144 57.3 144 128zM168 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM3.4 273.7c7.9-15.8 27.1-22.2 42.9-14.3L224 348.2l177.7-88.8c15.8-7.9 35-1.5 42.9 14.3s1.5 35-14.3 42.9L295.6 384l134.8 67.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L224 419.8 46.3 508.6c-15.8 7.9-35 1.5-42.9-14.3s-1.5-35 14.3-42.9L152.4 384 17.7 316.6C1.9 308.7-4.5 289.5 3.4 273.7z"/></svg>`,
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>`,
        hourglass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 0zM96 75l0-11 192 0 0 11c0 25.5-10.1 49.9-28.1 67.9L192 210.7l-67.9-67.9C106.1 124.9 96 100.5 96 75z"/></svg>`,
        check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`,
        lock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>`,
        hand: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-58.7-58.7c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32z"/></svg>`,
        trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`,
        stop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>`,
        pin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l-11.4 148.5c-1.3 17.1 4.8 34 16.5 46.1L336 304.2V448c0 17.7-14.3 32-32 32H320c-17.7 0-32-14.3-32-32V336l-64-64-64 64V448c0 17.7-14.3 32-32 32H80c-17.7 0-32-14.3-32-32V304.2l40.4-41.6c11.7-12.1 17.8-29 16.5-46.1L93.5 64H64C46.3 64 32 49.7 32 32z"/></svg>`,
    };

    let activeTimerId = null;
    let isModalVisible = false;
    let overlayElement = null;
    let currentCloseCallback = null;

    // Helper: Stop active timer
    function stopTimer() {
        if (activeTimerId) {
            clearInterval(activeTimerId);
            activeTimerId = null;
        }
    }

    // Helper: Start countdown timer
    function startTimer(seconds, onComplete) {
        stopTimer();
        if (!seconds || seconds <= 0) return null;

        let remaining = seconds;
        const timerContainer = document.getElementById("ron-modal-timer-container");
        const timerSecondsSpan = document.getElementById("ron-timer-seconds");

        if (timerContainer && timerSecondsSpan) {
            timerContainer.style.display = "flex";
            timerSecondsSpan.textContent = remaining;
        }

        const timerId = setInterval(() => {
            if (!isModalVisible) {
                clearInterval(timerId);
                return;
            }
            remaining--;
            if (remaining <= 0) {
                clearInterval(timerId);
                if (isModalVisible && onComplete) {
                    onComplete();
                }
            } else {
                if (timerSecondsSpan) timerSecondsSpan.textContent = remaining;
            }
        }, 1000);

        return timerId;
    }

    // Helper: Detect if string is a Font Awesome class
    function isFontAwesomeClass(str) {
        return typeof str === "string" && (str.startsWith("fa-") || str.includes("fa-") || str.startsWith("fas ") || str.startsWith("far ") || str.startsWith("fal ") || str.startsWith("fab "));
    }

    // Helper: Detect if string is an emoji (simple detection)
    function isEmoji(str) {
        if (typeof str !== "string") return false;
        const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE0F}]|[\u{1F1E6}-\u{1F1FF}]/u;
        return emojiRegex.test(str) && str.length <= 4;
    }

    // Helper: Create icon element from various formats
    function createIconElement(icon, iconColor, iconBackground, isButtonIcon = false) {
        if (!icon) return null;

        // If it's already an HTML element, return as is
        if (icon instanceof HTMLElement) {
            if (iconColor) icon.style.color = iconColor;
            return icon;
        }

        // Check if it's a Font Awesome class
        if (isFontAwesomeClass(icon)) {
            const i = document.createElement("i");
            i.className = icon;
            if (iconColor) i.style.color = iconColor;
            return i;
        }

        // Check if it's an emoji
        if (isEmoji(icon)) {
            const span = document.createElement("span");
            span.textContent = icon;
            if (isButtonIcon) {
                span.className = "ron-btn-emoji";
            } else {
                span.className = "ron-emoji-icon";
                span.style.fontSize = "32px";
            }
            if (iconColor) span.style.color = iconColor;
            return span;
        }

        // Check if it's a built-in icon name
        if (typeof icon === "string" && DEFAULT_ICONS[icon]) {
            const div = document.createElement("div");
            div.innerHTML = DEFAULT_ICONS[icon].trim();
            const svg = div.firstChild;
            if (iconColor) svg.style.fill = iconColor;
            return svg;
        }

        // Check if it's a custom SVG string
        if (typeof icon === "string" && icon.includes("<svg")) {
            const div = document.createElement("div");
            div.innerHTML = icon.trim();
            const svg = div.firstChild;
            if (iconColor) svg.style.fill = iconColor;
            return svg;
        }

        // Check if it's a URL to an image
        if (typeof icon === "string" && (icon.startsWith("http") || icon.startsWith("/"))) {
            const img = document.createElement("img");
            img.src = icon;
            img.style.width = isButtonIcon ? "16px" : "32px";
            img.style.height = isButtonIcon ? "16px" : "32px";
            return img;
        }

        // Fallback: treat as text
        const span = document.createElement("span");
        span.textContent = icon;
        if (isButtonIcon) {
            span.className = "ron-btn-emoji";
        } else {
            span.className = "ron-emoji-icon";
            span.style.fontSize = "28px";
        }
        if (iconColor) span.style.color = iconColor;
        return span;
    }

    // Close modal
    function closeModal(options = {}) {
        if (!overlayElement) return;

        stopTimer();

        overlayElement.classList.remove("ron-modal-active");
        isModalVisible = false;

        if (currentCloseCallback && typeof currentCloseCallback === "function") {
            currentCloseCallback();
            currentCloseCallback = null;
        }

        if (options.onClose && typeof options.onClose === "function") {
            options.onClose();
        }
    }

    // Initialize modal DOM structure
    function initModalStructure() {
        if (document.getElementById("ron-modal-overlay")) {
            overlayElement = document.getElementById("ron-modal-overlay");
            return;
        }

        const overlay = document.createElement("div");
        overlay.id = "ron-modal-overlay";
        overlay.className = "ron-modal-overlay";
        overlay.innerHTML = `
      <div class="ron-modal-box">
        <div class="ron-modal-icon-wrap" id="ron-modal-icon-wrap">
          <span id="ron-modal-icon"></span>
        </div>
        <div class="ron-modal-header">
          <h3 id="ron-modal-title"></h3>
        </div>
        <div class="ron-modal-body" id="ron-modal-message"></div>
        <div id="ron-modal-timer-container" class="ron-modal-timer" style="display: none;">
          <span class="timer-icon" id="ron-timer-icon"></span>
          <span>Auto dismiss in</span>
          <span id="ron-timer-seconds" class="timer-countdown">0</span>
          <span>seconds</span>
        </div>
        <div class="ron-modal-actions" id="ron-modal-actions"></div>
      </div>
    `;

        document.body.appendChild(overlay);

        // Set default timer icon
        const timerIconSpan = document.getElementById("ron-timer-icon");
        if (timerIconSpan) {
            const div = document.createElement("div");
            div.innerHTML = DEFAULT_ICONS.hourglass.trim();
            timerIconSpan.appendChild(div.firstChild);
        }

        // Click outside to close
        overlay.addEventListener("click", (e) => {
            if (e.target.id === "ron-modal-overlay") {
                closeModal();
            }
        });

        // ESC key listener
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isModalVisible) {
                closeModal();
            }
        });

        overlayElement = overlay;
    }

    // Get modal type class
    function getTypeClass(type) {
        const typeMap = {
            info: "ron-modal-type-info",
            success: "ron-modal-type-success",
            warning: "ron-modal-type-warning",
            danger: "ron-modal-type-danger",
        };
        return typeMap[type] || "ron-modal-type-info";
    }

    // Show modal
    function showModal(config) {
        initModalStructure();
        stopTimer();

        if (config.onClose && typeof config.onClose === "function") {
            currentCloseCallback = config.onClose;
        } else {
            currentCloseCallback = null;
        }

        const {
            type = "info",
                title = "",
                message = "",
                buttons = [],
                temp = 0,
                icon = null,
                iconColor = null,
                iconBackground = null,
        } = config;

        const iconWrap = document.getElementById("ron-modal-icon-wrap");
        const iconSpan = document.getElementById("ron-modal-icon");
        const actions = document.getElementById("ron-modal-actions");
        const timerContainer = document.getElementById("ron-modal-timer-container");

        // Set icon
        if (iconWrap && iconSpan) {
            iconWrap.className = `ron-modal-icon-wrap ${getTypeClass(type)}`;
            iconSpan.innerHTML = "";

            if (icon) {
                // Use custom icon
                const customIcon = createIconElement(icon, iconColor, iconBackground, false);
                if (customIcon) {
                    iconSpan.appendChild(customIcon);
                } else {
                    // Fallback to default
                    const div = document.createElement("div");
                    div.innerHTML = DEFAULT_ICONS[type] || DEFAULT_ICONS.info;
                    const svg = div.firstChild;
                    if (iconColor) svg.style.fill = iconColor;
                    iconSpan.appendChild(svg);
                }
            } else {
                // Use default icon based on type
                const div = document.createElement("div");
                div.innerHTML = DEFAULT_ICONS[type] || DEFAULT_ICONS.info;
                const svg = div.firstChild;
                if (iconColor) svg.style.fill = iconColor;
                iconSpan.appendChild(svg);
            }

            // Apply background if specified
            if (iconBackground) {
                iconWrap.style.backgroundColor = iconBackground;
            }
        }

        // Set title and message
        const titleEl = document.getElementById("ron-modal-title");
        const messageEl = document.getElementById("ron-modal-message");
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;

        // Clear and rebuild buttons
        if (actions) {
            actions.innerHTML = "";

            buttons.forEach((btn) => {
                const button = document.createElement("button");
                const btnStyle = btn.style || "outline";
                button.className = `ron-modal-btn ron-modal-btn-${btnStyle}`;

                // Add icon if specified
                if (btn.icon) {
                    const btnIcon = createIconElement(btn.icon, btn.iconColor, btn.iconBackground, true);
                    if (btnIcon) {
                        button.appendChild(btnIcon);
                    }
                }

                const textSpan = document.createTextNode(btn.text);
                button.appendChild(textSpan);

                const isKeepOpen = btn.isKeepOpen === true;

                button.onclick = () => {
                    if (btn.onClick && typeof btn.onClick === "function") {
                        btn.onClick();
                    }

                    if (isKeepOpen) {
                        stopTimer();
                        if (timerContainer) {
                            timerContainer.style.display = "none";
                        }
                    } else {
                        closeModal();
                    }
                };

                actions.appendChild(button);
            });
        }

        // Handle auto-dismiss timer
        if (temp && typeof temp === "number" && temp > 0) {
            activeTimerId = startTimer(temp, () => {
                if (isModalVisible) {
                    closeModal();
                }
            });
        } else {
            if (timerContainer) timerContainer.style.display = "none";
        }

        // Show overlay
        if (overlayElement) {
            overlayElement.classList.add("ron-modal-active");
            isModalVisible = true;
        }
    }

    // Public API
    return {
        show: showModal,
        close: closeModal,
        isOpen: () => isModalVisible,
    };
});