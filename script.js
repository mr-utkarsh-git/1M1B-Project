// GLOBAL CONFIGURATIONS & STATE
let currentTheme = 'dark';
let currentWorkflowStep = 0;
let currentFeatureTab = 0;
let dashboardRange = 'weekly';
let selectedHotspot = 0;

// Data profiles
const workflowSteps = [
  { icon: 'cpu', badge: 'Pipeline Stage 01', title: 'IoT Sensors', desc: 'Deploy low-energy smart nodes for water level, bin fill rates, indoor CO2, and energy meters across campus.' },
  { icon: 'cloud', badge: 'Pipeline Stage 02', title: 'Cloud Platform', desc: 'Data is securely ingested into the centralized GreenVerse Cloud hosting framework in real-time.' },
  { icon: 'brain', badge: 'Pipeline Stage 03', title: 'AI Engine', desc: 'Anomalies like leakage patterns, predictive waste overflows, and heating drifts are analyzed instantly.' },
  { icon: 'bar-chart-2', badge: 'Pipeline Stage 04', title: 'Real-Time Data', desc: 'Data is structured and processed to extract metrics on savings, carbon footprint reduction, and wellness.' },
  { icon: 'layout-template', badge: 'Pipeline Stage 05', title: 'Dashboard', desc: 'Live statuses, graphs, widgets, and sustainability scores are visualised on custom admin and student consoles.' },
  { icon: 'bell', badge: 'Pipeline Stage 06', title: 'Instant Alerts', desc: 'Critical alerts (e.g. 90% bin full, water leakage detected) are immediately dispatched to maintenance staff.' },
  { icon: 'zap', badge: 'Pipeline Stage 07', title: 'Quick Action', desc: 'Staff addresses issues (e.g. empty bin, close valve), closing the feedback loop instantly to conserve resources.' },
];

const featureTabs = [
  {
    title: 'Student App',
    desc: 'Enables students to participate in campus green initiatives, report issues in real-time, and get rewarded for reducing consumption.',
    icon: 'award',
    ticker: 'Carbon Credit Reward unlocked! +10 Points',
    class: 'bg-emerald-950/20 border-emerald-500/25',
    bullets: [
      { t: 'Issue Reporting', d: 'Take photos and flag resource waste like leaking taps instantly.' },
      { t: 'Campus Alerts', d: 'Get updates on environmental parameters or recycling drives.' },
      { t: 'Sustainability Score', d: 'Gamified profile displaying personal and hostel eco-points.' },
      { t: 'Eco-Rewards', d: 'Redeem score tokens at the campus bookstore or cafeteria.' }
    ]
  },
  {
    title: 'Maintenance App',
    desc: 'Empowers facilities and support technicians with automated ticketing, diagnostic overlays, and asset verification logs.',
    icon: 'compass',
    ticker: 'Leak at Block C resolved. Photo uploaded.',
    class: 'bg-blue-950/20 border-blue-500/25',
    bullets: [
      { t: 'Instant Work Orders', d: 'AI routes sensor anomalies as geo-tagged tickets automatically.' },
      { t: 'QR Asset Scanner', d: 'Scan code on water valves or electrical panels to view log history.' },
      { t: 'Before/After Photos', d: 'Verify work execution visually before tickets close.' },
      { t: 'GPS Tracking & Updates', d: 'Optimized routing maps for technicians in the field.' }
    ]
  },
  {
    title: 'Admin Dashboard',
    desc: 'Offers administrative control rooms, predictive maintenance forecasting, carbon tracking metrics, and custom reports.',
    icon: 'line-chart',
    ticker: 'AI prediction: Pump #4 requires service in 5 days',
    class: 'bg-purple-950/20 border-purple-500/25',
    bullets: [
      { t: 'Live Metric Feeds', d: 'Continuous stream monitoring campus energy grid and water flows.' },
      { t: 'Carbon Footprint Tracking', d: 'Real-time carbon offset accounting for audits.' },
      { t: 'Predictive Alerts', d: 'Forecast machine degradation before failure happens.' },
      { t: 'Automated Reports', d: 'One-click compliance exports for green certifications.' }
    ]
  }
];

