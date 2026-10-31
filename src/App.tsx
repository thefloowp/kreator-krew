import { useState } from 'react'
import { Bell, BriefcaseBusiness, CalendarDays, Compass, Heart, Home, Mail, MapPin, MessageCircle, Search, Users, ArrowUpRight, Bookmark, Menu, X, Camera, Palette, Settings2 } from 'lucide-react'

type Page = 'Home' | 'Discover' | 'Opportunities' | 'Events' | 'Stories' | 'My Krew Page'

const members = [
  { name: 'MF Navarro', handle: '@mfnavarro', role: 'Multimedia Designer', location: 'Parañaque', skills: ['Branding', 'Motion', 'Design'], initials: 'MF', color: '#f36b21' },
  { name: 'Paolo Reyes', handle: '@paoloreyes', role: 'Photographer & Filmmaker', location: 'Makati', skills: ['Photography', 'Film', 'Direction'], initials: 'PR', color: '#8b9d72' },
  { name: 'Nica Santos', handle: '@nicasantos', role: 'Brand Strategist', location: 'Quezon City', skills: ['Strategy', 'Research', 'Culture'], initials: 'NS', color: '#c17c9a' },
  { name: 'Jules Garcia', handle: '@julescreates', role: 'Illustrator', location: 'Cebu City', skills: ['Illustration', 'Art', 'Editorial'], initials: 'JG', color: '#7888bd' },
]
const opportunities = [
  { type: 'FREELANCE', title: 'Social Media Designer', company: 'Good Habit Studio', location: 'Remote · Philippines', pay: '₱25,000–₱35,000 / month', tags: ['Graphic Design', 'Social Media'], featured: true },
  { type: 'PROJECT', title: 'Brand Identity for a Local Café', company: 'Independent Client', location: 'Remote', pay: '₱18,000 project budget', tags: ['Branding', 'Logo Design'], featured: false },
  { type: 'FULL-TIME', title: 'Junior Video Editor', company: 'Northstar Creative', location: 'Hybrid · Metro Manila', pay: '₱30,000–₱40,000 / month', tags: ['Video Editing', 'Motion'], featured: false },
]
const events = [
  { day: '08', month: 'NOV', title: 'Krew Meetup: Make New Things', kind: 'COMMUNITY MEETUP', place: 'Makati City · In person', time: '3:00 PM' },
  { day: '15', month: 'NOV', title: 'Creative Work, Real Talk', kind: 'KREW SESSION', place: 'Online · Live session', time: '7:00 PM' },
  { day: '22', month: 'NOV', title: 'Show Your Process', kind: 'PORTFOLIO NIGHT', place: 'Quezon City · In person', time: '5:00 PM' },
]
const stories = [
  { category: 'MEET THE KREW', title: 'Good work starts with good people.', author: 'Kreator Krew', date: 'COMMUNITY SPOTLIGHT', image: 'story-one' },
  { category: 'FIELD NOTES', title: 'Making space for the messy middle.', author: 'Nica Santos', date: 'CREATIVE PROCESS', image: 'story-two' },
  { category: 'KREW PICKS', title: 'Tools, references, and things worth sharing.', author: 'Paolo Reyes', date: 'THE CREATIVE TOOLKIT', image: 'story-three' },
]

