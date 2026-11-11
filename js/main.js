/**
 * PuntoGo Landing Page - Main Interactive Logic
 */

// Teléfono oficial de ventas para WhatsApp (ej. 5213312345678 con código de país)
window.PUNTOGO_SALES_PHONE = "5213300000000";

document.addEventListener("DOMContentLoaded", () => {
  initFeatureTabs();
  initMockupTabs();
  initGirosAndModules();
  initBillingToggle();
  initFaqAccordion();
  initWhatsAppLinks();
  initMobileMenu();
  initPricingTableFilter();
  initDeliveryVideoPlayer();
  initPromoVideoPlayer();
  initTrialRegisterModal();
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
    else if (viewId === "mockup-delivery") runDeliverySimulation();
    else if (viewId === "mockup-tienda") runTiendaSimulation();
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
      hasDelivery: false,
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
      hasDelivery: true,
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
      hasDelivery: false,
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
      hasDelivery: true,
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
    monthly: 899,
    annual: 8990,
    annualMonthEquivalent: 749,
    savingsAnnual: 1798,
    dailyMonthly: 30,
    dailyAnnual: 25,
  },
  empresarial: {
    monthly: 1599,
    annual: 15990,
    annualMonthEquivalent: 1332,
    savingsAnnual: 3198,
    dailyMonthly: 53,
    dailyAnnual: 44,
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
  const defaultNumber = (window.PUNTOGO_SALES_PHONE || "5213300000000").replace(/[^0-9]/g, "");

  whatsappButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-whatsapp-plan") || "DEMO";
      const message = encodeURIComponent(
        `¡Hola! Me interesa solicitar la prueba gratuita de 15 días de PuntoGo para mi negocio (Interés en Plan: ${plan}). ¿Me podrían brindar más información?`
      );
      const waUrl = defaultNumber && defaultNumber !== "5213300000000"
        ? `https://wa.me/${defaultNumber}?text=${message}`
        : `https://wa.me/?text=${message}`;
      window.open(waUrl, "_blank");
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

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("mobile-open");
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
    });
  });

  // Close when clicking outside menu
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("mobile-open") && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove("mobile-open");
    }
  });
}

/* ----------------------------------------------------
   7. Interactive Comparison Table (Filters & Accordion)
   ---------------------------------------------------- */
