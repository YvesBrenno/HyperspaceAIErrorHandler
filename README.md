# HyperspaceAI Error Handler

This repository provides a Tampermonkey UserScript designed to maintain persistent connectivity with the [HyperspaceAI](https://node.hyper.space) platform. The script intelligently monitors the connection state, handles WebGPU-related pop-ups, and automates the reconnection process in the event of failures — all to ensure a smoother and more stable user experience.

---

## 🚀 Features

- ✅ **Automatic Reconnection**: Detects disconnections and attempts to reconnect seamlessly.
- ✅ **Error Handling**: Automatically closes WebGPU-related pop-ups that may interrupt sessions.
- ✅ **Failsafe Reload**: Reloads the page after a set number of failed reconnection attempts.
- ✅ **Improved Selector Logic**: Uses refined CSS selectors to reliably interact with the UI.
- ✅ **Bypass Enhancements**: Includes tweaks to mitigate potential API-related access blocks.

---

## 🛠️ How to Use

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension in your browser.
2. Create a new UserScript and paste the contents of the provided script.
3. Save and enable the script.
4. Navigate to [node.hyper.space](https://node.hyper.space) — the script will handle the rest automatically.

---

## ⚠️ Notes

- If the script does not behave as expected, try refreshing the page or reloading the script.
- The connection mechanism relies on a specific CSS selector, which may change if the platform updates its UI.
- For suggestions, fixes, or improvements, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
