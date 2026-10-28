/**
 * PuntoGo Landing Page - Main Interactive Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initFeatureTabs();
  initMockupTabs();
  initGirosAndModules();
  initBillingToggle();
  initCalculator();
  initFaqAccordion();
  initWhatsAppLinks();
  initMobileMenu();
  initPricingTableFilter();
});

/* ----------------------------------------------------
   1. Feature Tabs Tour
   ---------------------------------------------------- */
function initFeatureTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".feature-tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      // Deactivate all
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Activate current
      tab.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

/* ----------------------------------------------------
   1.1 Hero Mockup Interactive Live Simulation Engine
   ---------------------------------------------------- */
let simulationTimeouts = [];

function clearSimTimeouts() {
  simulationTimeouts.forEach(clearTimeout);
  simulationTimeouts = [];
}

function simTimeout(fn, ms) {
  const t = setTimeout(fn, ms);
  simulationTimeouts.push(t);
  return t;
}

function moveCursorTo(cursorEl, targetEl, pulseEl) {
  if (!cursorEl || !targetEl) return;
  const parent = cursorEl.parentElement;
  if (!parent) return;
  const parentRect = parent.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  const left = targetRect.left - parentRect.left + targetRect.width / 2 - 4;
  const top = targetRect.top - parentRect.top + targetRect.height / 2 - 4;

  cursorEl.style.left = `${Math.round(left)}px`;
  cursorEl.style.top = `${Math.round(top)}px`;

  if (pulseEl) {
    pulseEl.style.left = `${Math.round(left + 2)}px`;
    pulseEl.style.top = `${Math.round(top + 2)}px`;
  }
}

function triggerClick(cursorEl, pulseEl) {
  if (cursorEl) cursorEl.classList.add("click");
  if (pulseEl) {
    pulseEl.classList.remove("pulsing");
    void pulseEl.offsetWidth; // reflow
    pulseEl.classList.add("pulsing");
  }
  setTimeout(() => {
    if (cursorEl) cursorEl.classList.remove("click");
  }, 220);
}