const dashboardData = {
  daily: {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    energy: [120, 380, 410, 350, 290, 180, 130],
    carbon: [45, 90, 110, 95, 80, 55, 48]
  },
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    energy: [1200, 1450, 1100, 980, 1350, 700, 620],
    carbon: [480, 510, 390, 320, 450, 210, 180]
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    energy: [4200, 4000, 3800, 3200, 2800, 2400],
    carbon: [1800, 1650, 1500, 1200, 1050, 900]
  }
};

const mapHotspots = [
  { city: 'Delhi NCR', college: 'IIT Delhi Campus', savings: '32% Energy saved', activeSensors: '1,420 sensors active', wasteCycles: '65% waste latency reduction', x: 35, y: 28 },
  { city: 'Mumbai', college: 'IIT Bombay Campus', savings: '28% Energy saved', activeSensors: '980 sensors active', wasteCycles: '58% waste latency reduction', x: 24, y: 52 },
  { city: 'Bengaluru', college: 'IISc Bangalore', savings: '35% Energy saved', activeSensors: '1,890 sensors active', wasteCycles: '72% waste latency reduction', x: 31, y: 78 },
  { city: 'Hyderabad', college: 'IIIT Hyderabad', savings: '30% Energy saved', activeSensors: '1,200 sensors active', wasteCycles: '60% waste latency reduction', x: 38, y: 63 },
  { city: 'Chennai', college: 'IIT Madras Campus', savings: '34% Energy saved', activeSensors: '1,650 sensors active', wasteCycles: '68% waste latency reduction', x: 39, y: 82 },
  { city: 'Kolkata', college: 'Jadavpur University', savings: '25% Energy saved', activeSensors: '840 sensors active', wasteCycles: '48% waste latency reduction', x: 68, y: 45 }
];

const faqs = [
  { q: 'How does GreenVerse use AI to improve campus operations?', a: 'GreenVerse utilizes machine learning models to analyze IoT streaming data. By establishing baseline footprints for energy and water usage, the system detects leaks, shifts, or abnormal consumption and triggers automated workflows or alerts instantly.' },
  { q: 'What IoT sensors are required, and who handles installation?', a: 'We deploy lightweight, non-invasive, battery-operated nodes for water flow, electricity loads, waste level ultrasonic monitoring, and indoor ambient CO2 sensors. Our engineering team installs the hardware and establishes the local mesh network.' },
  { q: 'Is the student data or institutional data secure?', a: 'Security is a core design standard. All sensor data and communication payloads are encrypted in transit and at rest. The platform does not collect any personal student credentials, adhering to SOC2 standards.' },
  { q: 'What kind of support packages do you offer?', a: 'We provide 24/7 remote diagnostic monitoring for the software and database, with dedicated engineering dispatch support for hardware replacements or recalibrations.' }
];

// INITIALIZATION LOGIC
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Load screen trigger
  const loadScreen = document.getElementById('loading-screen');
  const loadBar = document.getElementById('loading-bar');
  if (loadBar) loadBar.style.width = '100%';
  setTimeout(() => {
    if (loadScreen) {
      loadScreen.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => loadScreen.remove(), 700);
    }
  }, 1200);

  // Setup cursor listeners
  initCursor();

  // Setup ambient canvas background
  initAmbientCanvas();

  // Setup drifting leaves
  initDriftingLeaves();

  // Setup scroll listener for navbar shrink & Active indicator scroll-spy
  window.addEventListener('scroll', handleWindowScroll);

  // Initialize features tab UI
  switchFeatureTab(0);

  // Initialize dashboard preview SVG charts
  drawDashboardCharts();

  // Draw tech stack grid
  drawTechStack();

  // Draw India map outline & hotspots
  initIndiaMap();

  // Initialize FAQ Accordion items
  initFAQAccordion();

  // Set initial live variables updating tick
  setInterval(tickLiveDashboard, 8000);
});

