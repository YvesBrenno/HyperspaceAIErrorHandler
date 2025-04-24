// ==UserScript==
// @name         HyperspaceAI Auto Reconnect
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Auto reconnect for HyperspaceAI web with ON/OFF button
// @author       VesyXMR
// @match        https://node.hyper.space/*
// @grant        none
// ==/UserScript==

(function autoClick() {
    "use strict";

    let reconnect_times = 0;
    const reconnect_limit = 50;
    const waittime = 3000;
    const timeperiod = 2000;
    let script_enabled = true; // Estado inicial do script (ativado)

    console.log("✅ HyperspaceAI Auto Reconnect script iniciado!");

    const errordiv_str =
        'div[class="flex flex-col gap-2"] > div[class="flex flex-col gap-2 rounded-md bg-container p-4 text-sm text-foreground"]';
    const close_webGPU_button_str =
        'button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]';
    const canvas_str = "div.flex.items-center.justify-center > div.flex.items-center.bg-background";
    const str = 'button[role="switch"][value="on"]';

    // Função para criar o botão ON/OFF na página
    function createToggleButton() {
        const button = document.createElement("button");
        button.id = "vesyxmr-toggle";
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.zIndex = "10000";
        button.style.padding = "10px 15px";
        button.style.backgroundColor = script_enabled ? "#4CAF50" : "#FF4444";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.fontSize = "14px";
        button.style.fontWeight = "bold";
        button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        button.style.display = "flex";
        button.style.flexDirection = "column";
        button.style.alignItems = "center";
        button.style.textAlign = "center";

        const title = document.createElement("div");
        title.innerText = "Made by VesyXMR";
        title.style.fontSize = "12px";
        title.style.marginBottom = "5px";

        const status = document.createElement("div");
        status.innerText = script_enabled ? "ON" : "OFF";
        status.style.fontSize = "16px";
        status.style.fontWeight = "bold";

        button.appendChild(title);
        button.appendChild(status);

        button.addEventListener("click", () => {
            script_enabled = !script_enabled;
            status.innerText = script_enabled ? "ON" : "OFF";
            button.style.backgroundColor = script_enabled ? "#4CAF50" : "#FF4444";
            console.log(`🔄 Script ${script_enabled ? "ativado" : "desativado"}`);
        });

        document.body.appendChild(button);
    }

    setTimeout(() => {
        createToggleButton(); // Adiciona o botão à página

        function getbutton() {
            if (!script_enabled) return; // Se desativado, para a execução

            const button = document.querySelector(str);
            if (button) {
                console.log("✅ Botão de conexão detectado!");
                autocheckandkick(button);
            } else {
                console.warn("❌ Botão de conexão não encontrado. Verifique o seletor.");
            }
        }

        function autocheckandkick(button) {
            if (!script_enabled) return; // Se desativado, para a execução

            const webGPU = document.querySelector(errordiv_str);
            if (webGPU) {
                console.warn("⚠️ WebGPU Popup detectado. Fechando...");
                const close_webGPU_button = document.querySelector(close_webGPU_button_str);
                if (close_webGPU_button) close_webGPU_button.click();
            }

            const aria_checked = button.getAttribute("aria-checked");
            const data_state = button.getAttribute("data-state");

            console.log(`🔍 Estado do botão: aria-checked="${aria_checked}", data-state="${data_state}"`);

            if (aria_checked === "false" && data_state === "unchecked") {
                if (reconnect_times >= reconnect_limit) {
                    console.warn("🔄 Tentativas máximas atingidas. Recarregando página...");
                    location.reload();
                    return;
                }

                const button_canvas = document.querySelector(canvas_str);
                if (!button_canvas) {
                    console.warn(`🔄 Tentando reconectar... (${reconnect_times})`);
                    button.click();
                } else {
                    console.log(`⏳ O programa já está tentando conectar... (${reconnect_times})`);
                }
                reconnect_times++;
            } else {
                reconnect_times = 0;
                console.info("✅ Conexão ativa!");
            }
        }

        setInterval(getbutton, timeperiod);
    }, waittime);
})();
