import { useState } from 'react'
import { Bell, BriefcaseBusiness, Camera, Check, ChevronDown, Heart, Mail, MapPin, MessageCircle, Palette, Plus, Search, Settings2, Sparkles, Users } from 'lucide-react'

type ThemeName = 'Studio' | 'After Hours' | 'Playground' | 'Archive'
type LayoutName = 'Editorial' | 'Grid' | 'Stacked'

const themes: Record<ThemeName, { label: string; bg: string; ink: string; accent: string; card: string; muted: string; texture: string }> = {
  Studio: { label: 'Studio', bg: '#f1ede5', ink: '#17191c', accent: '#f36b21', card: '#fffdf8', muted: '#68645e', texture: 'paper' },
  'After Hours': { label: 'After Hours', bg: '#11151d', ink: '#f5f3ef', accent: '#a6f06b', card: '#202632', muted: '#b3bac5', texture: 'dark' },
  Playground: { label: 'Playground', bg: '#f8e9ef', ink: '#281b31', accent: '#e54487', card: '#fff8fb', muted: '#755b70', texture: 'pink' },
  Archive: { label: 'Archive', bg: '#e7e2d4', ink: '#272b24', accent: '#456b55', card: '#f7f3e9', muted: '#666b5e', texture: 'archive' },
}