// CURSOR TRAIL LOGIC
function initCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let isHidden = true;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    
    if (isHidden) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isHidden = false;
    }

    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  });

  function animRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(animRing);
  }
  requestAnimationFrame(animRing);

  // Hover triggers
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('button') || target.closest('a') || target.closest('.interactive-node')) {
      ring.classList.add('scale-150', 'border-emerald-400', 'bg-emerald-500/10');
      ring.style.boxShadow = '0 0 15px rgba(16,185,129,0.4)';
    } else {
      ring.classList.remove('scale-150', 'border-emerald-400', 'bg-emerald-500/10');
      ring.style.boxShadow = 'none';
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isHidden = true;
  });
}

// AMBIENT CANVAS PARTICLES
function initAmbientCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let mx = null, my = null;
  const maxDistance = 120;
  const mouseRadius = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mx = null;
    my = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.baseSpeedX = (Math.random() - 0.5) * 0.4;
      this.baseSpeedY = (Math.random() - 0.5) * 0.4;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

      if (mx !== null) {
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        } else {
          this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
          this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
        }
      }
    }
    draw() {
      ctx.fillStyle = currentTheme === 'dark' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
  particles = Array.from({ length: count }, () => new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw lines
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.strokeStyle = currentTheme === 'dark' ? `rgba(59, 130, 246, ${alpha})` : `rgba(59, 130, 246, ${alpha * 1.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mx !== null) {
        const dx = particles[a].x - mx;
        const dy = particles[a].y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRadius) {
          const alpha = (1 - dist / mouseRadius) * 0.25;
          ctx.strokeStyle = currentTheme === 'dark' ? `rgba(16, 185, 129, ${alpha})` : `rgba(16, 185, 129, ${alpha * 1.2})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// DRIFTING LEAVES
function initDriftingLeaves() {
  const container = document.getElementById('leaves-container');
  if (!container) return;
  
  const count = 12;
  for (let i = 0; i < count; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.classList.add('absolute', 'animate-fall', 'animate-sway');
    
    const size = Math.random() * 20 + 10;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.left = `${Math.random() * 100}%`;
    svg.style.top = '-50px';
    svg.style.opacity = Math.random() * 0.15 + 0.05;
    svg.style.animationDuration = `${Math.random() * 15 + 15}s, ${Math.random() * 4 + 4}s`;
    svg.style.animationDelay = `${Math.random() * -20}s`;
    svg.style.fill = '#10B981';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C8.14,20.5 9.76,21 11.5,21C18,21 22,14 22,8C22,3.5 19.5,2 17,2C14.5,2 11.5,4 10,6C8.5,4 5.5,2 3,2C1.5,2 0.5,2.5 0.5,3.5C0.5,6 4,11 7,13C5.5,14.5 4,18 4,18C5.5,15.5 7.5,13.5 9,12C11,13.5 13.5,14 16,13C17,11.5 17.5,9.5 17,8Z');
    svg.appendChild(path);
    
    container.appendChild(svg);
  }
}

// SCROLL HANDLERS (Navbar shrink + Scrollspy)
function handleWindowScroll() {
  const navbar = document.getElementById('navbar');
  const scrollY = window.scrollY;

  // Shrink navbar
  if (scrollY > 20) {
    navbar.classList.remove('py-6', 'bg-transparent', 'border-transparent');
    navbar.classList.add('py-4', 'glass', 'shadow-lg');
  } else {
    navbar.classList.add('py-6', 'bg-transparent', 'border-transparent');
    navbar.classList.remove('py-4', 'glass', 'shadow-lg');
  }

  // ScrollSpy Active highlights
  const sections = ['home', 'challenges', 'technology', 'impact', 'roadmap', 'contact'];
  const scrollPos = scrollY + 120;
  
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        // Clear old highlights
        document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('text-emerald-455', 'text-emerald-400');
          item.classList.add('text-gray-300');
          const indicator = item.querySelector('.nav-active-bar');
          if (indicator) indicator.remove();
        });

        // Set active target link
        const targetBtn = Array.from(document.querySelectorAll('.nav-item')).find(btn => 
          btn.getAttribute('onclick').includes(sec)
        );
        if (targetBtn) {
          targetBtn.classList.remove('text-gray-300');
          targetBtn.classList.add('text-emerald-400');
          const bar = document.createElement('span');
          bar.classList.add('nav-active-bar');
          targetBtn.appendChild(bar);
        }
      }
    }
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offsetTop = el.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// THEME TOGGLER
const themeBtn = document.getElementById('theme-toggle');
const themeBtnMobile = document.getElementById('theme-toggle-mobile');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function toggleTheme() {
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('light-mode');
    document.body.classList.add('light-mode');
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
    currentTheme = 'light';
  } else {
    document.documentElement.classList.remove('light-mode');
    document.body.classList.remove('light-mode');
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
    currentTheme = 'dark';
  }
}
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

