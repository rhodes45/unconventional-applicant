const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are The Advisor, a warm, direct, and deeply experienced strategic thinking partner for unconventional applicants to competitive professional programs (medicine, law, graduate school, MBA, and others).

Your entire philosophy and framework is drawn from a real person's life: an English major who minored in neuroscience at a small college in rural Ohio, served a year in a faith-based service program before medical school, attended medical school in Boston, completed residency in two cities (Philadelphia and New Haven), did a fellowship in Houston, and ultimately became a double board-certified physician. This person grew up in New York City in the 1980s, attended NYC public schools before transitioning to private school, and was born in Nigeria. They are now a physician, entrepreneur, and parent of three.

This background is your lived framework, not your identity to disclose, but the deep well of experience that makes your advice specific, human, and credible. You do not talk about yourself. You talk about the person in front of you.

YOUR CORE BELIEFS (never state these as principles, just embody them):
- The non-linear path is not a liability to explain away. It is a signal of curiosity, resilience, and range.
- Admissions committees are not looking for the person who colored inside every line.
- The wrong major does not exist. Every background, framed correctly, is an asset.
- Gap years, career changes, late starts, and detours are not red flags. They are chapters.
- First-generation students and immigrants carry depth of experience that conventionally-tracked applicants simply do not have.

HOW YOU SPEAK:
- Warm but not soft. Honest but not harsh. Direct without being blunt.
- You use plain language. No jargon, no coaching-speak, no empty affirmations.
- You never say "Great question!" or "Absolutely!" or "Of course!"
- Keep responses SHORT. 2 to 4 sentences maximum. Make every sentence earn its place.
- NEVER use em dashes anywhere in your responses. Use commas or periods instead.
- NEVER use bullet points or numbered lists. Write in plain conversational paragraphs only.

RESPONSE FORMAT - THIS IS CRITICAL:
You must always respond with valid JSON in exactly this structure, with no extra text before or after:
{"message":"Your short 2-4 sentence response here.","chips":["chip one","chip two","chip three"]}

The message is your core response, short and direct.
The chips are 2 to 3 short follow-up options the user can tap to continue. Always make one chip exactly "Tell me more." The other chips should be specific next steps relevant to what was just discussed. Keep each chip under 8 words. Vary them every time.

WHAT YOU HELP WITH:
1. Identity and belonging
2. Narrative, how to speak about a non-linear path without apologizing
3. Personal statements for unconventional backgrounds
4. Interview strategy, owning the why did you major in X question
5. School and program selection
6. Timelines, gap years, post-bac, career changes after 30
7. First-generation and immigrant applicant strategy
8. Confidence, believing you belong before anyone confirms it

WHAT YOU DO NOT DO:
- Promise outcomes or guarantee acceptance anywhere
- Give GPA or test score cutoffs as gospel
- Replace formal academic or legal advising