const projects = [
  { title: 'UTG Kape', type: 'Brand identity · Art direction', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85' },
  { title: 'Objects & Form', type: 'Visual identity · Packaging', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85' },
  { title: 'Daily Practice', type: 'Campaign · Creative direction', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85' },
]

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('Studio')
  const [layout, setLayout] = useState<LayoutName>('Editorial')
  const [customizing, setCustomizing] = useState(false)
  const [connected, setConnected] = useState(false)
  const [liked, setLiked] = useState(false)
  const theme = themes[themeName]

  return <div className="app-shell">
    <header className="topbar">
      <a className="wordmark" href="#home">KREATOR<br/>KREW</a>
      <nav className="main-nav"><a href="#home">Home</a><a href="#discover">Discover</a><a href="#opportunities">Opportunities</a><a href="#events">Events</a><a href="#stories">Stories</a></nav>
      <div className="top-actions"><button aria-label="Search"><Search size={19}/></button><button aria-label="Notifications"><Bell size={19}/><i/></button><button aria-label="Messages"><Mail size={19}/></button><div className="mini-avatar">MF</div></div>
    </header>

    <main className="page-wrap" id="home">
      <div className="page-toolbar"><div><span className="eyebrow">KREATOR KREW / MEMBER PAGE</span><h1>A little corner of the internet.</h1></div><button className="customize-button" onClick={() => setCustomizing(!customizing)}><Settings2 size={16}/>{customizing ? 'Close editor' : 'Customize page'}</button></div>
      {customizing && <section className="editor-panel"><div className="editor-heading"><div><span className="eyebrow">PAGE PERSONALIZATION</span><h2>Make it yours.</h2></div><Sparkles size={22}/></div><div className="editor-grid"><div><label>Choose a theme</label><div className="theme-options">{(Object.keys(themes) as ThemeName[]).map(name => <button key={name} className={`theme-option ${themeName === name ? 'selected' : ''}`} onClick={() => setThemeName(name)}><span style={{background: themes[name].bg, color: themes[name].ink, borderColor: themes[name].accent}}>{name === 'Studio' ? 'Aa' : name === 'After Hours' ? '夜' : name === 'Playground' ? '✳' : '01'}</span>{name}{themeName === name && <Check size={14}/>}</button>)}</div></div><div><label>Accent color</label><div className="color-options">{['#f36b21','#a6f06b','#e54487','#456b55','#6d77e8'].map(color => <button key={color} aria-label={`Set accent ${color}`} onClick={() => document.documentElement.style.setProperty('--member-accent', color)} style={{background:color}}/>)}</div></div><div><label>Content layout</label><div className="layout-options">{(['Editorial','Grid','Stacked'] as LayoutName[]).map(item => <button key={item} className={layout === item ? 'active' : ''} onClick={() => setLayout(item)}>{item}</button>)}</div></div></div><p className="editor-note">Your profile information stays in the same place. Your theme changes how the card and everything around it look.</p></section>}

      <div className={`member-page layout-${layout.toLowerCase()}`} style={{'--page-bg':theme.bg,'--page-ink':theme.ink,'--page-accent':theme.accent,'--card-bg':theme.card,'--page-muted':theme.muted} as React.CSSProperties}>
        <aside className="profile-column">
          <div className={`profile-card texture-${theme.texture}`}>
            <div className="card-topline"><span className="kk-stamp">KK<span>®</span></span><span className="member-label">KREATOR KREW<br/>MEMBER</span></div>
            <div className="portrait-wrap"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90" alt="MF Navarro portrait"/><span className="portrait-mark">✳</span></div>
            <div className="profile-name-row"><div><h2>MF NAVARRO</h2><a className="handle" href="#profile">@mfnavarro</a></div><button className={`heart-button ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} aria-label="Appreciate profile"><Heart size={19} fill={liked ? 'currentColor' : 'none'}/></button></div>
            <div className="profile-meta"><span><BriefcaseBusiness size={15}/> Multimedia Designer</span><span><MapPin size={15}/> Philippines</span></div>
            <p className="profile-bio">Designing brands, visuals, and digital experiences. Into motion, storytelling, and building creative ideas with the right people.</p>
            <div className="skill-list"><span>Design</span><span>Motion</span><span>Branding</span><span>Video</span><span>Illustration</span></div>
            <div className="profile-stats"><div><strong>128</strong><small>Connections</small></div><div><strong>24</strong><small>Projects</small></div><div><strong>08</strong><small>Testimonials</small></div></div>
            <div className="profile-buttons"><button className="connect-button" onClick={() => setConnected(!connected)}>{connected ? <Check size={16}/> : <Plus size={16}/>} {connected ? 'Connected' : 'Connect'}</button><button className="message-button"><MessageCircle size={16}/> Message</button></div>
            <div className="card-footer"><span>MEMBER SINCE 2026</span><span>MANILA, PH</span></div>
          </div>
          <div className="profile-side-note"><span className="tiny-star">✳</span><span>GOOD PEOPLE.<br/>GOOD WORK.<br/>GOOD ENERGY.</span></div>
        </aside>

        <section className="personal-space">
          <div className="welcome-block"><div className="welcome-copy"><span className="eyebrow">THIS IS MY SPACE</span><h2>WELCOME TO<br/><em>MY KREW PAGE.</em></h2><div className="scribble-line"/><h3>A LITTLE ABOUT ME</h3><p>A multimedia designer who enjoys turning ideas into visuals, motion, and campaigns. I collaborate with brands and teams to create work that looks good, works well, and connects with people.</p></div><div className="camera-art"><Camera size={86} strokeWidth={1.2}/><span>COLLECT<br/>MOMENTS</span></div><span className="corner-note">A WORK IN PROGRESS ↗</span></div>
          <section className="work-section"><div className="section-heading"><div><span className="eyebrow">A FEW THINGS I'VE MADE</span><h3>SELECTED WORKS</h3></div><a href="#work">VIEW ALL PROJECTS ↗</a></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={project.title}/><span>0{index+1}</span></div><h4>{project.title}</h4><p>{project.type}</p></article>)}</div></section>
          <div className="bottom-grid"><section className="interests-section"><span className="eyebrow">CURRENTLY INTO</span><h3>THINGS ON MY RADAR</h3><ul><li><Check size={15}/> Brand & visual identity</li><li><Check size={15}/> Motion graphics</li><li><Check size={15}/> Creative tools & AI workflows</li><li><Check size={15}/> Small creative experiments</li><li><Check size={15}/> Coffee (always)</li></ul></section><section className="collab-card"><span className="collab-star">✳</span><span className="eyebrow">OPEN TO GOOD IDEAS</span><h3>LET'S<br/>COLLAB!</h3><p>Open to creative projects, collaborations, and interesting ideas.</p><a href="mailto:hello@kreatorkrew.com">GET IN TOUCH ↗</a></section></div>
          <footer className="personal-footer"><span>MADE WITH INTENTION, IN THE PHILIPPINES.</span><span>BACK TO TOP ↑</span></footer>
        </section>
      </div>
      <div className="page-bottom"><span><Users size={15}/> FIND YOUR PEOPLE.</span><span>KREATOR KREW © 2026</span></div>
    </main>
    <div className="floating-hint"><Palette size={15}/> Theme: {theme.label}<ChevronDown size={14}/></div>
  </div>
}

export default App