// MOBILE MENU MENU
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

function toggleMobileMenu() {
  const open = mobileMenu.classList.contains('opacity-0');
  if (open) {
    mobileMenu.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    hamburger.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    hamburger.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}
if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

// SOLUTION PIPELINE SWITCHER
function switchWorkflowStep(idx) {
  currentWorkflowStep = idx;
  const btns = document.querySelectorAll('.workflow-node-btn > div');
  btns.forEach((btn, i) => {
    if (i === idx) {
      btn.className = "relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-emerald-400 bg-slate-900 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300";
      btn.querySelector('i').style.color = '#FFF';
    } else {
      btn.className = "relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/10 bg-slate-900/40 hover:border-emerald-500/40 transition-all duration-300";
      btn.querySelector('i').style.color = '#9CA3AF';
    }
  });

  const step = workflowSteps[idx];
  document.getElementById('workflow-detail-icon').setAttribute('data-lucide', step.icon);
  document.getElementById('workflow-detail-badge').innerText = step.badge;
  document.getElementById('workflow-detail-title').innerText = step.title;
  document.getElementById('workflow-detail-desc').innerText = step.desc;

  lucide.createIcons();
}

// FEATURES SWITCHER TAB
function switchFeatureTab(idx) {
  currentFeatureTab = idx;
  const btns = document.querySelectorAll('.feature-tab-btn');
  btns.forEach((btn, i) => {
    const iconDiv = btn.querySelector('.p-2.5');
    const titleH = btn.querySelector('h3');
    if (i === idx) {
      btn.className = "feature-tab-btn text-left p-5 rounded-2xl border border-emerald-500/30 bg-slate-900/60 shadow-lg transition-all duration-300";
      iconDiv.className = "p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400";
      titleH.className = "font-poppins font-bold text-lg leading-none mb-1 text-white";
    } else {
      btn.className = "feature-tab-btn text-left p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-all duration-300";
      iconDiv.className = "p-2.5 rounded-xl bg-white/5 text-gray-400";
      titleH.className = "font-poppins font-bold text-lg leading-none mb-1 text-gray-300";
    }
  });

  const profile = featureTabs[idx];
  document.getElementById('feature-narrative').innerText = profile.desc;
  
  // Re-render bullets
  const list = document.getElementById('feature-bullet-list');
  list.innerHTML = '';
  profile.bullets.forEach(bullet => {
    const row = document.createElement('div');
    row.className = "p-4 rounded-xl border border-white/5 bg-slate-900/10 hover:border-emerald-500/20 transition-all duration-300";
    row.innerHTML = `
      <div class="flex items-start space-x-3">
        <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
        <div>
          <h4 class="font-poppins font-bold text-sm text-white mb-1">${bullet.t}</h4>
          <p class="text-xs text-gray-500 leading-normal font-inter">${bullet.d}</p>
        </div>
      </div>
    `;
    list.appendChild(row);
  });

  // Update simulator values
  const simCard = document.getElementById('feature-mock-container');
  simCard.className = `p-6 rounded-3xl border border-white/5 flex flex-col justify-between overflow-hidden relative ${profile.class}`;
  document.getElementById('mock-apk-label').innerText = `${profile.title.toLowerCase().replace(' ', '')}-v1.2.apk`;
  document.getElementById('mock-app-icon').setAttribute('data-lucide', profile.icon);
  document.getElementById('mock-ticker-text').innerText = profile.ticker;

  lucide.createIcons();
}

// DASHBOARD SVG CHARTS GENERATOR
function setDashboardRange(range) {
  dashboardRange = range;
  document.querySelectorAll('.dashboard-range-btn').forEach(btn => {
    btn.className = "dashboard-range-btn px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-all";
  });
  const activeBtn = document.getElementById(`range-btn-${range}`);
  activeBtn.className = "dashboard-range-btn px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-blue-600 transition-all";
  drawDashboardCharts();
}

function drawDashboardCharts() {
  const energyContainer = document.getElementById('energy-chart-container');
  const carbonContainer = document.getElementById('carbon-chart-container');
  if (!energyContainer || !carbonContainer) return;

  const dataset = dashboardData[dashboardRange];
  const maxEnergy = Math.max(...dataset.energy) * 1.25;
  const maxCarbon = Math.max(...dataset.carbon) * 1.25;

  // Build Energy Area SVG
  let energyWidth = energyContainer.offsetWidth || 500;
  let energyHeight = 250;
  
  // Calculate coordinates
  const stepX = (energyWidth - 60) / (dataset.energy.length - 1);
  let points = [];
  for (let i = 0; i < dataset.energy.length; i++) {
    const x = 40 + i * stepX;
    const y = energyHeight - 30 - (dataset.energy[i] / maxEnergy) * (energyHeight - 60);
    points.push({ x, y });
  }

  let linePath = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    linePath += `L ${points[i].x} ${points[i].y} `;
  }
  
  let areaPath = linePath + `L ${points[points.length - 1].x} ${energyHeight - 30} L ${points[0].x} ${energyHeight - 30} Z`;

  let energySvg = `
    <svg width="100%" height="100%" viewBox="0 0 ${energyWidth} ${energyHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="energy-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stop-color="#10B981" stop-opacity="0.3"/>
          <stop offset="95%" stop-color="#10B981" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Grid Lines -->
      <line x1="40" y1="40" x2="${energyWidth - 20}" y2="40" stroke="rgba(255,255,255,0.05)" />
      <line x1="40" y1="110" x2="${energyWidth - 20}" y2="110" stroke="rgba(255,255,255,0.05)" />
      <line x1="40" y1="180" x2="${energyWidth - 20}" y2="180" stroke="rgba(255,255,255,0.05)" />
      <line x1="40" y1="${energyHeight - 30}" x2="${energyWidth - 20}" y2="${energyHeight - 30}" stroke="rgba(255,255,255,0.1)" />
      
      <!-- Area & Line -->
      <path d="${areaPath}" fill="url(#energy-grad)" />
      <path d="${linePath}" fill="none" stroke="#10B981" stroke-width="2" />
      
      <!-- Label nodes -->
  `;

  // Draw nodes & labels
  points.forEach((pt, i) => {
    energySvg += `
      <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#0D1B26" stroke="#10B981" stroke-width="2" />
      <text x="${pt.x}" y="${energyHeight - 10}" fill="#6B7280" font-size="9" text-anchor="middle">${dataset.labels[i]}</text>
    `;
  });
  energySvg += `</svg>`;
  energyContainer.innerHTML = energySvg;

  // Build Carbon Bar SVG
  let carbonWidth = carbonContainer.offsetWidth || 500;
  let carbonHeight = 190;
  const barStepX = (carbonWidth - 60) / dataset.carbon.length;
  const barWidth = Math.min(30, barStepX * 0.6);

  let carbonSvg = `
    <svg width="100%" height="100%" viewBox="0 0 ${carbonWidth} ${carbonHeight}" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="${carbonHeight - 30}" x2="${carbonWidth - 20}" y2="${carbonHeight - 30}" stroke="rgba(255,255,255,0.1)" />
  `;

  for (let i = 0; i < dataset.carbon.length; i++) {
    const x = 40 + i * barStepX + (barStepX - barWidth) / 2;
    const barH = (dataset.carbon[i] / maxCarbon) * (carbonHeight - 60);
    const y = carbonHeight - 30 - barH;

    carbonSvg += `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" fill="#3B82F6" rx="4" />
      <text x="${x + barWidth / 2}" y="${carbonHeight - 10}" fill="#6B7280" font-size="9" text-anchor="middle">${dataset.labels[i]}</text>
    `;
  }
  carbonSvg += `</svg>`;
  carbonContainer.innerHTML = carbonSvg;
}