function initPricingTableFilter() {
  const filterBtns = document.querySelectorAll(".table-filter-btn");
  if (!filterBtns.length) return;
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


/* ==========================================================================
   5. DELIVERY MOCKUP SIMULATION (HERO SWITCHER)
   ========================================================================== */

function runDeliverySimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-delivery");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-deliv");
  const pulse = document.getElementById("demo-pulse-deliv");
  const rappiSwitch = document.getElementById("demo-rappi-switch-hero");
  const rappiInput = document.getElementById("demo-rappi-input-hero");
  const btnCopy = document.getElementById("demo-btn-copy-hero");
  const btnSim = document.getElementById("demo-btn-sim-hero");
  const toast = document.getElementById("demo-delivery-toast-hero");
  const badgeRappi = document.getElementById("demo-mock-rappi-badge");

  // Reset initial state
  if (rappiSwitch) rappiSwitch.className = "demo-toggle-switch off";
  if (rappiInput) rappiInput.value = "";
  if (btnCopy) {
    btnCopy.textContent = "Copiar";
    btnCopy.style.background = "#e2e8f0";
    btnCopy.style.color = "#0f172a";
  }
  if (toast) toast.classList.remove("show");
  if (badgeRappi) {
    badgeRappi.textContent = "Rappi ⚪";
    badgeRappi.style.background = "#f1f5f9";
    badgeRappi.style.color = "#64748b";
    badgeRappi.style.borderColor = "#cbd5e1";
  }
  if (cursor) {
    cursor.style.left = "40%";
    cursor.style.top = "30%";
  }

  // 1. Mover cursor al switch de Rappi
  simTimeout(() => {
    moveCursorTo(cursor, rappiSwitch, pulse);
  }, 700);

  // 2. Clic switch -> Se activa
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (rappiSwitch) rappiSwitch.className = "demo-toggle-switch on";
    if (badgeRappi) {
      badgeRappi.textContent = "Rappi 🟢";
      badgeRappi.style.background = "#dcfce7";
      badgeRappi.style.color = "#15803d";
      badgeRappi.style.borderColor = "#86efac";
    }
  }, 1300);

  // 3. Mover a Store ID
  simTimeout(() => {
    moveCursorTo(cursor, rappiInput, pulse);
  }, 2000);

  // 4. Teclear Store ID
  simTimeout(() => {
    triggerClick(cursor, pulse);
    const text = "RP-STORE-MX-0482";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (rappiInput) {
        rappiInput.value = text.slice(0, i + 1);
      }
      i++;
      if (i >= text.length) clearInterval(typeInterval);
    }, 40);
  }, 2400);

  // 5. Mover a botón Copiar Webhook
  simTimeout(() => {
    moveCursorTo(cursor, btnCopy, pulse);
  }, 3400);

  // 6. Clic Copiar Webhook
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnCopy) {
      btnCopy.textContent = "¡Copiado!";
      btnCopy.style.background = "#16a34a";
      btnCopy.style.color = "#ffffff";
    }
  }, 4000);

  // 7. Mover a botón Simular Pedido Rappi
  simTimeout(() => {
    moveCursorTo(cursor, btnSim, pulse);
  }, 4800);

  // 8. Clic Simular Pedido Rappi
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnSim) btnSim.style.transform = "scale(0.96)";
  }, 5400);

  simTimeout(() => {
    if (btnSim) btnSim.style.transform = "scale(1)";
    if (toast) toast.classList.add("show");
  }, 5600);

  // 9. Loop
  simTimeout(() => {
    runDeliverySimulation();
  }, 11500);
}

/* ==========================================================================
   6. DEDICATED DELIVERY VIDEO DEMONSTRATION PLAYER
   ========================================================================== */

let videoState = {
  isPlaying: true,
  currentTime: 0,
  duration: 20,
  timer: null,
};

