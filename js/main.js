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
   1.1 Hero Mockup Screen Switcher
   ---------------------------------------------------- */
function initMockupTabs() {
  const tabs = document.querySelectorAll(".mockup-tab-pill");
  const views = document.querySelectorAll(".mockup-view");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-mockup-target");

      tabs.forEach((t) => t.classList.remove("active"));
      views.forEach((v) => v.classList.remove("active"));

      tab.classList.add("active");
      const activeView = document.getElementById(targetView);
      if (activeView) {
        activeView.classList.add("active");
      }
    });
  });
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
  basico: { monthly: 449, annual: 4490, annualMonthEquivalent: 374 },
  pro: { monthly: 899, annual: 8990, annualMonthEquivalent: 749 },
  empresarial: { monthly: 1699, annual: 16990, annualMonthEquivalent: 1415 },
};

function initBillingToggle() {
  const toggle = document.getElementById("billingToggle");
  if (!toggle) return;

  const amounts = {
    basico: document.getElementById("price-basico"),
    pro: document.getElementById("price-pro"),
    empresarial: document.getElementById("price-empresarial"),
  };

  const periodLabels = document.querySelectorAll(".pricing-period");
  const annualSubtexts = document.querySelectorAll(".pricing-billed-annual");

  const updatePrices = (isAnnual) => {
    Object.keys(PRICING_DATA).forEach((planKey) => {
      const el = amounts[planKey];
      if (!el) return;

      const data = PRICING_DATA[planKey];
      if (isAnnual) {
        el.textContent = `$${data.annualMonthEquivalent}`;
      } else {
        el.textContent = `$${data.monthly}`;
      }
    });

    periodLabels.forEach((label) => {
      label.textContent = isAnnual ? "MXN/mes (anual)" : "MXN/mes";
    });

    annualSubtexts.forEach((subtext) => {
      subtext.style.display = isAnnual ? "block" : "none";
    });
  };

  toggle.addEventListener("change", (e) => {
    updatePrices(e.target.checked);
  });
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

  if (!ordersSlider || !ticketSlider) return;

  function calculate() {
    const ordersPerDay = parseInt(ordersSlider.value, 10);
    const avgTicket = parseInt(ticketSlider.value, 10);

    ordersVal.textContent = `${ordersPerDay} pedidos/día`;
    ticketVal.textContent = `$${avgTicket} MXN`;

    // Formulas:
    // Evitar fugas de caja / errores en cobro: estimado 2.5% de ventas mensuales
    const monthlySales = ordersPerDay * avgTicket * 30;
    const leakagePrevented = Math.round(monthlySales * 0.025);

    // Horas ahorradas: 1.5 horas diarias en arqueos, sumas y conteo
    const hoursSaved = Math.round(ordersPerDay * 0.015 * 30 + 35);

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