DISCLAIMER: Include this only once, naturally woven into your very first message field, one sentence noting this is a thinking partnership, not formal advising. Never repeat it.`;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Unconventional Applicant</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root{--ink:#1a1610;--parchment:#f5f0e8;--warm-mid:#e8dfc8;--accent:#8b4513;--accent-light:#c4783a;--accent-glow:rgba(139,69,19,0.15);--muted:#6b6055;--border:rgba(139,69,19,0.2);--white:#fdfaf4}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background-color:var(--parchment);color:var(--ink);font-family:'DM Sans',sans-serif;font-weight:300;min-height:100vh;overflow-x:hidden;background-image:radial-gradient(ellipse at 20% 50%,rgba(139,69,19,0.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(196,120,58,0.06) 0%,transparent 50%)}
  #gate{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;animation:fadeIn 1s ease}
  .gate-card{max-width:480px;width:100%;text-align:center}
  .gate-eyebrow{font-family:'DM Mono',monospace;font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--accent);margin-bottom:2rem;opacity:0;animation:slideUp 0.8s ease 0.2s forwards}
  .gate-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5vw,3.2rem);line-height:1.1;margin-bottom:0.5rem;opacity:0;animation:slideUp 0.8s ease 0.4s forwards}
  .gate-title em{font-style:italic;color:var(--accent)}
  .gate-sub{font-size:1rem;color:var(--muted);font-weight:300;line-height:1.6;margin-bottom:3rem;opacity:0;animation:slideUp 0.8s ease 0.6s forwards}
  .gate-divider{width:3rem;height:1px;background:var(--accent);margin:1.5rem auto;opacity:0;animation:slideUp 0.8s ease 0.5s forwards}
  .gate-form{opacity:0;animation:slideUp 0.8s ease 0.8s forwards}
  .gate-label{font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:0.75rem;text-align:left}
  .gate-input{width:100%;padding:1rem 1.25rem;border:1px solid var(--border);background:var(--white);color:var(--ink);font-family:'DM Mono',monospace;font-size:0.85rem;letter-spacing:0.15em;outline:none;transition:border-color 0.2s,box-shadow 0.2s;border-radius:2px}
  .gate-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
  .gate-input::placeholder{color:#b0a090}
  .gate-error{color:#c0392b;font-size:0.75rem;margin-top:0.5rem;font-family:'DM Mono',monospace;display:none}
  .gate-btn{width:100%;margin-top:1.25rem;padding:1rem;background:var(--accent);color:var(--white);border:none;font-family:'DM Mono',monospace;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;transition:background 0.2s,transform 0.1s;border-radius:2px}
  .gate-btn:hover{background:var(--accent-light)}
  .gate-note{margin-top:1.5rem;font-size:0.72rem;color:var(--muted);line-height:1.7;font-family:'DM Mono',monospace}
  #app{display:none;min-height:100vh;flex-direction:column}
  header{padding:1.5rem 2rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:rgba(245,240,232,0.95);backdrop-filter:blur(8px);position:sticky;top:0;z-index:100}
  .header-brand{font-family:'Playfair Display',serif;font-size:1rem;color:var(--ink)}
  .header-brand em{color:var(--accent);font-style:italic}
  .header-tag{font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted)}
  .intro-panel{max-width:680px;margin:3rem auto 0;padding:0 2rem;animation:fadeIn 0.6s ease}
  .intro-heading{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);line-height:1.2;margin-bottom:1rem}
  .intro-heading em{color:var(--accent);font-style:italic}
  .intro-body{font-size:1rem;line-height:1.75;color:var(--muted);margin-bottom:2rem}
  .prompt-chips{display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:2.5rem}
  .chip{padding:0.5rem 1rem;border:1px solid var(--border);background:var(--white);font-size:0.78rem;font-family:'DM Sans',sans-serif;color:var(--ink);cursor:pointer;transition:all 0.18s;border-radius:2px;line-height:1.4}
  .chip:hover{background:var(--accent);color:var(--white);border-color:var(--accent)}
  #chat-area{max-width:680px;margin:0 auto;padding:0 2rem 2rem;width:100%;flex:1}
  .messages{display:flex;flex-direction:column;gap:1.5rem;padding-bottom:8rem}
  .msg{display:flex;gap:1rem;animation:slideUp 0.4s ease}
  .msg-avatar{width:2rem;height:2rem;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:0.75rem;margin-top:0.1rem}
  .msg.advisor .msg-avatar{background:var(--accent);color:var(--white)}
  .msg.user .msg-avatar{background:var(--warm-mid);color:var(--ink)}
  .msg.user{flex-direction:row-reverse}
  .msg-bubble{max-width:88%;padding:1rem 1.25rem;border-radius:2px;line-height:1.7;font-size:0.92rem}
  .msg.advisor .msg-bubble{background:var(--white);border:1px solid var(--border);color:var(--ink);border-left:3px solid var(--accent)}
  .msg.user .msg-bubble{background:var(--accent);color:var(--white)}
  .msg-bubble p{margin-bottom:0.6rem}
  .msg-bubble p:last-child{margin-bottom:0}
  .response-chips{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem;margin-left:3rem}
  .response-chip{padding:0.45rem 0.9rem;border:1px solid var(--border);background:var(--white);font-size:0.75rem;font-family:'DM Sans',sans-serif;color:var(--accent);cursor:pointer;transition:all 0.18s;border-radius:2px;line-height:1.4}
  .response-chip:hover{background:var(--accent);color:var(--white);border-color:var(--accent)}
  .thinking{display:flex;gap:4px;align-items:center;padding:0.8rem 1.25rem}
  .dot{width:6px;height:6px;border-radius:50%;background:var(--accent-light);animation:bounce 1.2s infinite}
  .dot:nth-child(2){animation-delay:0.2s}
  .dot:nth-child(3){animation-delay:0.4s}
  .input-bar{position:fixed;bottom:0;left:0;right:0;background:rgba(245,240,232,0.97);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:1rem 2rem;z-index:100}
  .input-inner{max-width:680px;margin:0 auto;display:flex;gap:0.75rem;align-items:flex-end}
  .chat-input{flex:1;padding:0.85rem 1.1rem;border:1px solid var(--border);background:var(--white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:0.9rem;outline:none;resize:none;min-height:48px;max-height:140px;border-radius:2px;transition:border-color 0.2s,box-shadow 0.2s;line-height:1.5}
  .chat-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
  .chat-input::placeholder{color:#b0a090}
  .send-btn{width:48px;height:48px;background:var(--accent);border:none;border-radius:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.18s,transform 0.1s}
  .send-btn:hover{background:var(--accent-light)}
  .send-btn:active{transform:scale(0.96)}
  .send-btn:disabled{background:var(--warm-mid);cursor:not-allowed}
  .send-btn svg{width:18px;height:18px;fill:none;stroke:white;stroke-width:2}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
  @media(max-width:600px){header{padding:1rem}.intro-panel,#chat-area{padding:0 1rem}.input-bar{padding:0.75rem 1rem}}
</style>
</head>
<body>
<div id="gate">
  <div class="gate-card">
    <p class="gate-eyebrow">Private Access</p>
    <h1 class="gate-title">The <em>Unconventional</em><br>Applicant</h1>
    <div class="gate-divider"></div>
    <p class="gate-sub">Your on-demand strategic advisor for the non-linear path to medicine, law, and competitive professional programs.</p>
    <div class="gate-form">
      <label class="gate-label" for="pwd">Enter your access code</label>
      <input class="gate-input" type="password" id="pwd" placeholder="••••••••" autocomplete="off"/>
      <p class="gate-error" id="gate-error">That code does not match. Please check your purchase confirmation.</p>
      <button class="gate-btn" onclick="checkPassword()">Enter &rarr;</button>
      <p class="gate-note">Purchased access is for individual use.</p>
    </div>
  </div>
</div>
<div id="app">
  <header>
    <span class="header-brand">The <em>Unconventional</em> Applicant</span>
    <span class="header-tag">On-Demand Advisor</span>
  </header>
  <div id="main-content">
    <div class="intro-panel" id="intro">
      <h2 class="intro-heading">You did not take<br>the <em>straight line.</em><br>Good.</h2>
      <p class="intro-body">This is a private thinking space. Tell me where you are, and I will help you figure out where you are going.</p>
      <div class="prompt-chips">
        <div class="chip" onclick="sendChip(this)">I majored in something wrong. Am I disqualified?</div>
        <div class="chip" onclick="sendChip(this)">How do I explain a gap year without apologizing?</div>
        <div class="chip" onclick="sendChip(this)">I am 30+ and thinking about a career change. Is it too late?</div>
        <div class="chip" onclick="sendChip(this)">I do not have a straight-line resume. How do I write my personal statement?</div>
        <div class="chip" onclick="sendChip(this)">I am a first-generation student. Where do I even start?</div>
        <div class="chip" onclick="sendChip(this)">How do I own the why did you major in X interview question?</div>
      </div>
    </div>
    <div id="chat-area" style="display:none">
      <div class="messages" id="messages"></div>
    </div>
  </div>
  <div class="input-bar">
    <div class="input-inner">
      <textarea class="chat-input" id="chat-input" placeholder="Tell me where you are. I will help you figure out where to go." rows="1"></textarea>
      <button class="send-btn" id="send-btn" onclick="sendMessage()">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>
</div>
<script>
const ACCESS_CODE="crooked2024";
let conversationHistory=[];
let isLoading=false;
function checkPassword(){
  const val=document.getElementById('pwd').value.trim();
  const err=document.getElementById('gate-error');
  if(val===ACCESS_CODE){
    document.getElementById('gate').style.display='none';
    const app=document.getElementById('app');
    app.style.display='flex';
    app.style.flexDirection='column';
  } else {
    err.style.display='block';
    document.getElementById('pwd').style.borderColor='#c0392b';
  }
}
document.getElementById('pwd').addEventListener('keydown',e=>{if(e.key==='Enter')checkPassword()});
function sendChip(el){document.getElementById('chat-input').value=el.textContent;sendMessage()}
async function sendMessage(){
  if(isLoading)return;
  const input=document.getElementById('chat-input');
  const text=input.value.trim();
  if(!text)return;
  document.getElementById('intro').style.display='none';
  document.getElementById('chat-area').style.display='block';
  input.value='';input.style.height='auto';
  addMessage('user',text,null);
  conversationHistory.push({role:'user',content:text});
  isLoading=true;
  document.getElementById('send-btn').disabled=true;
  const thinkingId=addThinking();
  try{
    const response=await fetch('/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:conversationHistory})});
    const data=await response.json();
    removeThinking(thinkingId);
    const reply=data.reply||'{"message":"I am having a moment. Try sending that again.","chips":["Try again"]}';
    let parsed;
    try{parsed=JSON.parse(reply)}catch(e){parsed={message:reply,chips:["Tell me more"]}}
    addMessage('advisor',parsed.message,parsed.chips);
    conversationHistory.push({role:'assistant',content:reply});
  } catch(err){
    removeThinking(thinkingId);
    addMessage('advisor','Something went wrong on my end. Give it another try.',["Try again"]);
  }
  isLoading=false;
  document.getElementById('send-btn').disabled=false;
  input.focus();
}
function addMessage(role,text,chips){
  const messages=document.getElementById('messages');
  const div=document.createElement('div');
  div.className='msg '+role;
  const initial=role==='advisor'?'A':'You';
  const formatted=text.split('\\n').filter(l=>l.trim()).map(l=>'<p>'+l+'</p>').join('');
  div.innerHTML='<div class="msg-avatar">'+initial+'</div><div class="msg-bubble">'+formatted+'</div>';
  messages.appendChild(div);
  if(chips&&chips.length>0&&role==='advisor'){
    const chipRow=document.createElement('div');
    chipRow.className='response-chips';
    chips.forEach(function(c){
      const btn=document.createElement('button');
      btn.className='response-chip';
      btn.textContent=c;
      btn.onclick=function(){
        document.getElementById('chat-input').value=c;
        sendMessage();
      };
      chipRow.appendChild(btn);
    });
    messages.appendChild(chipRow);
  }
  div.scrollIntoView({behavior:'smooth',block:'end'});
}
let thinkingCounter=0;
function addThinking(){
  const id='thinking-'+thinkingCounter++;
  const messages=document.getElementById('messages');
  const div=document.createElement('div');
  div.className='msg advisor';div.id=id;
  div.innerHTML='<div class="msg-avatar">A</div><div class="msg-bubble"><div class="thinking"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>';
  messages.appendChild(div);
  div.scrollIntoView({behavior:'smooth',block:'end'});
  return id;
}
function removeThinking(id){const el=document.getElementById(id);if(el)el.remove()}
document.getElementById('chat-input').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,140)+'px'});
document.getElementById('chat-input').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}});
</script>
</body>
</html>`);
});

app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid messages format' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages })
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    res.json({ reply: data.content?.[0]?.text || '{"message":"Something went wrong. Please try again.","chips":["Try again"]}' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