function initDeliveryVideoPlayer() {
  const btnPlay = document.getElementById("btnPlayDeliveryVideo");
  const btnRestart = document.getElementById("btnRestartDeliveryVideo");
  const playIcon = document.getElementById("playIcon");
  const playLabel = document.getElementById("playLabel");
  const timeDisplay = document.getElementById("videoTimeDisplay");
  const progressBar = document.getElementById("videoProgressBar");
  const progressTrack = document.getElementById("videoProgressTrack");
  const narratorText = document.getElementById("videoNarratorText");
  const stepMarkers = document.querySelectorAll(".video-step-marker");
  const stepCards = [
    document.getElementById("videoStepCard1"),
    document.getElementById("videoStepCard2"),
    document.getElementById("videoStepCard3"),
  ];

  const cursor = document.getElementById("videoVirtualCursor");
  const pulse = document.getElementById("videoVirtualPulse");
  const rappiSwitch = document.getElementById("videoRappiSwitch");
  const rappiBadge = document.getElementById("videoRappiBadge");
  const inputStoreId = document.getElementById("videoInputStoreId");
  const inputToken = document.getElementById("videoInputToken");
  const btnCopy = document.getElementById("videoBtnCopy");
  const btnSimulate = document.getElementById("videoBtnSimulate");
  const orderToast = document.getElementById("videoOrderToast");
  const cardRappi = document.getElementById("videoCardRappi");

  if (!btnPlay) return;

  function playChimeSound() {
    // Sonidos silenciados
  }

  function updateVideoUI(t) {
    const total = videoState.duration;
    const progressPercent = Math.min(100, (t / total) * 100);
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const mins = Math.floor(t / 60);
    const secs = String(Math.floor(t % 60)).padStart(2, "0");
    const durMins = Math.floor(total / 60);
    const durSecs = String(Math.floor(total % 60)).padStart(2, "0");
    if (timeDisplay) timeDisplay.textContent = `${mins}:${secs} / ${durMins}:${durSecs}`;

    // Step 1: 0 - 5s
    if (t < 5) {
      setStepActive(0);
      if (narratorText) narratorText.textContent = "Paso 1: Activando conexión oficial con Rappi Partners en un clic...";
      if (rappiSwitch) rappiSwitch.className = t > 1.5 ? "demo-toggle-switch on" : "demo-toggle-switch off";
      if (rappiBadge) {
        rappiBadge.textContent = t > 1.5 ? "Rappi: 🟢 Conectado" : "Rappi: ⚪ Desactivado";
        rappiBadge.style.background = t > 1.5 ? "#dcfce7" : "#f1f5f9";
        rappiBadge.style.color = t > 1.5 ? "#15803d" : "#64748b";
      }
      if (inputStoreId) inputStoreId.value = t > 3 ? "RP-STORE-MX-0482" : "";
      if (btnCopy) {
        btnCopy.textContent = "Copiar";
        btnCopy.classList.remove("copied");
      }
      if (orderToast) orderToast.classList.remove("show");

      if (cursor && rappiSwitch) {
        if (t < 1.5) moveCursorTo(cursor, rappiSwitch, pulse);
        else if (t < 2.2) triggerClick(cursor, pulse);
      }
    }
    // Step 2: 5 - 10s
    else if (t < 10) {
      setStepActive(1);
      if (narratorText) narratorText.textContent = "Paso 2: Ingresando Store ID oficial provisto por Rappi Aliados...";
      if (rappiSwitch) rappiSwitch.className = "demo-toggle-switch on";
      if (inputStoreId) inputStoreId.value = "RP-STORE-MX-0482";
      if (btnCopy) {
        btnCopy.textContent = "Copiar";
        btnCopy.classList.remove("copied");
      }
      if (orderToast) orderToast.classList.remove("show");

      if (cursor && inputStoreId) {
        moveCursorTo(cursor, inputStoreId, pulse);
      }
    }
    // Step 3: 10 - 15s
    else if (t < 15) {
      setStepActive(2);
      if (narratorText) narratorText.textContent = "Paso 3: Copiando URL de Webhook generada en 1 clic para tu portal...";
      if (inputStoreId) inputStoreId.value = "RP-STORE-MX-0482";
      if (cursor && btnCopy) {
        moveCursorTo(cursor, btnCopy, pulse);
      }
      if (t >= 12 && btnCopy) {
        btnCopy.textContent = "¡Copiado!";
        btnCopy.classList.add("copied");
      }
      if (orderToast) orderToast.classList.remove("show");
    }
    // Step 4: 15s - 20s (Live Order Received!)
    else {
      setStepActive(3);
      if (narratorText) narratorText.textContent = "¡Listo! Pedido recibido en tiempo real. Entra a Cocina KDS con repartidor.";
      if (cursor && btnSimulate && t < 16.5) {
        moveCursorTo(cursor, btnSimulate, pulse);
      }
      if (t >= 16.5 && orderToast && !orderToast.classList.contains("show")) {
        orderToast.classList.add("show");
        playChimeSound();
      }
    }
  }

  function setStepActive(stepIndex) {
    stepMarkers.forEach((m, idx) => {
      if (idx === stepIndex) m.classList.add("active");
      else m.classList.remove("active");
    });

    stepCards.forEach((c, idx) => {
      if (!c) return;
      if (idx === Math.min(2, stepIndex)) c.classList.add("active-step");
      else c.classList.remove("active-step");
    });
  }

  function startPlayback() {
    videoState.isPlaying = true;
    if (playIcon) playIcon.textContent = "⏸";
    if (playLabel) playLabel.textContent = "Pausar";

    clearInterval(videoState.timer);
    videoState.timer = setInterval(() => {
      videoState.currentTime += 0.5;
      if (videoState.currentTime > videoState.duration) {
        videoState.currentTime = 0; // Loop seamlessly
      }
      updateVideoUI(videoState.currentTime);
    }, 500);
  }

  function pausePlayback() {
    videoState.isPlaying = false;
    if (playIcon) playIcon.textContent = "▶";
    if (playLabel) playLabel.textContent = "Reproducir";
    clearInterval(videoState.timer);
  }

  function seekTo(targetTime) {
    videoState.currentTime = Math.max(0, Math.min(videoState.duration, targetTime));
    updateVideoUI(videoState.currentTime);
  }

  btnPlay.addEventListener("click", () => {
    if (videoState.isPlaying) pausePlayback();
    else startPlayback();
  });

  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      seekTo(0);
      startPlayback();
    });
  }

  stepMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const step = Number(marker.getAttribute("data-step"));
      if (step === 1) seekTo(0);
      else if (step === 2) seekTo(5);
      else if (step === 3) seekTo(10);
      else if (step === 4) seekTo(15);
    });
  });

  stepCards.forEach((card, idx) => {
    if (!card) return;
    card.addEventListener("click", () => {
      if (idx === 0) seekTo(0);
      else if (idx === 1) seekTo(5);
      else if (idx === 2) seekTo(10);
    });
  });

  if (progressTrack) {
    progressTrack.addEventListener("click", (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      seekTo(ratio * videoState.duration);
    });
  }

  // Iniciar reproducción automática
  startPlayback();
}

