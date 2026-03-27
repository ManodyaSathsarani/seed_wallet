(function () {
    const BACKEND_URL = 'http://localhost:8080/api/chat';
    const SYSTEM_PROMPT = `You are a helpful assistant for a Seed Bank Management System.

Only answer questions related to seed banks, seed storage, and the system features.
Keep answers short, friendly, and clear (2-4 sentences max).
Use occasional emojis and highlight important words using HTML <strong> tags.

If asked anything unrelated, politely say you can only help with seed bank questions.

About the platform:

The Seed Bank Management System is a web-based platform built with React, Spring Boot, and MySQL.

Main Features:

Seed Management
- Add, update, and delete seed types
- Track seed quantities
- Record supplier details

Storage Monitoring
- Manage seed storage locations
- Track temperature and humidity conditions

Expiry Tracking
- Monitor seed expiry dates
- Automatic alerts for seeds that are about to expire
- Prevent distribution of expired seeds

Distribution Logs
- Record seed distribution history
- Track which seeds were given to farmers

Farmer Portal
- Farmers can view available seeds
- Farmers can request seeds from the seed bank
- Farmers can list their own seeds for exchange

Seed Exchange Marketplace
- Farmers can list seeds for exchange
- Send exchange requests
- Accept or reject exchange requests
- View exchange history

Admin Features
- Monitor all seed exchanges
- Approve or reject exchange requests
- Manage seed inventory

Benefits
- Reduces seed wastage
- Improves seed storage efficiency
- Preserves rare and traditional seed varieties
- Supports sustainable agriculture
- Encourages collaboration between farmers
`;


    async function chatWithBackend(userMessage) {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            console.error('Backend chat error:', res.status, errBody);
            throw new Error(`Backend ${res.status}: ${errBody?.error || 'Unknown error'}`);
        }

        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error('Empty backend response');
        return text;
    }

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const style = document.createElement('style');
    style.textContent = `
    #pill {
      animation: Pulse 2.5s ease-in-out infinite;
      transition: transform 0.2s, box-shadow 0.2s !important;
    }
    #pill:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 8px 28px rgba(69, 253, 13, 0.55) !important; }

    #panel {
      width: 360px;
      height: 0;
      transition: height 0.38s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 12px 48px rgba(13,110,253,0.15), 0 2px 16px rgba(0,0,0,0.12) !important;
      border: 1px solid rgba(13,110,253,0.12) !important;
    }
    #panel.open {
     height: 540px; 
    }

    #head {
      background: linear-gradient(135deg, #51fd0d8b, #206f1f);
      border-radius: 20px 20px 0 0;
    }
    #head-avatar {
      width: 42px; 
      height: 42px; 
      background: rgba(255,255,255,0.2);
      border: 1.5px solid rgba(255,255,255,0.3);
    }
    #status-dot { 
      width: 7px; 
      height: 7px; 
      border-radius: 50%; 
      background: #4ade80; 
      box-shadow: 0 0 6px #4ade80; 
    }
    #status-txt {
     font-size: 11px; 
     color: rgba(255,255,255,0.75); 
     font-weight: 500; }

    #msgs {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      background: #000000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }
    #msgs::-webkit-scrollbar { 
      width: 4px; 
    }
    #msgs::-webkit-scrollbar-thumb { 
      background: #000000; 
      border-radius: 99px; 
    }

    .bot-row { display: 
      flex; align-items: 
      flex-end; gap: 8px; 
    }
    .bot-avatar {
      width: 30px; 
      height: 30px; 
      border-radius: 10px; 
      flex-shrink: 0;
      background: linear-gradient(135deg, #51fd0d8b, #206f1f);
      display: flex; 
      align-items: center; 
      justify-content: center;
      box-shadow: 0 2px 8px rgba(13,110,253,0.3);
    }
    .bot-content {
     display: flex; 
     flex-direction: column; 
     gap: 3px; 
     max-width: 78%; 
    }
    .bubble-bot {
      background: #3e3c3c;
      color: #ffffff;
      border-radius: 18px 18px 18px 4px;
      padding: 10px 14px;
      font-size: 13px;
      line-height: 1.6;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }
    .bubble-bot strong { 
      color: #51fd0d8b;
    }
    .timestamp-bot {
     font-size: 10px; 
     color: #94a3b8; 
     padding-left: 4px; 
    }

    .user-row { 
      display: flex; 
      justify-content: flex-end; 
    }
    .user-content {
     display: flex; 
     flex-direction: column; 
     align-items: flex-end; 
     gap: 3px; 
     max-width: 78%; 
    }
    .bubble-user {
      background: linear-gradient(135deg, #51fd0d8b, #206f1f);
      color: #fff;
      border-radius: 18px 18px 4px 18px;
      padding: 10px 14px;
      font-size: 13px;
      line-height: 1.6;
      box-shadow: 0 2px 10px rgba(13,110,253,0.3);
    }
    .timestamp-user {
     font-size: 10px; 
     color: #94a3b8; 
     padding-right: 4px; 
    }

    .typing-bubble {
      background: #403d3d; border: 1px solid #e2e8f0;
      border-radius: 18px 18px 18px 4px;
      padding: 10px 14px;
      display: flex; gap: 4px; align-items: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .typing-dot {
     width: 7px; 
     height: 7px; 
     border-radius: 50%; 
     background: #94a3b8; 
     animation: drDot 1.2s ease-in-out infinite; 
    }

    .typing-dot:nth-child(2) {
     animation-delay: .2s; 
    }
    .typing-dot:nth-child(3) {
     animation-delay: .4s; 
    }

    .quick-wrap { 
      display: flex; 
      flex-direction: column;
      gap: 6px; 
      padding-left: 38px; 
    }
    .quick-btn {
      text-align: left; 
      font-size: 12px; 
      font-weight: 500;
      padding: 7px 12px; 
      border-radius: 20px;
      background: #3f3b3b; 
      color: #0dfd61;
      border: 1.5px solid #0dfd31;
      cursor: pointer; 
      transition: all 0.15s;
      font-family: inherit;
    }
    .quick-btn:hover {
     background: #1b7d09; 
     color: #fff; 
    }

    #foot {
      padding: 12px 14px;
      background: #000000;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 8px; 
      align-items: center;
      border-radius: 0 0 20px 20px;
      flex-shrink: 0;
    }
    #input {
      flex: 1; 
      padding: 10px 16px; 
      border-radius: 24px;
      border: 1.5px solid #ffffff; 
      font-size: 13px;
      outline: none; 
      font-family: inherit; 
      color: #ffffff;
      background: #000000; 
      transition: border-color 0.15s;
    }
    #input:focus {
      border-color: #1dd25a; 
      background: #0a0a0a; 
    }
    #input::placeholder { 
      color: #94a3b8; 
    }
    #send {
      width: 40px; 
      height: 40px; 
      border-radius: 50%; 
      flex-shrink: 0;
      background: linear-gradient(135deg, #51fd0d8b, #206f1f);
      border: none; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      cursor: pointer; 
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(13,110,253,0.35);
    }
    #send:disabled {
     background: #294c1b8b; 
     box-shadow: none; 
     cursor: not-allowed; 
    }
    #send:not(:disabled):hover {
     transform: scale(1.08); 
     box-shadow: 0 4px 14px rgba(13,110,253,0.5); 
    }

    .date-divider {
      text-align: center;
      font-size: 11px; 
      color: #94a3b8;
      margin: 4px 0; 
      display: flex; 
      align-items: center; 
      gap: 8px;
    }
    .date-divider::before,.date-divider::after {
     content:''; 
     flex:1; 
     height:1px; 
     background:#e2e8f0; 
    }

    @keyframes Pulse {
      0%,100% { box-shadow: 0 4px 20px rgba(13, 253, 61, 0.4), 0 0 0 0 rgba(13, 253, 109, 0.25); }
      50%      { box-shadow: 0 4px 20px rgba(13, 253, 113, 0.4), 0 0 0 10px rgba(13, 253, 93, 0); }
    }
    @keyframes Dot {
      0%,60%,100% {
       transform: translateY(0);
       opacity:.4; 
      }
      30%{
       transform: translateY(-4px); 
       opacity:1; 
      }
    }
    @keyframes FadeIn {
      from {
       opacity:0;
       transform: 
       translateY(6px); 
      }
      to{
       opacity:1;
       transform: 
       translateY(0);
      }
    }
    .bot-row, .user-row {
     animation: FadeIn 0.25s ease; 
    }
  `;
    document.head.appendChild(style);

    const statusText = 'Assistant';
    document.body.insertAdjacentHTML('beforeend', `
    <button id="pill" class="btn rounded-pill d-flex align-items-center gap-2 fw-bold text-white bg-success border-0"
      style="position:fixed;bottom:24px;right:24px;z-index:9999;padding:11px 22px;font-size:13px;">
      <svg id="ic-open" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg id="ic-close" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      <span id="pill-label">Ask anything</span>
      <span id="badge" class="badge rounded-pill" style="background:rgba(255,255,255,0.3);font-size:10px;">1</span>
    </button>

    <div id="panel" class="card border-0 d-flex flex-column rounded-4 overflow-hidden"
      style="position:fixed;bottom:76px;right:24px;z-index:9998;">

      <div id="head" class="d-flex align-items-center gap-3 px-3 py-2 flex-shrink-0">
        <div id="head-avatar" class=" d-flex rounded-3 align-items-center justify-content-center flex-shrink-0">
          <i class="bi bi-person-fill text-white" style="font-size:20px;"></i>
        </div>
        <div style="flex:1;">
          <div class="fw-bold text-white small">Seed Management assistent</div>
          <div class="d-flex align-items-center gap-1 mt-1">
            <div id="status-dot"></div>
            <span id="status-txt">${statusText}</span>
          </div>
        </div>
        <button onclick="document.getElementById('pill').click()"
          style="background:rgba(255,255,255,0.15);border:none;border-radius:8px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div id="msgs"></div>

      <div id="foot">
        <input id="input" type="text" placeholder="Ask about recipes, calories, BMI..." />
        <button id="send" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `);

    const pill = document.getElementById('pill');
    const panel = document.getElementById('panel');
    const msgs = document.getElementById('msgs');
    const input = document.getElementById('input');
    const send = document.getElementById('send');
    const badge = document.getElementById('badge');
    const label = document.getElementById('pill-label');
    const icOpen = document.getElementById('ic-open');
    const icClose = document.getElementById('ic-close');

    let open = false, busy = false;
    const suggest = [
        'How do I add a seed?',
        'What is the Seed Exchange Marketplace?',
        'How does seed expiry tracking work?',
        'How can farmers exchange seeds?'
    ];
    //add bot message
    function addBotMsg(html) {
        document.getElementById('quick-wrap')?.remove();
        const row = document.createElement('div');
        row.className = 'bot-row';
        row.innerHTML = `
      <div class="bot-avatar">
        <i class="bi bi-person-fill text-white" style="font-size:20px;"></i>
      </div>
      <div class="bot-content">
        <div class="bubble-bot">${html}</div>
        <div class="timestamp-bot">${getTime()}</div>
      </div>`;
        msgs.appendChild(row);
        msgs.scrollTop = msgs.scrollHeight;
    }

    //add user message
    function addUserMsg(text) {
        document.getElementById('quick-wrap')?.remove();
        const row = document.createElement('div');
        row.className = 'user-row';
        row.innerHTML = `
      <div class="user-content">
        <div class="bubble-user">${text}</div>
        <div class="timestamp-user">${getTime()}</div>
      </div>`;
        msgs.appendChild(row);
        msgs.scrollTop = msgs.scrollHeight;
    }

    //typing indicator
    function showTyping() {
        const row = document.createElement('div');
        row.id = 'typing-row'; row.className = 'bot-row';
        row.innerHTML = `
      <div class="bot-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
      </div>
      <div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
        msgs.appendChild(row);
        msgs.scrollTop = msgs.scrollHeight;
    }
    function hideTyping() { document.getElementById('typing-row')?.remove(); }

    //suggestions
    function showsuggestion() {
        const wrap = document.createElement('div');
        wrap.id = 'quick-wrap'; wrap.className = 'quick-wrap';
        suggest.forEach(q => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = q;
            btn.onclick = () => doSend(q);
            wrap.appendChild(btn);
        });
        msgs.appendChild(wrap);
        msgs.scrollTop = msgs.scrollHeight;
    }

    //Send
    async function doSend(text) {
        const msg = (text || input.value).trim();
        if (!msg || busy) return;
        busy = true; input.value = ''; send.disabled = true;
        addUserMsg(msg);
        showTyping();

        let reply = null;
        if (true) {
            try {
                reply = await chatWithBackend(msg);
            } catch (err) {
                console.warn('Backend failed, using local FAQ fallback:', err.message);
            }
            if (!reply) {
                reply = "Sorry, I couldn't process that request. Please ask about the Seed Bank system. 🌱";
            }

            hideTyping();
            addBotMsg(reply);
            busy = false;
            send.disabled = !input.value.trim();
        }
    }

    //pill toggle
    pill.onclick = () => {
        open = !open;
        panel.classList.toggle('open', open);
        pill.classList.toggle('open', open);
        icOpen.style.display = open ? 'none' : 'inline';
        icClose.style.display = open ? 'inline' : 'none';
        label.textContent = open ? 'Close' : 'Ask anything';
        badge.style.display = 'none';
        if (open) setTimeout(() => input.focus(), 350);
    };

    input.oninput = () => { send.disabled = !input.value.trim() || busy; };
    input.onkeydown = e => { if (e.key === 'Enter') doSend(); };
    send.onclick = () => doSend();

    //date
    const d = new Date();
    const divider = document.createElement('div');
    divider.className = 'date-divider';
    divider.textContent = d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
    msgs.appendChild(divider);

    addBotMsg(`👋 Hi! I'm your seed management assistant. Ask me about <strong>recipes</strong>, <strong>calories</strong>, <strong>BMI</strong>, or <strong>meal plans</strong> — or pick a quick question below!`);
    showsuggestion();

})();