// 1. POS Simulation con Modal Real de Producto
function runPosSimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-pos");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-pos");
  const pulse = document.getElementById("demo-pulse-pos");
  const btnAdd1 = document.getElementById("demo-btn-add-1");
  const modal = document.getElementById("demo-pos-modal");
  const stepVal = document.getElementById("demo-step-val");
  const stepPlus = document.getElementById("demo-step-plus");
  const disc0 = document.getElementById("demo-disc-0");
  const disc5 = document.getElementById("demo-disc-5");
  const modalUnit = document.getElementById("demo-modal-unit-label");
  const modalTotal = document.getElementById("demo-modal-total-label");
  const btnModalAdd = document.getElementById("demo-btn-modal-add");

  const emptyNotice = document.getElementById("demo-cart-empty");
  const itemsWrap = document.getElementById("demo-cart-items-wrap");
  const cartBadge = document.getElementById("demo-cart-badge");
  const cartTotal = document.getElementById("demo-cart-total");
  const btnCharge = document.getElementById("demo-btn-charge");
  const toastPos = document.getElementById("demo-toast-pos");

  // Reset Estado Inicial
  if (modal) modal.classList.remove("show");
  if (stepVal) stepVal.textContent = "1";
  if (disc0) disc0.classList.add("active");
  if (disc5) disc5.classList.remove("active");
  if (modalUnit) modalUnit.textContent = "$882.51";
  if (modalTotal) modalTotal.textContent = "$882.51";

  if (itemsWrap) itemsWrap.innerHTML = "";
  if (emptyNotice) emptyNotice.style.display = "block";
  if (cartBadge) cartBadge.textContent = "0 artículos";
  if (cartTotal) cartTotal.textContent = "$0.00";
  if (btnCharge) {
    btnCharge.textContent = "Cobrar";
    btnCharge.disabled = true;
    btnCharge.className = "demo-btn-charge";
  }
  if (toastPos) toastPos.style.display = "none";
  if (cursor) {
    cursor.style.left = "42%";
    cursor.style.top = "28%";
  }

  // 1. Mover cursor a "+ Agregar" del producto 1
  simTimeout(() => {
    moveCursorTo(cursor, btnAdd1, pulse);
  }, 700);

  // 2. Clic en "+ Agregar" -> Abre el modal real
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnAdd1) btnAdd1.classList.add("clicked");
    if (modal) modal.classList.add("show");
  }, 1400);

  simTimeout(() => {
    if (btnAdd1) btnAdd1.classList.remove("clicked");
  }, 1600);

  // 3. Mover cursor al botón "+" de cantidad dentro del modal
  simTimeout(() => {
    moveCursorTo(cursor, stepPlus, pulse);
  }, 2200);

  // 4. Clic en "+" -> Sube a 2 unidades y recalcula
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (stepVal) stepVal.textContent = "2";
    if (modalTotal) modalTotal.textContent = "$1,765.02";
  }, 2800);

  // 5. Mover cursor al descuento -5%
  simTimeout(() => {
    moveCursorTo(cursor, disc5, pulse);
  }, 3500);

  // 6. Clic en "-5%" -> Aplica descuento
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (disc0) disc0.classList.remove("active");
    if (disc5) disc5.classList.add("active");
    if (modalTotal) modalTotal.textContent = "$1,676.77";
  }, 4100);

  // 7. Mover cursor al botón "+ Agregar" del modal
  simTimeout(() => {
    moveCursorTo(cursor, btnModalAdd, pulse);
  }, 4800);

  // 8. Clic en "+ Agregar" del modal -> Cierra modal y manda al carrito
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (modal) modal.classList.remove("show");
    if (emptyNotice) emptyNotice.style.display = "none";
    if (itemsWrap) {
      itemsWrap.innerHTML = `
        <div class="demo-cart-row-item">
          <div>
            <span>2x ACRILICO 6MM CORTE</span>
            <small style="display:block; font-size:0.65rem; color:#059669; font-weight:600;">Desc. aplicado: -5%</small>
          </div>
          <strong>$1,676.77</strong>
        </div>`;
    }
    if (cartBadge) cartBadge.textContent = "1 art. (2 pzas)";
    if (cartTotal) cartTotal.textContent = "$1,676.77";
    if (btnCharge) {
      btnCharge.disabled = false;
      btnCharge.classList.add("ready");
      btnCharge.textContent = "Cobrar $1,676.77";
    }
  }, 5400);

  // 9. Mover cursor al botón "Cobrar"
  simTimeout(() => {
    moveCursorTo(cursor, btnCharge, pulse);
  }, 6200);

  // 10. Clic en Cobrar -> Éxito y Ticket
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnCharge) {
      btnCharge.classList.remove("ready");
      btnCharge.classList.add("success");
      btnCharge.textContent = "✓ ¡Cobro Exitoso!";
    }
    if (toastPos) toastPos.style.display = "block";
  }, 6900);

  // Cursor descansa
  simTimeout(() => {
    if (cursor) {
      cursor.style.left = "75%";
      cursor.style.top = "70%";
    }
  }, 7600);

  // Repetir ciclo
  simTimeout(() => {
    runPosSimulation();
  }, 10500);
}