// TECH STACK GRID WRITER
function drawTechStack() {
  const techGrid = document.getElementById('tech-stack-grid');
  if (!techGrid) return;

  const techs = [
    { name: 'React', icon: 'code', color: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.4)] border-cyan-500/40 bg-cyan-950/10' },
    { name: 'Node.js', icon: 'server', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)] border-emerald-500/40 bg-emerald-950/10' },
    { name: 'Express', icon: 'server', color: 'text-slate-200', glow: 'shadow-[0_0_20px_rgba(241,245,249,0.3)] border-slate-300/40 bg-slate-900/40' },
    { name: 'MongoDB', icon: 'database', color: 'text-green-500', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)] border-green-500/40 bg-green-950/10' },
    { name: 'Firebase', icon: 'flame', color: 'text-amber-500', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)] border-amber-500/40 bg-amber-950/10' },
    { name: 'Python', icon: 'code', color: 'text-yellow-400', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)] border-yellow-500/40 bg-yellow-950/10' },
    { name: 'TensorFlow', icon: 'brain-circuit', color: 'text-orange-500', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.4)] border-orange-500/40 bg-orange-950/10' },
    { name: 'OpenCV', icon: 'brain-circuit', color: 'text-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)] border-blue-500/40 bg-blue-950/10' },
    { name: 'ESP32', icon: 'cpu', color: 'text-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)] border-red-500/40 bg-red-950/10' },
    { name: 'Google Maps', icon: 'globe', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500/40 bg-emerald-950/10' },
    { name: 'Cloud APIs', icon: 'globe', color: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-500/40 bg-cyan-950/10' }
  ];

  techGrid.innerHTML = '';
  techs.forEach(tech => {
    const card = document.createElement('div');
    card.className = "tech-item p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer hover:border-emerald-500/30 hover:scale-105";
    card.setAttribute('data-glow', tech.glow);
    card.setAttribute('data-color', tech.color);
    
    card.innerHTML = `
      <div class="p-4 rounded-full bg-white/5 text-gray-400 mb-3 icon-container transition-all duration-300">
        <i data-lucide="${tech.icon}" class="w-7 h-7"></i>
      </div>
      <span class="font-poppins font-bold text-sm text-gray-400 label-span transition-colors duration-300">${tech.name}</span>
    `;
    
    // Hover event listeners
    card.addEventListener('mouseenter', () => {
      card.className = `tech-item p-6 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${tech.glow}`;
      card.querySelector('.icon-container').classList.add(tech.color);
      card.querySelector('.label-span').classList.add('text-white');
    });

    card.addEventListener('mouseleave', () => {
      card.className = "tech-item p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer";
      card.querySelector('.icon-container').classList.remove(tech.color);
      card.querySelector('.label-span').classList.remove('text-white');
    });

    techGrid.appendChild(card);
  });
  lucide.createIcons();
}