/* ==========================================================================
   7. SIMULACIÓN DE TIENDA ONLINE EN HERO MOCKUP (CELULAR A KDS)
   ========================================================================== */
function runTiendaSimulation() {
  clearSimTimeouts();
  const view = document.getElementById("mockup-tienda");
  if (!view || !view.classList.contains("active")) return;

  const cursor = document.getElementById("demo-cursor-tienda");
  const pulse = document.getElementById("demo-pulse-tienda");
  const btnAdd = document.getElementById("demo-tienda-btn-add");
  const cartQty = document.getElementById("demo-tienda-cart-qty");
  const cartTotal = document.getElementById("demo-tienda-cart-total");
  const btnSend = document.getElementById("demo-tienda-btn-send");
  const btnText = document.getElementById("demo-tienda-btn-text");
  const ticket = document.getElementById("demo-tienda-terminal-ticket");
  const statusLabel = document.getElementById("demo-tienda-status-label");
  const toast = document.getElementById("demo-tienda-toast");

  // Estado inicial
  if (cartQty) cartQty.textContent = "0 items";
  if (cartTotal) cartTotal.textContent = "$0.00";
  if (btnSend) {
    btnSend.style.opacity = "0.5";
    btnSend.style.pointerEvents = "none";
  }
  if (btnText) btnText.textContent = "Pedir a Cocina";
  if (ticket) ticket.classList.remove("incoming");
  if (statusLabel) {
    statusLabel.textContent = "● Esperando Pedido";
    statusLabel.style.color = "#94a3b8";
  }
  if (toast) toast.classList.remove("show");

  if (cursor) {
    cursor.style.left = "20%";
    cursor.style.top = "40%";
  }

  // 1. Mover cursor a "+ Agregar al Carrito" en celular
  simTimeout(() => {
    moveCursorTo(cursor, btnAdd, pulse);
  }, 900);

  // 2. Clic en "+ Agregar al Carrito"
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (cartQty) cartQty.textContent = "1 item";
    if (cartTotal) cartTotal.textContent = "$115.00";
    if (btnSend) {
      btnSend.style.opacity = "1";
      btnSend.style.pointerEvents = "auto";
    }
  }, 1600);

  // 3. Mover cursor a "Pedir a Cocina"
  simTimeout(() => {
    moveCursorTo(cursor, btnSend, pulse);
  }, 2700);

  // 4. Clic en "Pedir a Cocina" -> Efecto sonoro y sincronización
  simTimeout(() => {
    triggerClick(cursor, pulse);
    if (btnText) btnText.textContent = "✓ Enviado a Cocina";
    if (ticket) ticket.classList.add("incoming");
    if (statusLabel) {
      statusLabel.textContent = "● En Preparación KDS";
      statusLabel.style.color = "#16a34a";
    }
    if (toast) toast.classList.add("show");
  }, 3600);

  // 5. Cursor descansa
  simTimeout(() => {
    if (cursor) {
      cursor.style.left = "55%";
      cursor.style.top = "65%";
    }
  }, 4800);

  // 6. Loop
  simTimeout(() => {
    runTiendaSimulation();
  }, 9500);
}