// 2. Cotizaciones Simulation con Modal y Autocompletado Real
function runQuoteSimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-cotiza");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-quote");
  const pulse = document.getElementById("demo-pulse-quote");
  const searchInput = document.getElementById("demo-quote-search-input");
  const dropdown = document.getElementById("demo-quote-dropdown");
  const autoItem1 = document.getElementById("demo-auto-item-1");
  const punitInput = document.getElementById("demo-quote-punit-input");
  const subtInput = document.getElementById("demo-quote-subtotal-input");
  const qSubt = document.getElementById("q-subt-val");
  const qTotal = document.getElementById("q-total-val");
  const btnSave = document.getElementById("demo-btn-save-quote");
  const toast = document.getElementById("demo-quote-saved-toast");

  // Reset
  if (dropdown) dropdown.classList.remove("show");
  if (searchInput) searchInput.value = "";
  if (punitInput) punitInput.value = "$0.00";
  if (subtInput) subtInput.textContent = "$0.00";
  if (qSubt) qSubt.textContent = "$0.00";
  if (qTotal) qTotal.textContent = "$0.00";
  if (btnSave) {
    btnSave.textContent = "💾 Guardar Cotización";
    btnSave.style.background = "#0b2545";
  }
  if (toast) toast.classList.remove("show");
  if (cursor) {
    cursor.style.left = "28%";
    cursor.style.top = "36%";
  }

  // 1. Mover cursor a la barra de búsqueda de partida
  simTimeout(() => {
    moveCursorTo(cursor, searchInput, pulse);
  }, 700);

  // 2. Clic y escribe "A" -> Muestra dropdown de autocompletado
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (searchInput) searchInput.value = "A";
    if (dropdown) dropdown.classList.add("show");
  }, 1400);

  // 3. Mover cursor al primer resultado (ACRILICO 6MM CORTE)
  simTimeout(() => {
    moveCursorTo(cursor, autoItem1, pulse);
  }, 2200);

  // 4. Clic en producto -> Llena campos y totales
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (dropdown) dropdown.classList.remove("show");
    if (searchInput) searchInput.value = "ACRILICO 6MM CORTE";
    if (punitInput) punitInput.value = "$882.51";
    if (subtInput) subtInput.textContent = "$1,765.02";
    if (qSubt) qSubt.textContent = "$1,765.02";
    if (qTotal) qTotal.textContent = "$2,047.42";
  }, 2900);

  // 5. Mover cursor a "Guardar Cotización"
  simTimeout(() => {
    moveCursorTo(cursor, btnSave, pulse);
  }, 3800);

  // 6. Clic en Guardar
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnSave) {
      btnSave.textContent = "✓ Cotización Guardada";
      btnSave.style.background = "#059669";
    }
    if (toast) toast.classList.add("show");
  }, 4500);

  // Cursor descansa
  simTimeout(() => {
    if (cursor) {
      cursor.style.left = "55%";
      cursor.style.top = "65%";
    }
  }, 5300);

  // Repetir ciclo
  simTimeout(() => {
    runQuoteSimulation();
  }, 8500);
}