// INDIA CANVASES & ACTIVE SPOTS
function initIndiaMap() {
  const canvas = document.getElementById('india-map-canvas');
  const container = document.getElementById('map-spots-container');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 420;
  }
  resize();
  window.addEventListener('resize', resize);

  // Loop drawing dots mesh background
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // grid
    ctx.fillStyle = 'rgba(59,130,246,0.03)';
    for (let x = 0; x < canvas.width; x += 20) {
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Connect nodes
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    mapHotspots.forEach((city, i) => {
      const px = (city.x / 100) * canvas.width;
      const py = (city.y / 100) * canvas.height;
      mapHotspots.forEach((other, j) => {
        if (i !== j) {
          const ox = (other.x / 100) * canvas.width;
          const oy = (other.y / 100) * canvas.height;
          const dist = Math.hypot(ox - px, oy - py);
          if (dist < 180) {
            ctx.moveTo(px, py);
            ctx.lineTo(ox, oy);
          }
        }
      });
    });
    ctx.stroke();
    requestAnimationFrame(render);
  }
  render();

  // Populate absolute hotspots
  container.innerHTML = '';
  mapHotspots.forEach((spot, idx) => {
    const btn = document.createElement('button');
    btn.className = "absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-300";
    btn.style.left = `${spot.x}%`;
    btn.style.top = `${spot.y}%`;
    btn.onclick = () => selectHotspot(idx);

    btn.innerHTML = `
      <span class="absolute inset-0 rounded-full bg-emerald-500/35 w-4 h-4 -ml-1 -mt-1 ring-anim transition-all duration-300"></span>
      <span class="w-3.5 h-3.5 rounded-full flex items-center justify-center border bg-blue-500 border-white/40 spot-core transition-all duration-300"></span>
      <span class="absolute left-6 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${spot.college}</span>
    `;
    
    container.appendChild(btn);
  });

  selectHotspot(0);
}