/* ==========================================================================
   8. VIDEO DEMOSTRATIVO DE PROMOCIONES Y FIDELIZACIÓN (WHATSAPP & CORREO)
   ========================================================================== */
let promoVideoState = {
  isPlaying: true,
  currentTime: 0,
  duration: 20,
  timer: null,
};

function initPromoVideoPlayer() {
  const btnPlay = document.getElementById("btnPlayPromoVideo");
  const btnRestart = document.getElementById("btnRestartPromoVideo");
  const playIcon = document.getElementById("promoPlayIcon");
  const playLabel = document.getElementById("promoPlayLabel");
  const timeDisplay = document.getElementById("promoTimeDisplay");
  const progressBar = document.getElementById("promoProgressBar");
  const progressTrack = document.getElementById("promoProgressTrack");
  const narratorText = document.getElementById("promoNarratorText");
  const stepMarkers = document.querySelectorAll("[data-promo-step]");
  const stepCards = [
    document.getElementById("promoStepCard1"),
    document.getElementById("promoStepCard2"),
    document.getElementById("promoStepCard3"),
  ];

  const cursor = document.getElementById("promoVirtualCursor");
  const pulse = document.getElementById("promoVirtualPulse");
  const inputSegment = document.getElementById("promoInputSegment");
  const inputTemplate = document.getElementById("promoInputTemplate");
  const btnSendAction = document.getElementById("promoBtnSendAction");
  const chatBubble = document.getElementById("promoChatBubble");
  const successToast = document.getElementById("promoSuccessToast");
  const btnSimulate = document.getElementById("promoBtnSimulate");

  if (!btnPlay) return;

  function setStepActive(stepIdx) {
    stepMarkers.forEach((m, idx) => {
      m.classList.toggle("active", idx === stepIdx);
    });
    stepCards.forEach((c, idx) => {
      if (c) c.classList.toggle("active-step", idx === stepIdx);
    });
  }

  function playChimeSound() {
    // Sonidos silenciados
  }

  function updatePromoVideoUI(t) {
    const total = promoVideoState.duration;
    const progressPercent = Math.min(100, (t / total) * 100);
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const mins = Math.floor(t / 60);
    const secs = String(Math.floor(t % 60)).padStart(2, "0");
    const durMins = Math.floor(total / 60);
    const durSecs = String(Math.floor(total % 60)).padStart(2, "0");
    if (timeDisplay) timeDisplay.textContent = `${mins}:${secs} / ${durMins}:${durSecs}`;

    // Paso 1: 0 - 5s (Selección de Audiencia)
    if (t < 5) {
      setStepActive(0);
      if (narratorText) narratorText.textContent = "Paso 1: Filtrando segmento de clientes frecuentes (148 clientes registrados)...";
      if (inputSegment) inputSegment.value = t > 2 ? "Clientes Frecuentes (148)" : "Seleccionando...";
      if (inputTemplate) inputTemplate.value = "Selecciona plantilla...";
      if (chatBubble) chatBubble.style.opacity = "0.2";
      if (successToast) successToast.classList.remove("show");

      if (cursor && inputSegment) {
        if (t < 2) moveCursorTo(cursor, inputSegment, pulse);
        else if (t < 3) triggerClick(cursor, pulse);
      }
    }
    // Paso 2: 5 - 10s (Selección de Plantilla)
    else if (t < 10) {
      setStepActive(1);
      if (narratorText) narratorText.textContent = "Paso 2: Cargando plantilla de promoción 'Fin de Semana: 15% OFF'...";
      if (inputSegment) inputSegment.value = "Clientes Frecuentes (148)";
      if (inputTemplate) inputTemplate.value = "🎉 15% OFF Fin de Semana";
      if (chatBubble) chatBubble.style.opacity = "0.2";
      if (successToast) successToast.classList.remove("show");

      if (cursor && inputTemplate) {
        if (t < 7) moveCursorTo(cursor, inputTemplate, pulse);
        else if (t < 8.2) triggerClick(cursor, pulse);
      }
    }
    // Paso 3: 10 - 15s (Clic en Enviar)
    else if (t < 15) {
      setStepActive(2);
      if (narratorText) narratorText.textContent = "Paso 3: Enviando campaña masiva a 148 clientes por WhatsApp y Correo...";
      if (cursor && btnSendAction) {
        if (t < 12.5) moveCursorTo(cursor, btnSendAction, pulse);
        else if (t < 13.5) triggerClick(cursor, pulse);
      }
      if (chatBubble) chatBubble.style.opacity = t > 13.5 ? "1" : "0.3";
      if (t >= 13.5 && t < 14) playChimeSound();
    }
    // Paso 4: 15 - 20s (Recibido en Celular)
    else {
      setStepActive(3);
      if (narratorText) narratorText.textContent = "Paso 4: ¡Entregado al instante! El cliente recibe la oferta en su WhatsApp.";
      if (chatBubble) chatBubble.style.opacity = "1";
      if (successToast) successToast.classList.add("show");
      if (cursor && chatBubble) {
        moveCursorTo(cursor, chatBubble, pulse);
      }
    }
  }

  function startPlayback() {
    promoVideoState.isPlaying = true;
    if (playIcon) playIcon.textContent = "⏸";
    if (playLabel) playLabel.textContent = "Pausar";

    clearInterval(promoVideoState.timer);
    promoVideoState.timer = setInterval(() => {
      promoVideoState.currentTime += 0.2;
      if (promoVideoState.currentTime > promoVideoState.duration) {
        promoVideoState.currentTime = 0;
      }
      updatePromoVideoUI(promoVideoState.currentTime);
    }, 200);
  }

  function pausePlayback() {
    promoVideoState.isPlaying = false;
    if (playIcon) playIcon.textContent = "▶";
    if (playLabel) playLabel.textContent = "Reproducir";
    clearInterval(promoVideoState.timer);
  }

  function seekTo(targetTime) {
    promoVideoState.currentTime = Math.max(0, Math.min(promoVideoState.duration, targetTime));
    updatePromoVideoUI(promoVideoState.currentTime);
  }

  btnPlay.addEventListener("click", () => {
    if (promoVideoState.isPlaying) pausePlayback();
    else startPlayback();
  });

  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      seekTo(0);
      startPlayback();
    });
  }

  if (btnSimulate) {
    btnSimulate.addEventListener("click", () => {
      seekTo(10);
      startPlayback();
    });
  }

  stepMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const step = Number(marker.getAttribute("data-promo-step"));
      if (step === 1) seekTo(0);
      else if (step === 2) seekTo(5);
      else if (step === 3) seekTo(10);
      else if (step === 4) seekTo(15);
    });
  });

  stepCards.forEach((card, idx) => {
    if (!card) return;
    card.addEventListener("click", () => {
      if (idx === 0) seekTo(0);
      else if (idx === 1) seekTo(5);
      else if (idx === 2) seekTo(10);
    });
  });

  if (progressTrack) {
    progressTrack.addEventListener("click", (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      seekTo(ratio * promoVideoState.duration);
    });
  }

  startPlayback();
}