// 3. Cocina KDS Simulation (3 Columnas Reales)
function runKdsSimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-kds");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-kds");
  const pulse = document.getElementById("demo-pulse-kds");
  const ticket = document.getElementById("demo-kds-ticket-real");
  const slotPend = document.getElementById("kds-slot-pend");
  const slotPrep = document.getElementById("kds-slot-prep");
  const slotDone = document.getElementById("kds-slot-done");
  const emptyPrep = document.getElementById("kds-empty-prep");
  const emptyDone = document.getElementById("kds-empty-done");
  const btnAction = document.getElementById("demo-kds-btn-action");

  const badgePend = document.getElementById("kds-badge-pend");
  const badgePrep = document.getElementById("kds-badge-prep");
  const badgeDone = document.getElementById("kds-badge-done");
  const circlePend = document.getElementById("kds-circle-pend");
  const circlePrep = document.getElementById("kds-circle-prep");
  const circleDone = document.getElementById("kds-circle-done");

  // Reset a Estado Inicial: Ticket en Pendientes
  if (ticket && slotPend) {
    slotPend.appendChild(ticket);
    ticket.classList.remove("prep", "done");
  }
  if (emptyPrep) emptyPrep.style.display = "block";
  if (emptyDone) emptyDone.style.display = "block";

  if (btnAction) {
    btnAction.textContent = "▶ Iniciar Preparación";
    btnAction.style.background = "#2563eb";
    btnAction.disabled = false;
  }

  if (badgePend) badgePend.textContent = "1";
  if (badgePrep) badgePrep.textContent = "0";
  if (badgeDone) badgeDone.textContent = "0";
  if (circlePend) circlePend.textContent = "1";
  if (circlePrep) circlePrep.textContent = "0";
  if (circleDone) circleDone.textContent = "0";

  if (cursor) {
    cursor.style.left = "18%";
    cursor.style.top = "38%";
  }

  // 1. Mover cursor a "▶ Iniciar Preparación" en columna Pendientes
  simTimeout(() => {
    moveCursorTo(cursor, btnAction, pulse);
  }, 800);

  // 2. Clic -> Mueve la orden a "Preparando"
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (ticket && slotPrep) {
      if (emptyPrep) emptyPrep.style.display = "none";
      slotPrep.appendChild(ticket);
      ticket.classList.add("prep");
    }
    if (btnAction) {
      btnAction.textContent = "✓ Marcar como Listo";
      btnAction.style.background = "#10b981";
    }
    if (badgePend) badgePend.textContent = "0";
    if (badgePrep) badgePrep.textContent = "1";
    if (circlePend) circlePend.textContent = "0";
    if (circlePrep) circlePrep.textContent = "1";
  }, 1600);

  // 3. Mover cursor al botón "✓ Marcar como Listo" en columna Preparando
  simTimeout(() => {
    moveCursorTo(cursor, btnAction, pulse);
  }, 2600);

  // 4. Clic -> Mueve la orden a "Listas"
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (ticket && slotDone) {
      if (emptyPrep) emptyPrep.style.display = "block";
      if (emptyDone) emptyDone.style.display = "none";
      slotDone.appendChild(ticket);
      ticket.classList.remove("prep");
      ticket.classList.add("done");
    }
    if (btnAction) {
      btnAction.textContent = "✓ Pedido Listo (Notificado)";
      btnAction.style.background = "#059669";
      btnAction.disabled = true;
    }
    if (badgePrep) badgePrep.textContent = "0";
    if (badgeDone) badgeDone.textContent = "1";
    if (circlePrep) circlePrep.textContent = "0";
    if (circleDone) circleDone.textContent = "1";
  }, 3400);

  // Cursor descansa
  simTimeout(() => {
    if (cursor) {
      cursor.style.left = "78%";
      cursor.style.top = "55%";
    }
  }, 4200);

  // Repetir ciclo
  simTimeout(() => {
    runKdsSimulation();
  }, 8500);
}

// 4. Desglose de Módulos & Restricciones Simulation
function runModulesSimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-modulos");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-mod");
  const pulse = document.getElementById("demo-pulse-mod");
  const switchQuote = document.getElementById("demo-toggle-quote-thumb");
  const btnSave = document.getElementById("demo-btn-save-modules-real");
  const toast = document.getElementById("demo-modules-saved-toast");

  // Reset Inicial
  if (switchQuote) switchQuote.classList.add("on");
  if (btnSave) {
    btnSave.textContent = "💾 Guardar Módulos";
    btnSave.style.background = "#0b2545";
  }
  if (toast) toast.classList.remove("show");
  if (cursor) {
    cursor.style.left = "22%";
    cursor.style.top = "30%";
  }

  // 1. Mover cursor al switch "Cotizaciones en Caja"
  simTimeout(() => {
    moveCursorTo(cursor, switchQuote, pulse);
  }, 800);

  // 2. Clic -> Apagar módulo (Switch a OFF)
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (switchQuote) switchQuote.classList.remove("on");
  }, 1500);

  // 3. Mover cursor a "Guardar Módulos"
  simTimeout(() => {
    moveCursorTo(cursor, btnSave, pulse);
  }, 2400);

  // 4. Clic en "Guardar Módulos" -> Notificación de guardado y sync
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnSave) {
      btnSave.textContent = "✓ Módulos Actualizados";
      btnSave.style.background = "#059669";
    }
    if (toast) toast.classList.add("show");
  }, 3200);

  // 5. Mover cursor de regreso al switch para volver a encenderlo
  simTimeout(() => {
    moveCursorTo(cursor, switchQuote, pulse);
  }, 4300);

  // 6. Clic -> Encender módulo (Switch a ON)
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (switchQuote) switchQuote.classList.add("on");
  }, 5000);

  // 7. Mover cursor de nuevo a Guardar
  simTimeout(() => {
    moveCursorTo(cursor, btnSave, pulse);
  }, 5900);

  // 8. Clic en Guardar
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnSave) {
      btnSave.textContent = "✓ Sincronizado";
      btnSave.style.background = "#059669";
    }
  }, 6600);

  // Cursor descansa
  simTimeout(() => {
    if (cursor) {
      cursor.style.left = "50%";
      cursor.style.top = "70%";
    }
  }, 7300);

  // Repetir ciclo
  simTimeout(() => {
    runModulesSimulation();
  }, 10000);
}

