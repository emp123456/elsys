/* ==========================================================================
   LÓGICA JAVASCRIPT PARA INTERATIVIDADE - ELSYS WI-FI MÍDIA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MENU MOBILE
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpened = mobileMenuBtn.classList.toggle('active');
            if (isOpened) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#000000';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid var(--color-border)';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    /* ==========================================================================
       1. ANIMAÇÃO INTERATIVA "PLUG & PLAY" DA TOMADA
       ========================================================================== */
    const togglePowerBtn = document.getElementById('toggle-power-btn');
    const btnPowerText = document.getElementById('btn-power-text');
    const plugDevice = document.getElementById('plug-device');
    const interactiveRouter = document.getElementById('interactive-router');
    const interactivePhone = document.getElementById('interactive-phone');
    const phoneScreenMsg = document.getElementById('phone-screen-msg');
    const energyFlow = document.getElementById('energy-flow-path');
    
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    let powerTimer1 = null;
    let powerTimer2 = null;
    let isConnected = false;

    // Conteúdo HTML do celular conectado (Estado Online)
    const phoneConnectedHTML = `
        <div class="online-state">
            <div class="online-state-header">
                <i class="fa-solid fa-circle-check text-green"></i>
                <h4>Wi-Fi Conectado</h4>
                <p>Rede: ELSYS_WIFI_GRATIS</p>
            </div>
            <div class="online-ad-card">
                <span>CAMPANHA</span>
                <h5>UPA Clinica / Saúde</h5>
                <p>Previna-se contra a Dengue: elimine água parada em recipientes. A saúde é um dever de todos.</p>
            </div>
        </div>
    `;

    // Conteúdo HTML do celular desconectado (Estado Offline)
    const phoneDisconnectedHTML = `
        <div class="offline-state">
            <i class="fa-solid fa-wifi-slash"></i>
            <p>Sem Conexão Wi-Fi</p>
            <span class="hint">Ligue o roteador ELSYS para ativar a rede</span>
        </div>
    `;

    function resetPowerTimers() {
        if (powerTimer1) clearTimeout(powerTimer1);
        if (powerTimer2) clearTimeout(powerTimer2);
    }

    function togglePower() {
        resetPowerTimers();
        isConnected = !isConnected;

        if (isConnected) {
            // Ligar na Tomada
            btnPowerText.textContent = 'Desconectar Tomada';
            togglePowerBtn.classList.remove('btn-primary');
            togglePowerBtn.classList.add('btn-secondary');
            
            // Mover Plug
            plugDevice.classList.add('connected');
            
            // Ativar passo 1
            step1.classList.add('active');
            step2.classList.remove('active');
            step3.classList.remove('active');

            // Mostrar fluxo de energia no cabo
            if (energyFlow) {
                energyFlow.style.display = 'block';
            }

            // Atraso de 800ms: Router liga (Passo 2)
            powerTimer1 = setTimeout(() => {
                interactiveRouter.classList.remove('offline');
                interactiveRouter.classList.add('online');
                
                step1.classList.remove('active');
                step2.classList.add('active');

                // Atraso de 1800ms (1s depois do router): Celular conecta (Passo 3)
                powerTimer2 = setTimeout(() => {
                    interactivePhone.classList.remove('offline');
                    interactivePhone.classList.add('online');
                    phoneScreenMsg.innerHTML = phoneConnectedHTML;
                    
                    step2.classList.remove('active');
                    step3.classList.add('active');

                    // Ícone de Wi-Fi no topo do celular fica azul
                    const wifiIcon = document.getElementById('phone-wifi-icon');
                    if (wifiIcon) wifiIcon.className = 'fa-solid fa-wifi text-cyan';
                }, 1200);

            }, 800);

        } else {
            // Desconectar da Tomada
            btnPowerText.textContent = 'Ligar na Tomada';
            togglePowerBtn.classList.remove('btn-secondary');
            togglePowerBtn.classList.add('btn-primary');
            
            // Retornar Plug
            plugDevice.classList.remove('connected');
            
            // Desativar Roteador e Celular
            interactiveRouter.classList.remove('online');
            interactiveRouter.classList.add('offline');
            
            interactivePhone.classList.remove('online');
            interactivePhone.classList.add('offline');
            phoneScreenMsg.innerHTML = phoneDisconnectedHTML;
            
            // Ocultar fluxo de energia
            if (energyFlow) {
                energyFlow.style.display = 'none';
            }

            // Resetar passos ativos
            step1.classList.add('active');
            step2.classList.remove('active');
            step3.classList.remove('active');

            const wifiIcon = document.getElementById('phone-wifi-icon');
            if (wifiIcon) wifiIcon.className = 'fa-solid fa-wifi';
        }
    }

    if (togglePowerBtn) {
        togglePowerBtn.addEventListener('click', togglePower);
    }


    /* ==========================================================================
       2. SIMULADOR DE MARKETING (O PUBLICADOR)
       ========================================================================== */
    const simButtons = document.querySelectorAll('.sim-btn');
    const simScreens = document.querySelectorAll('.sim-screen');
    const adCounter = document.getElementById('ad-counter');
    const adSkipBtn = document.getElementById('ad-skip-btn');
    const btnSubmitPortal = document.getElementById('btn-submit-portal');
    const btnAccessCampaign = document.getElementById('btn-access-campaign');
    const btnRestartSim = document.getElementById('btn-restart-sim');

    let countdownVal = 7;
    let countdownInterval = null;

    function resetCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        countdownVal = 7;
        if (adCounter) adCounter.textContent = 'Conectando em 7s...';
        if (adSkipBtn) {
            adSkipBtn.textContent = 'Aguarde...';
            adSkipBtn.disabled = true;
            adSkipBtn.className = 'btn btn-disabled';
        }
    }

    function startCountdown() {
        resetCountdown();
        
        countdownInterval = setInterval(() => {
            countdownVal--;
            if (adCounter) adCounter.textContent = `Conectando em ${countdownVal}s...`;
            
            if (countdownVal <= 0) {
                clearInterval(countdownInterval);
                if (adCounter) adCounter.textContent = 'Anúncio visualizado';
                if (adSkipBtn) {
                    adSkipBtn.textContent = 'Acessar Rede Wi-Fi';
                    adSkipBtn.disabled = false;
                    adSkipBtn.className = 'btn btn-primary btn-portal';
                }
            }
        }, 1000);
    }

    function switchSimScreen(targetId) {
        // Atualiza botões de controle
        simButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Atualiza telas do celular
        simScreens.forEach(screen => {
            if (screen.id === `screen-${targetId}`) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        // Lógicas especiais de transição
        if (targetId === 'pre-login') {
            startCountdown();
        } else {
            resetCountdown();
        }
    }

    // Eventos nos botões de controle do simulador
    simButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchSimScreen(target);
        });
    });

    // Ao clicar em Pular anúncio / Acessar rede
    if (adSkipBtn) {
        adSkipBtn.addEventListener('click', () => {
            switchSimScreen('cadastro');
        });
    }

    // Formulário do portal de login fictício
    if (btnSubmitPortal) {
        btnSubmitPortal.addEventListener('click', (e) => {
            e.preventDefault();
            btnSubmitPortal.textContent = 'Conectando...';
            btnSubmitPortal.disabled = true;
            
            setTimeout(() => {
                btnSubmitPortal.textContent = 'Cadastrar e Conectar';
                btnSubmitPortal.disabled = false;
                switchSimScreen('pos-login');
            }, 1200);
        });
    }

    // Pós-login: acessar campanha → tela Conectado
    if (btnAccessCampaign) {
        btnAccessCampaign.addEventListener('click', () => {
            switchSimScreen('conectado');
        });
    }

    // Reiniciar Simulador
    if (btnRestartSim) {
        btnRestartSim.addEventListener('click', () => {
            switchSimScreen('pre-login');
        });
    }

    // Iniciar contagem do simulador imediatamente
    startCountdown();


    /* ==========================================================================
       3. PAINEL DE RELATÓRIOS & DASHBOARD (ATUALIZAÇÃO DE DADOS)
       ========================================================================== */
    const countOnlineEl = document.getElementById('count-online');
    const countRegsEl = document.getElementById('count-registrations');
    const countVisitsEl = document.getElementById('count-visits');
    const countRoutersEl = document.getElementById('count-routers');
    const periodSelect = document.getElementById('dash-period-select');
    const chartBars = document.querySelectorAll('.bar-chart-bars .bar');

    // Dados simulados para cada período
    const periodData = {
        '7': {
            online: 26,
            regs: '27.686',
            visits: '11.605',
            routers: 27,
            heights: [70, 25, 85, 30, 92, 40, 78, 32, 82, 28, 72, 33, 50, 18]
        },
        '30': {
            online: 24,
            regs: '120.450',
            visits: '48.210',
            routers: 27,
            heights: [90, 45, 95, 50, 88, 55, 92, 60, 85, 48, 80, 52, 75, 35]
        },
        'total': {
            online: 25,
            regs: '412.390',
            visits: '162.880',
            routers: 29,
            heights: [95, 60, 90, 65, 98, 75, 92, 80, 94, 70, 88, 72, 82, 55]
        }
    };

    function animateChartBars(heightsArray) {
        let barIndex = 0;
        chartBars.forEach((bar) => {
            if (barIndex < heightsArray.length) {
                const targetHeight = heightsArray[barIndex];
                bar.style.height = `${targetHeight}%`;
                barIndex++;
            }
        });
    }

    function updateDashboard(period) {
        const data = periodData[period];
        if (!data) return;

        // Atualizar valores de texto
        if (countOnlineEl) countOnlineEl.textContent = data.online;
        if (countRegsEl) countRegsEl.textContent = data.regs;
        if (countVisitsEl) countVisitsEl.textContent = data.visits;
        if (countRoutersEl) countRoutersEl.textContent = data.routers;

        // Animar as colunas do gráfico
        animateChartBars(data.heights);
    }

    if (periodSelect) {
        periodSelect.addEventListener('change', (e) => {
            updateDashboard(e.target.value);
        });
    }

    // Flutuação realista do contador de visitantes online
    setInterval(() => {
        if (countOnlineEl) {
            const currentVal = parseInt(countOnlineEl.textContent);
            const diff = Math.floor(Math.random() * 5) - 2;
            let newVal = currentVal + diff;
            
            if (newVal < 18) newVal = 18;
            if (newVal > 34) newVal = 34;
            
            countOnlineEl.textContent = newVal;
        }
    }, 4000);

    // Inicializa o gráfico do dashboard após 500ms
    setTimeout(() => {
        updateDashboard('7');
    }, 500);


    /* ==========================================================================
       4. FORMULÁRIO DE CONTATO (LEAD)
       ========================================================================== */
    const leadForm = document.getElementById('lead-form');
    const formSuccessMsg = document.getElementById('form-success-msg');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Enviando Dados...';
            submitBtn.disabled = true;

            setTimeout(() => {
                leadForm.style.display = 'none';
                if (formSuccessMsg) {
                    formSuccessMsg.style.display = 'block';
                }
            }, 1500);
        });
    }

    /* ==========================================================================
       5. ACORDEÃO DE FAQ (Perguntas Frequentes)
       ========================================================================== */
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            const content = item.querySelector('.faq-content');
            
            // Fecha outros itens (opcional, estilo SKY)
            const activeItems = document.querySelectorAll('.faq-item.active');
            activeItems.forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-content').style.maxHeight = '0';
                }
            });

            const isActive = item.classList.toggle('active');
            
            if (isActive) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    /* ==========================================================================
       6. BANNER DE COOKIES INTERATIVO
       ========================================================================== */
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');

    // Verificar se já aceitou cookies na sessão
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    
    if (cookieBanner && !cookiesAccepted) {
        // Exibe o banner após 1 segundo
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
        }, 1000);
    } else if (cookieBanner) {
        cookieBanner.classList.add('hidden');
    }

    if (cookieAcceptBtn && cookieBanner) {
        cookieAcceptBtn.addEventListener('click', () => {
            cookieBanner.classList.add('hidden');
            localStorage.setItem('cookies-accepted', 'true');
        });
    }

    /* ==========================================================================
       Navegação ativa na Navbar ao rolar a página
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

});