function App() {
  const [page, setPage] = useState<Page>('Home')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [connected, setConnected] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const [customizing, setCustomizing] = useState(false)

  const go = (next: Page) => { setPage(next); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const navItems: { label: Page; icon: typeof Home }[] = [
    { label: 'Home', icon: Home }, { label: 'Discover', icon: Compass }, { label: 'Opportunities', icon: BriefcaseBusiness }, { label: 'Events', icon: CalendarDays }, { label: 'Stories', icon: Camera },
  ]
  const filteredMembers = members.filter(member => `${member.name} ${member.role} ${member.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase()))

  return <div className="app-shell kk-app">
    <header className="topbar kk-topbar">
      <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
      <button className="wordmark" onClick={() => go('Home')}>KREATOR<br/>KREW<span>®</span></button>
      <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
        {navItems.map(item => <button key={item.label} className={page === item.label ? 'nav-active' : ''} onClick={() => go(item.label)}>{item.label}</button>)}
      </nav>
      <div className="top-actions"><button aria-label="Search" onClick={() => go('Discover')}><Search size={19}/></button><button aria-label="Notifications" onClick={() => go('Home')}><Bell size={19}/><i/></button><button aria-label="Messages" onClick={() => go('My Krew Page')}><Mail size={19}/></button><button className="mini-avatar" onClick={() => go('My Krew Page')}>MF</button></div>
    </header>

    <main className="kk-main">
      {page === 'Home' && <>
        <section className="home-hero">
          <div className="hero-copy"><span className="eyebrow">A COMMUNITY FOR THE DIGITAL KREW</span><h1>FIND YOUR<br/><em>PEOPLE.</em></h1><p>A space for the people who make things happen. Meet creatives, share what you're making, find opportunities, and make your next move.</p><div className="hero-actions"><button className="primary-cta" onClick={() => go('Discover')}>EXPLORE THE KREW <ArrowUpRight size={16}/></button><button className="text-cta" onClick={() => go('My Krew Page')}>VIEW MY PAGE ↗</button></div></div>
          <div className="hero-art"><div className="hero-sticker sticker-orange">MAKE<br/>YOUR<br/>MOVE.</div><div className="hero-sticker sticker-outline">GOOD PEOPLE<br/>MAKE GOOD<br/>THINGS.</div><div className="hero-orbit">✳</div><div className="hero-caption">CREATORS. THINKERS. DOERS.<br/>ALL IN THE SAME KREW.</div></div>
        </section>
        <section className="home-intro"><div><span className="eyebrow">NOT JUST A NETWORK.</span><h2>GOOD PEOPLE.<br/><em>GOOD THINGS.</em></h2></div><p>Kreator Krew brings together designers, creators, marketers, makers, and digital professionals. Find people who get what you do — and discover what you can do together.</p></section>
        <section className="content-section"><div className="section-top"><div><span className="eyebrow">PEOPLE TO KNOW</span><h2>MEET THE KREW</h2></div><button className="inline-link" onClick={() => go('Discover')}>EXPLORE EVERYONE ↗</button></div><div className="member-grid">{members.slice(0,3).map(member => <MemberCard key={member.handle} member={member} connected={connected.includes(member.handle)} onConnect={() => setConnected(prev => prev.includes(member.handle) ? prev.filter(x => x !== member.handle) : [...prev, member.handle])}/>)}</div></section>
        <section className="home-feature-row"><div className="feature-block feature-opportunities"><span className="eyebrow">MAKE YOUR NEXT MOVE</span><h2>GOOD WORK<br/>IS OUT THERE.</h2><p>Discover projects, freelance gigs, and roles shared with the Krew.</p><button onClick={() => go('Opportunities')}>FIND OPPORTUNITIES ↗</button></div><div className="feature-block feature-events"><span className="eyebrow">GET OUT THERE</span><h2>LET'S MEET.<br/>LET'S MAKE.</h2><p>Join conversations, sessions, and meetups with people in your creative orbit.</p><button onClick={() => go('Events')}>SEE WHAT'S HAPPENING ↗</button></div></section>
        <section className="content-section"><div className="section-top"><div><span className="eyebrow">FROM AROUND THE KREW</span><h2>FRESH STORIES</h2></div><button className="inline-link" onClick={() => go('Stories')}>READ ALL STORIES ↗</button></div><div className="story-grid">{stories.map(story => <StoryCard key={story.title} story={story} onClick={() => go('Stories')}/>)}</div></section>
      </>}

      {page === 'Discover' && <PageHeader eyebrow="YOUR PEOPLE ARE HERE" title={<>EXPLORE THE<br/><em>KREW.</em></>} description="Find your next collaborator, creative partner, mentor, or just someone who gets it." />}
      {page === 'Discover' && <section className="directory-section"><div className="directory-tools"><div className="search-field"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search people, skills, or disciplines..."/></div><span>{filteredMembers.length} MEMBERS</span></div><div className="member-grid directory-grid">{filteredMembers.map(member => <MemberCard key={member.handle} member={member} connected={connected.includes(member.handle)} onConnect={() => setConnected(prev => prev.includes(member.handle) ? prev.filter(x => x !== member.handle) : [...prev, member.handle])}/>)}</div>{filteredMembers.length === 0 && <p className="empty-state">No members found. Try another name or skill.</p>}</section>}

      {page === 'Opportunities' && <><PageHeader eyebrow="MAKE YOUR NEXT MOVE" title={<>OPPORTUNITIES<br/><em>LIVE HERE.</em></>} description="A growing board of projects, freelance work, and roles worth checking out."/><section className="listing-section"><div className="directory-tools"><span>CURATED FOR THE KREW</span><span>{opportunities.length} LISTINGS</span></div>{opportunities.map(job => <article className="job-card" key={job.title}><div className="job-main"><span className="eyebrow">{job.type}{job.featured ? ' · KREW PICK' : ''}</span><h2>{job.title}</h2><p>{job.company} <span>·</span> {job.location}</p><div className="tag-row">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="job-side"><strong>{job.pay}</strong><div><button className="save-button" onClick={() => setSavedJobs(prev => prev.includes(job.title) ? prev.filter(x => x !== job.title) : [...prev, job.title])}><Bookmark size={16} fill={savedJobs.includes(job.title) ? 'currentColor' : 'none'}/>{savedJobs.includes(job.title) ? 'SAVED' : 'SAVE'}</button><button className="primary-cta small-cta" onClick={() => alert('This is a demo listing. Application links will be connected later.')}>VIEW DETAILS <ArrowUpRight size={15}/></button></div></div></article>)}</section></>}

      {page === 'Events' && <><PageHeader eyebrow="MEET. SHARE. MAKE." title={<>THINGS ARE<br/><em>HAPPENING.</em></>} description="Come through for conversations, creative sessions, and moments that bring the community together."/><section className="events-list">{events.map(event => <article className="event-card" key={event.title}><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div className="event-info"><span className="eyebrow">{event.kind}</span><h2>{event.title}</h2><p><MapPin size={14}/>{event.place}<span>·</span>{event.time}</p></div><button className="round-arrow" onClick={() => alert('Event details and registration will be available in a later phase.')}><ArrowUpRight/></button></article>)}</section></>}

      {page === 'Stories' && <><PageHeader eyebrow="IDEAS, PEOPLE & PROCESS" title={<>KREW<br/><em>STORIES.</em></>} description="A closer look at the people, ideas, experiments, and work moving our creative community forward."/><section className="story-grid story-grid-page">{stories.map(story => <StoryCard key={story.title} story={story} onClick={() => alert('Full story pages will be added in the next page-building phase.')}/>)}</section></>}

      {page === 'My Krew Page' && <><div className="page-toolbar"><div><span className="eyebrow">YOUR PERSONAL SPACE / KREW PAGE</span><h1>A little corner of the internet.</h1></div><button className="customize-button" onClick={() => setCustomizing(!customizing)}><Settings2 size={16}/>{customizing ? 'Close editor' : 'Customize page'}</button></div>{customizing && <div className="editor-placeholder"><Palette/><div><strong>Krew Page customization</strong><p>Theme selection, background uploads, layout controls, and template submissions will be built here next.</p></div></div>}<MemberProfile liked={liked} onLike={() => setLiked(!liked)} connected={connected.includes('@mfnavarro')} onConnect={() => setConnected(prev => prev.includes('@mfnavarro') ? prev.filter(x => x !== '@mfnavarro') : [...prev, '@mfnavarro'])}/></>}

      <footer className="kk-footer"><div className="footer-mark">KREATOR<br/>KREW<span>®</span></div><p>FIND YOUR PEOPLE.<br/>MAKE YOUR MOVE.</p><span>MADE FOR THE KREW · PHILIPPINES · © 2026</span></footer>
    </main>
    <div className="floating-hint"><Users size={15}/> FIND YOUR PEOPLE.</div>
  </div>
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="inner-page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>
}
function MemberCard({ member, connected, onConnect }: { member: typeof members[number]; connected: boolean; onConnect: () => void }) {
  return <article className="directory-card"><div className="member-avatar" style={{ background: member.color }}>{member.initials}</div><span className="member-location"><MapPin size={12}/>{member.location}</span><h3>{member.name}</h3><p>{member.role}</p><div className="tag-row">{member.skills.map(skill => <span key={skill}>{skill}</span>)}</div><button className={connected ? 'connected-button' : 'connect-card-button'} onClick={onConnect}>{connected ? '✓ CONNECTED' : '+ CONNECT'}</button></article>
}
function StoryCard({ story, onClick }: { story: typeof stories[number]; onClick: () => void }) {
  return <button className="story-card" onClick={onClick}><div className={`story-visual ${story.image}`}><span>KK / JOURNAL</span><strong>{story.category}</strong><i>✳</i></div><div className="story-meta"><span>{story.date}</span><span>{story.author}</span></div><h3>{story.title}</h3><span className="story-read">READ STORY ↗</span></button>
}
function MemberProfile({ liked, onLike, connected, onConnect }: { liked: boolean; onLike: () => void; connected: boolean; onConnect: () => void }) {
  return <div className="member-page layout-editorial" style={{'--page-bg':'#f1ede5','--page-ink':'#17191c','--page-accent':'#f36b21','--card-bg':'#fffdf8','--page-muted':'#68645e'} as React.CSSProperties}><aside className="profile-column"><div className="profile-card texture-paper"><div className="card-topline"><span className="kk-stamp">KK<span>®</span></span><span className="member-label">KREATOR KREW<br/>MEMBER</span></div><div className="portrait-wrap"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90" alt="Member portrait"/><span className="portrait-mark">✳</span></div><div className="profile-name-row"><div><h2>MF NAVARRO</h2><a className="handle" href="#profile">@mfnavarro</a></div><button className={`heart-button ${liked ? 'liked' : ''}`} onClick={onLike} aria-label="Appreciate profile"><Heart size={19} fill={liked ? 'currentColor' : 'none'}/></button></div><div className="profile-meta"><span><BriefcaseBusiness size={15}/> Multimedia Designer</span><span><MapPin size={15}/> Philippines</span></div><p className="profile-bio">Designing brands, visuals, and digital experiences. Into motion, storytelling, and building creative ideas with the right people.</p><div className="skill-list"><span>Design</span><span>Motion</span><span>Branding</span><span>Video</span><span>Illustration</span></div><div className="profile-stats"><div><strong>128</strong><small>Connections</small></div><div><strong>24</strong><small>Projects</small></div><div><strong>08</strong><small>Testimonials</small></div></div><div className="profile-buttons"><button className="connect-button" onClick={onConnect}>{connected ? '✓ Connected' : '+ Connect'}</button><button className="message-button"><MessageCircle size={16}/> Message</button></div><div className="card-footer"><span>MEMBER SINCE 2026</span><span>MANILA, PH</span></div></div></aside><section className="personal-space"><div className="welcome-block"><div className="welcome-copy"><span className="eyebrow">THIS IS MY SPACE</span><h2>WELCOME TO<br/><em>MY KREW PAGE.</em></h2><div className="scribble-line"/><h3>A LITTLE ABOUT ME</h3><p>A multimedia designer who enjoys turning ideas into visuals, motion, and campaigns. I collaborate with brands and teams to create work that looks good, works well, and connects with people.</p></div><div className="camera-art"><Camera size={86}/><span>COLLECT<br/>MOMENTS</span></div></div><section className="work-section"><div className="section-heading"><div><span className="eyebrow">A FEW THINGS I'VE MADE</span><h3>SELECTED WORKS</h3></div><a href="#work">VIEW ALL PROJECTS ↗</a></div><div className="project-grid">{[{title:'UTG Kape',type:'Brand identity · Art direction',image:'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85'},{title:'Objects & Form',type:'Visual identity · Packaging',image:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85'},{title:'Daily Practice',type:'Campaign · Creative direction',image:'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85'}].map((project,i)=><article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={project.title}/><span>0{i+1}</span></div><h4>{project.title}</h4><p>{project.type}</p></article>)}</div></section><div className="bottom-grid"><section className="interests-section"><span className="eyebrow">CURRENTLY INTO</span><h3>THINGS ON MY RADAR</h3><ul><li>✓ Brand & visual identity</li><li>✓ Motion graphics</li><li>✓ Creative tools & AI workflows</li><li>✓ Small creative experiments</li></ul></section><section className="collab-card"><span className="eyebrow">OPEN TO GOOD IDEAS</span><h3>LET'S<br/>COLLAB!</h3><p>Open to creative projects, collaborations, and interesting ideas.</p><a href="mailto:hello@kreatorkrew.com">GET IN TOUCH ↗</a></section></div></section></div>
}

export default App