function initMockupTabs() {
  const tabs = document.querySelectorAll(".mockup-tab-pill");
  const views = document.querySelectorAll(".mockup-view");

  const startViewSimulation = (viewId) => {
    if (viewId === "mockup-pos") runPosSimulation();
    else if (viewId === "mockup-cotiza") runQuoteSimulation();
    else if (viewId === "mockup-kds") runKdsSimulation();
    else if (viewId === "mockup-modulos") runModulesSimulation();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-mockup-target");

      tabs.forEach((t) => t.classList.remove("active"));
      views.forEach((v) => v.classList.remove("active"));

      tab.classList.add("active");
      const activeView = document.getElementById(targetView);
      if (activeView) {
        activeView.classList.add("active");
        startViewSimulation(targetView);
      }
    });
  });

  // Start with POS simulation after initial DOM render
  setTimeout(() => {
    startViewSimulation("mockup-pos");
  }, 400);
}

/* ----------------------------------------------------
   1.2 Interactive Business Giros & Modules Preset Selector
   ---------------------------------------------------- */
const GIROS_PRESETS = {
  basic: {
    name: "Punto de Venta Básico",
    modules: {
      hasSales: true,
      hasInventory: true,
      hasQuotes: false,
      hasCustomers: false,
      hasPurchases: false,
      hasMultiWarehouse: false,
      hasHR: false,
      hasRestaurantFeatures: false,
    },
  },
  restaurant: {
    name: "Restaurante & Alimentos",
    modules: {
      hasSales: true,
      hasRestaurantFeatures: true,
      hasInventory: true,
      hasPurchases: true,
      hasQuotes: false,
      hasCustomers: false,
      hasMultiWarehouse: false,
      hasHR: false,
    },
  },
  commercial: {
    name: "Comercial & Servicios",
    modules: {
      hasSales: true,
      hasQuotes: true,
      hasCustomers: true,
      hasPurchases: true,
      hasInventory: true,
      hasMultiWarehouse: false,
      hasHR: false,
      hasRestaurantFeatures: false,
    },
  },
  enterprise: {
    name: "Empresa Completa",
    modules: {
      hasSales: true,
      hasRestaurantFeatures: true,
      hasQuotes: true,
      hasPurchases: true,
      hasMultiWarehouse: true,
      hasHR: true,
      hasCustomers: true,
      hasInventory: true,
    },
  },
};