/* ==========================================================================
   9. MODAL DE REGISTRO RÁPIDO PARA LA PRUEBA DE 15 DÍAS
   ========================================================================== */
function initTrialRegisterModal() {
  const modal = document.getElementById("modal-registro-prueba");
  if (!modal) return;

  const btnClose = document.getElementById("btnCloseTrialModal");
  const btnDismiss = document.getElementById("btnDismissSuccess");
  const form = document.getElementById("trialRegisterForm");
  const formView = document.getElementById("trialFormView");
  const successView = document.getElementById("trialSuccessView");
  const successNegocioLabel = document.getElementById("successNegocioLabel");
  const generatedKeyEl = document.getElementById("trialGeneratedKey");
  const btnCopyKey = document.getElementById("btnCopyTrialKey");
  const btnWhatsApp = document.getElementById("btnSuccessWhatsApp");

  const openButtons = document.querySelectorAll('[data-open-trial-modal="true"]');

  function openModal(preferredPlan) {
    if (formView) formView.style.display = "block";
    if (successView) successView.style.display = "none";

    // Si viene un plan preferido en el botón, seleccionarlo
    if (preferredPlan) {
      const planRadio = form.querySelector(`input[name="trialPlanRadio"][value="${preferredPlan.toUpperCase()}"]`);
      if (planRadio) planRadio.checked = true;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevenir scroll de fondo
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-trial-plan") || "PRO NEGOCIO";
      openModal(plan);
    });
  });

  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnDismiss) btnDismiss.addEventListener("click", closeModal);

  // Cerrar al hacer clic en el backdrop oscuro
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Copiar clave demo generada
  if (btnCopyKey) {
    btnCopyKey.addEventListener("click", () => {
      const key = generatedKeyEl ? generatedKeyEl.textContent : "";
      if (key && navigator.clipboard) {
        navigator.clipboard.writeText(key).then(() => {
          btnCopyKey.textContent = "✓ ¡Clave Copiada!";
          setTimeout(() => {
            btnCopyKey.textContent = "📋 Copiar Clave";
          }, 2500);
        });
      }
    });
  }

  // Envío del formulario
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = (document.getElementById("trialNombre").value || "").trim();
      const negocio = (document.getElementById("trialNegocio").value || "").trim();
      const giro = document.getElementById("trialGiro").value || "Giro General";
      const telefono = (document.getElementById("trialTelefono").value || "").trim();
      const planRadio = form.querySelector('input[name="trialPlanRadio"]:checked');
      const plan = planRadio ? planRadio.value : "PRO NEGOCIO";

      // Generar clave demo única
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const demoKey = `DEMO-PG-2026-${randomSuffix}`;

      // Actualizar vista de éxito
      if (successNegocioLabel) successNegocioLabel.textContent = negocio;
      if (generatedKeyEl) generatedKeyEl.textContent = demoKey;

      // Armar enlace de WhatsApp con el lead
      const defaultNumber = (window.PUNTOGO_SALES_PHONE || "5213300000000").replace(/[^0-9]/g, "");
      const waMsg = encodeURIComponent(
        `¡Hola! Me acabo de registrar para la prueba de 15 días gratis de PuntoGo:\n\n` +
        `• Nombre: ${nombre}\n` +
        `• Negocio: ${negocio} (${giro})\n` +
        `• WhatsApp: ${telefono}\n` +
        `• Plan evaluado: ${plan}\n` +
        `• Clave Demo: ${demoKey}\n\n` +
        `¿Me podrían apoyar con la descarga y puesta en marcha del sistema?`
      );

      const waUrl = defaultNumber && defaultNumber !== "5213300000000"
        ? `https://wa.me/${defaultNumber}?text=${waMsg}`
        : `https://wa.me/?text=${waMsg}`;

      if (btnWhatsApp) {
        btnWhatsApp.href = waUrl;
        btnWhatsApp.target = "_blank";
      }

      // Guardar lead en localStorage de respaldo
      try {
        const leadData = {
          nombre,
          negocio,
          giro,
          telefono,
          plan,
          demoKey,
          fecha: new Date().toISOString(),
        };
        localStorage.setItem("puntogo_trial_lead", JSON.stringify(leadData));
      } catch (err) {}

      // Cambiar a vista de éxito
      if (formView) formView.style.display = "none";
      if (successView) successView.style.display = "block";
    });
  }
}