function selectHotspot(idx) {
  selectedHotspot = idx;
  const btns = document.querySelectorAll('#map-spots-container > button');
  btns.forEach((btn, i) => {
    const ring = btn.querySelector('.ring-anim');
    const core = btn.querySelector('.spot-core');
    if (i === idx) {
      ring.className = "absolute inset-0 rounded-full bg-emerald-500/35 w-8 h-8 -ml-3 -mt-3 animate-ping ring-anim";
      core.className = "w-3.5 h-3.5 rounded-full flex items-center justify-center border bg-emerald-400 border-white shadow-[0_0_15px_rgba(52,211,153,0.8)] scale-110 spot-core";
    } else {
      ring.className = "absolute inset-0 rounded-full bg-emerald-500/35 w-4 h-4 -ml-1 -mt-1 ring-anim";
      core.className = "w-3.5 h-3.5 rounded-full flex items-center justify-center border bg-blue-500 border-white/40 spot-core";
    }
  });

  const info = mapHotspots[idx];
  document.getElementById('hotspot-city').innerText = info.city;
  document.getElementById('hotspot-college').innerText = info.college;
  document.getElementById('hotspot-savings').innerText = info.savings;
  document.getElementById('hotspot-sensors').innerText = info.activeSensors;
  document.getElementById('hotspot-waste').innerText = info.wasteCycles;
}

// FAQ ACCORDION BUILDER
function initFAQAccordion() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = '';
  faqs.forEach((faq, idx) => {
    const item = document.createElement('div');
    item.className = "faq-item rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-md overflow-hidden transition-all duration-300";
    item.innerHTML = `
      <button onclick="toggleFAQ(${idx})" class="w-full flex items-center justify-between p-6 text-left cursor-pointer group">
        <h3 class="faq-question font-poppins font-bold text-base md:text-lg text-gray-200 group-hover:text-white transition-colors">${faq.q}</h3>
        <div class="faq-icon-box p-1.5 rounded-full border border-white/10 bg-white/5 transition-transform duration-300">
          <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400"></i>
        </div>
      </button>
      <div class="faq-answer-box transition-all duration-350 ease-in-out max-h-0 overflow-hidden">
        <div class="p-6 text-sm md:text-base leading-relaxed text-gray-400 font-inter bg-slate-950/20">${faq.a}</div>
      </div>
    `;
    container.appendChild(item);
  });
  
  // Set first open by default
  setTimeout(() => toggleFAQ(0), 100);
}