function initGirosAndModules() {
  const giroCards = document.querySelectorAll(".giro-card");
  const moduleItems = document.querySelectorAll(".module-item");
  const saveBtn = document.getElementById("saveModulesBtn");

  function applyPreset(giroKey) {
    const preset = GIROS_PRESETS[giroKey];
    if (!preset) return;

    giroCards.forEach((c) => {
      if (c.getAttribute("data-giro") === giroKey) {
        c.classList.add("active");
        const badge = c.querySelector(".giro-card-badge");
        if (badge) badge.textContent = "✓ Activo";
      } else {
        c.classList.remove("active");
        const badge = c.querySelector(".giro-card-badge");
        if (badge) badge.textContent = "Seleccionar";
      }
    });

    moduleItems.forEach((item) => {
      const modKey = item.getAttribute("data-module-key");
      const checkbox = item.querySelector("input[type='checkbox']");
      const badge = item.querySelector(".module-status-badge");
      const isEnabled = !!preset.modules[modKey];

      if (checkbox) checkbox.checked = isEnabled;
      if (isEnabled) {
        item.classList.remove("disabled");
        item.classList.add("active");
        if (badge) {
          badge.textContent = "Activo";
          badge.className = "module-status-badge on";
        }
      } else {
        item.classList.remove("active");
        item.classList.add("disabled");
        if (badge) {
          badge.textContent = "Desactivado";
          badge.className = "module-status-badge off";
        }
      }
    });
  }

  // Click on Giro card
  giroCards.forEach((card) => {
    card.addEventListener("click", () => {
      const giroKey = card.getAttribute("data-giro");
      applyPreset(giroKey);
    });
  });

  // Manual module switch toggle
  moduleItems.forEach((item) => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const badge = item.querySelector(".module-status-badge");

    if (checkbox) {
      checkbox.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          item.classList.remove("disabled");
          item.classList.add("active");
          if (badge) {
            badge.textContent = "Activo";
            badge.className = "module-status-badge on";
          }
        } else {
          item.classList.remove("active");
          item.classList.add("disabled");
          if (badge) {
            badge.textContent = "Desactivado";
            badge.className = "module-status-badge off";
          }
        }

        // Remove active state from preset cards since it's customized
        giroCards.forEach((c) => {
          c.classList.remove("active");
          const b = c.querySelector(".giro-card-badge");
          if (b) b.textContent = "Personalizado";
        });
      });
    }
  });

  // Save feedback simulated button
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = "✓ ¡Configuración Guardada!";
      saveBtn.style.background = "#10b981";
      setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.background = "";
      }, 2500);
    });
  }

  // Initial preset: enterprise / restaurant
  applyPreset("enterprise");
}

/* ----------------------------------------------------
   2. Billing Toggle (Mensual vs Anual)
   ---------------------------------------------------- */
const PRICING_DATA = {
  basico: {
    monthly: 499,
    annual: 4990,
    annualMonthEquivalent: 415,
    savingsAnnual: 998,
    dailyMonthly: 16,
    dailyAnnual: 14,
  },
  pro: {
    monthly: 799,
    annual: 7990,
    annualMonthEquivalent: 665,
    savingsAnnual: 1598,
    dailyMonthly: 26,
    dailyAnnual: 22,
  },
  empresarial: {
    monthly: 1399,
    annual: 13990,
    annualMonthEquivalent: 1165,
    savingsAnnual: 2798,
    dailyMonthly: 46,
    dailyAnnual: 38,
  },
};

function initBillingToggle() {
  const toggle = document.getElementById("billingToggle");
  if (!toggle) return;

  const amounts = {
    basico: document.getElementById("price-basico"),
    pro: document.getElementById("price-pro"),
    empresarial: document.getElementById("price-empresarial"),
  };

  const dailyBadges = {
    basico: document.getElementById("daily-basico"),
    pro: document.getElementById("daily-pro"),
    empresarial: document.getElementById("daily-empresarial"),
  };

  const annualSubtexts = {
    basico: document.getElementById("subtext-basico"),
    pro: document.getElementById("subtext-pro"),
    empresarial: document.getElementById("subtext-empresarial"),
  };

  const tableAmounts = {
    basico: document.getElementById("table-price-basico"),
    pro: document.getElementById("table-price-pro"),
    empresarial: document.getElementById("table-price-empresarial"),
  };

  const tablePeriods = {
    basico: document.getElementById("table-period-basico"),
    pro: document.getElementById("table-period-pro"),
    empresarial: document.getElementById("table-period-empresarial"),
  };

  const periodLabels = document.querySelectorAll(".pricing-period");
  const saveBadge = document.getElementById("saveBadgeAnnual");

  const updatePrices = (isAnnual) => {
    if (saveBadge) {
      saveBadge.style.display = isAnnual ? "inline-block" : "none";
    }

    Object.keys(PRICING_DATA).forEach((planKey) => {
      const data = PRICING_DATA[planKey];
      const el = amounts[planKey];
      const tableEl = tableAmounts[planKey];
      const tablePeriodEl = tablePeriods[planKey];
      const dailyEl = dailyBadges[planKey];
      const subtextEl = annualSubtexts[planKey];

      const priceVal = isAnnual ? data.annualMonthEquivalent : data.monthly;
      const formattedPrice = `$${priceVal.toLocaleString("es-MX")}`;

      if (el) {
        el.textContent = formattedPrice;
      }

      if (tableEl) {
        tableEl.textContent = formattedPrice;
      }

      if (tablePeriodEl) {
        tablePeriodEl.textContent = isAnnual ? "MXN/mes (anual)" : "MXN/mes";
      }

      if (dailyEl) {
        const dailyCost = isAnnual ? data.dailyAnnual : data.dailyMonthly;
        dailyEl.textContent = `⚡ Inversión: ~$${dailyCost} MXN al día`;
      }

      if (subtextEl) {
        subtextEl.style.display = isAnnual ? "block" : "none";
        subtextEl.textContent = `Facturado anualmente ($${data.annual.toLocaleString("es-MX")} MXN • Ahorras $${data.savingsAnnual.toLocaleString("es-MX")})`;
      }
    });

    periodLabels.forEach((label) => {
      label.textContent = isAnnual ? "MXN/mes (anual)" : "MXN/mes";
    });
  };

  toggle.addEventListener("change", (e) => {
    updatePrices(e.target.checked);
  });

  // Run initial state (starts on annual checked)
  updatePrices(toggle.checked);
}

/* ----------------------------------------------------
   3. Interactive ROI / Savings Calculator
   ---------------------------------------------------- */
function initCalculator() {
  const ordersSlider = document.getElementById("ordersRange");
  const ticketSlider = document.getElementById("ticketRange");
  const ordersVal = document.getElementById("ordersVal");
  const ticketVal = document.getElementById("ticketVal");

  const moneySavedEl = document.getElementById("calcMoneySaved");
  const hoursSavedEl = document.getElementById("calcHoursSaved");
  const monthlySalesEl = document.getElementById("calcMonthlySales");
  const formulaHintEl = document.getElementById("calcFormulaHint");

  if (!ordersSlider || !ticketSlider) return;

  function calculate() {
    const ordersPerDay = parseInt(ordersSlider.value, 10);
    const avgTicket = parseInt(ticketSlider.value, 10);

    ordersVal.textContent = `${ordersPerDay.toLocaleString("es-MX")} pedidos/día`;
    ticketVal.textContent = `$${avgTicket.toLocaleString("es-MX")} MXN`;

    // Formulas:
    // 1. Ventas estimadas del mes = pedidos diarios * gasto promedio por cliente * 30 días
    const monthlySales = ordersPerDay * avgTicket * 30;

    // 2. Ahorro estimado por evitar fugas / errores de cobro / robo hormiga (2.5% estándar)
    const leakagePrevented = Math.round(monthlySales * 0.025);

    // 3. Horas ahorradas al mes: cortes automáticos y cuadres rápidos
    const hoursSaved = Math.round(ordersPerDay * 0.015 * 30 + 35);

    if (monthlySalesEl) {
      monthlySalesEl.textContent = `$${monthlySales.toLocaleString("es-MX")} MXN/mes`;
    }
    if (formulaHintEl) {
      formulaHintEl.textContent = `Calculado como: ${ordersPerDay.toLocaleString("es-MX")} clientes/día × $${avgTicket.toLocaleString("es-MX")} MXN promedio × 30 días`;
    }
    if (moneySavedEl) {
      moneySavedEl.textContent = `$${leakagePrevented.toLocaleString("es-MX")} MXN`;
    }
    if (hoursSavedEl) {
      hoursSavedEl.textContent = `${hoursSaved} horas`;
    }
  }

  ordersSlider.addEventListener("input", calculate);
  ticketSlider.addEventListener("input", calculate);
  calculate();
}