function toggleFAQ(idx) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, i) => {
    const answer = item.querySelector('.faq-answer-box');
    const icon = item.querySelector('.faq-icon-box');
    const q = item.querySelector('.faq-question');
    if (i === idx) {
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
      if (isOpen) {
        answer.style.maxHeight = '0px';
        icon.className = "faq-icon-box p-1.5 rounded-full border border-white/10 bg-white/5 transition-transform duration-300";
        q.className = "faq-question font-poppins font-bold text-base md:text-lg text-gray-200 group-hover:text-white transition-colors";
      } else {
        answer.style.maxHeight = '300px';
        icon.className = "faq-icon-box p-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 rotate-180 transition-transform duration-300";
        q.className = "faq-question font-poppins font-bold text-base md:text-lg text-emerald-400 transition-colors";
      }
    } else {
      answer.style.maxHeight = '0px';
      icon.className = "faq-icon-box p-1.5 rounded-full border border-white/10 bg-white/5 transition-transform duration-300";
      q.className = "faq-question font-poppins font-bold text-base md:text-lg text-gray-200 group-hover:text-white transition-colors";
    }
  });
  lucide.createIcons();
}

// CONTACT FORM TELEMETRY HANDLER
function handleContactSubmit(e) {
  e.preventDefault();
  const errorDiv = document.getElementById('contact-error');
  const successDiv = document.getElementById('contact-success');
  const submitBtn = document.getElementById('form-submit-btn');

  errorDiv.classList.add('hidden');
  successDiv.classList.add('hidden');

  const name = document.getElementById('form-name').value.trim();
  const inst = document.getElementById('form-inst').value.trim();
  const msg = document.getElementById('form-msg').value.trim();

  if (!name || !inst || !msg) {
    errorDiv.innerText = "Please fill in all the details.";
    errorDiv.classList.remove('hidden');
    return;
  }

  // Disable button and simulate loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Submit Proposal Request</span><i data-lucide="send" class="w-4 h-4"></i>`;
    lucide.createIcons();

    // Fire Confetti explosion!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#166534', '#FFFFFF']
    });

    successDiv.classList.remove('hidden');
    
    // Clear inputs
    document.getElementById('contact-form').reset();
    setTimeout(() => successDiv.classList.add('hidden'), 5000);

  }, 1500);
}

// COPY EMAIL TO CLIPBOARD WITH PARTICLE GLOW & CONFETTI POP
function copyEmailToClipboard(e) {
  const emailText = 'utkarshraj152006@gmail.com';
  
  navigator.clipboard.writeText(emailText).then(() => {
    // Calculate coordinates for localized confetti explosion
    const container = document.getElementById('email-copy-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
    
    // Shoot localized green/blue confetti particles
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { x: x, y: y },
      colors: ['#10B981', '#3B82F6', '#ffffff']
    });

    // Update UI Elements
    const statusBox = document.getElementById('email-copy-status');
    const textLabel = document.getElementById('email-text-label');
    const iconBox = document.getElementById('email-icon-box');
    
    if (statusBox && textLabel && iconBox) {
      statusBox.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>`;
      textLabel.classList.remove('text-gray-250');
      textLabel.classList.add('text-emerald-450', 'text-emerald-400');
      iconBox.classList.remove('bg-emerald-500/10');
      iconBox.classList.add('bg-emerald-500/20');
      lucide.createIcons();

      // Revert back status styles
      setTimeout(() => {
        statusBox.innerHTML = `<i data-lucide="copy" class="w-4 h-4"></i>`;
        textLabel.classList.add('text-gray-250');
        textLabel.classList.remove('text-emerald-450', 'text-emerald-400');
        iconBox.classList.add('bg-emerald-500/10');
        iconBox.classList.remove('bg-emerald-500/20');
        lucide.createIcons();
      }, 2000);
    }
  });
}

// SIMULATE LIVE DASHBOARD TICKS
function tickLiveDashboard() {
  const scoreVal = document.getElementById('live-score-val');
  if (!scoreVal) return;

  const currentScore = parseInt(scoreVal.innerText);
  const offset = Math.random() > 0.5 ? 1 : -1;
  const newScore = Math.min(Math.max(currentScore + offset, 80), 96);
  scoreVal.innerText = `${newScore}/100`;

  // Energy fluctuation
  const energyVal = document.getElementById('live-energy-val');
  const randEnergy = Math.floor(Math.random() * 20 + 130);
  energyVal.innerText = `${randEnergy} kW`;
}