/* ----------------------------------------------------
   4. FAQ Accordion
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all others
      faqItems.forEach((other) => {
        other.classList.remove("open");
        const otherAns = other.querySelector(".faq-answer");
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + 40 + "px";
      } else {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      }
    });
  });
}

/* ----------------------------------------------------
   5. Direct WhatsApp Integration
   ---------------------------------------------------- */
function initWhatsAppLinks() {
  const whatsappButtons = document.querySelectorAll("[data-whatsapp-plan]");
  const defaultNumber = "5213300000000"; // Configurable

  whatsappButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-whatsapp-plan") || "DEMO";
      const message = encodeURIComponent(
        `¡Hola! Me interesa solicitar la prueba gratuita de 15 días de PuntoGo para mi negocio (Interés en Plan: ${plan}). ¿Me podrían brindar más información?`
      );
      window.open(`https://wa.me/?text=${message}`, "_blank");
    });
  });
}

/* ----------------------------------------------------
   6. Mobile Menu
   ---------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector(".nav-mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
    });
  });
}

/* ----------------------------------------------------
   7. Interactive Comparison Table (Filters & Accordion)
   ---------------------------------------------------- */
function initPricingTableFilter() {
  const filterBtns = document.querySelectorAll(".table-filter-btn");
  const categoryRows = document.querySelectorAll(".pricing-table .category-row");
  const toggleAllBtn = document.getElementById("toggleAllRowsBtn");
  let isAllCollapsed = false;

  // 1. Filtrar por botones de categoría (pills)
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      categoryRows.forEach((catRow) => {
        const catKey = catRow.getAttribute("data-category");
        const featureRows = document.querySelectorAll(`.pricing-table tr.feature-row[data-category="${catKey}"]`);

        if (filter === "all" || filter === catKey) {
          catRow.style.display = "";
          const isCollapsed = catRow.classList.contains("collapsed");
          featureRows.forEach((r) => {
            r.style.display = isCollapsed ? "none" : "";
          });
        } else {
          catRow.style.display = "none";
          featureRows.forEach((r) => {
            r.style.display = "none";
          });
        }
      });
    });
  });

  // 2. Clic en fila de categoría para colapsar/desplegar acordeón
  categoryRows.forEach((catRow) => {
    catRow.addEventListener("click", () => {
      const catKey = catRow.getAttribute("data-category");
      const featureRows = document.querySelectorAll(`.pricing-table tr.feature-row[data-category="${catKey}"]`);
      const isCollapsed = catRow.classList.toggle("collapsed");

      featureRows.forEach((r) => {
        r.style.display = isCollapsed ? "none" : "";
      });
    });
  });

  // 3. Botón para contraer/expandir todas las categorías
  if (toggleAllBtn) {
    toggleAllBtn.addEventListener("click", () => {
      isAllCollapsed = !isAllCollapsed;
      toggleAllBtn.textContent = isAllCollapsed ? "Expandir todo" : "Contraer todo";

      categoryRows.forEach((catRow) => {
        const catKey = catRow.getAttribute("data-category");
        const featureRows = document.querySelectorAll(`.pricing-table tr.feature-row[data-category="${catKey}"]`);

        if (isAllCollapsed) {
          catRow.classList.add("collapsed");
          featureRows.forEach((r) => (r.style.display = "none"));
        } else {
          catRow.classList.remove("collapsed");
          const activeFilter = document.querySelector(".table-filter-btn.active")?.getAttribute("data-filter") || "all";
          if (activeFilter === "all" || activeFilter === catKey) {
            featureRows.forEach((r) => (r.style.display = ""));
          }
        }
      });
    });
  }
}
