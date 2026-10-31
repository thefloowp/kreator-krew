import { useState } from 'react'
import { Bell, BriefcaseBusiness, CalendarDays, Compass, Heart, Home, Mail, MapPin, MessageCircle, Search, Users, ArrowUpRight, Bookmark, Menu, X, Camera, Palette, Settings2, Plus, Image as ImageIcon, Smile, Send, MoreHorizontal, MessageSquare, Share2, TrendingUp, UsersRound, CalendarClock, Hash, Sparkles } from 'lucide-react'

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
      {page === 'Home' && <HomeFeed onNavigate={go} />}

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


function HomeFeed({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([
    { id: 1, name: 'Nica Santos', handle: '@nicasantos', role: 'Brand Strategist', initials: 'NS', color: '#c17c9a', time: '24 min ago', text: 'Been collecting little observations about Filipino neighborhood brands lately. The best identities are not always the loudest ones — sometimes it is the tiny details people remember. What local brand has stayed with you?', tags: ['Brand Strategy', 'Local Finds'], likes: 28, comments: 6, liked: false, kind: 'DISCUSSION' },
    { id: 2, name: 'Paolo Reyes', handle: '@paoloreyes', role: 'Photographer & Filmmaker', initials: 'PR', color: '#8b9d72', time: '1 hr ago', text: 'A small reminder from today’s shoot: make room for happy accidents. The frame you did not plan might become the one you keep.', tags: ['Photography', 'Process'], likes: 42, comments: 9, liked: false, kind: 'FIELD NOTE' },
    { id: 3, name: 'Jules Garcia', handle: '@julescreates', role: 'Illustrator', initials: 'JG', color: '#7888bd', time: '3 hrs ago', text: 'Looking for a motion designer to collaborate on a short illustration loop for an independent music project. Paid project, flexible timeline. Drop a comment or message me if you want the brief.', tags: ['Collaboration', 'Illustration'], likes: 17, comments: 4, liked: false, kind: 'COLLAB CALL' },
  ])
  const [activeComments, setActiveComments] = useState<number | null>(null)
  const [commentText, setCommentText] = useState('')
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  const publishPost = () => {
    if (!postText.trim()) return
    setPosts([{ id: Date.now(), name: 'MF Navarro', handle: '@mfnavarro', role: 'Multimedia Designer', initials: 'MF', color: '#f36b21', time: 'Just now', text: postText.trim(), tags: ['Krew Update'], likes: 0, comments: 0, liked: false, kind: 'YOUR POST' }, ...posts])
    setPostText('')
  }
  const toggleLike = (id: number) => setPosts(current => current.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post))
  const addComment = (id: number) => {
    if (!commentText.trim()) return
    setPosts(current => current.map(post => post.id === id ? { ...post, comments: post.comments + 1 } : post))
    setCommentText('')
    setActiveComments(null)
  }

  return <div className="home-dashboard">
    <div className="home-welcome-strip">
      <div><span className="eyebrow">SATURDAY, OCTOBER 31, 2026 · YOUR KREW SPACE</span><h1>Good afternoon, MF. <span>✳</span></h1><p>Your people are making things happen. Here's what's moving around the Krew.</p></div>
      <button className="welcome-profile-link" onClick={() => onNavigate('My Krew Page')}>VIEW YOUR KREW PAGE <ArrowUpRight size={15}/></button>
    </div>

    <div className="home-dashboard-grid">
      <aside className="home-left-rail">
        <div className="rail-profile-card">
          <div className="rail-cover"></div><div className="rail-avatar">MF</div>
          <strong>MF Navarro</strong><span>@mfnavarro</span><small>Multimedia Designer · Parañaque</small>
          <div className="rail-stats"><div><b>128</b><small>Connections</small></div><div><b>24</b><small>Projects</small></div></div>
          <button onClick={() => onNavigate('My Krew Page')}>EDIT YOUR PAGE <ArrowUpRight size={13}/></button>
        </div>
        <nav className="home-side-nav">
          <span className="eyebrow">YOUR KREW</span>
          <button className="side-active"><Home size={17}/> Feed <span>●</span></button>
          <button onClick={() => onNavigate('Discover')}><UsersRound size={17}/> Connections</button>
          <button onClick={() => onNavigate('Discover')}><Compass size={17}/> Discover people</button>
          <button onClick={() => onNavigate('Opportunities')}><BriefcaseBusiness size={17}/> Opportunities</button>
          <button onClick={() => onNavigate('Events')}><CalendarDays size={17}/> Events</button>
          <button onClick={() => onNavigate('Stories')}><Camera size={17}/> Krew Stories</button>
        </nav>
        <div className="rail-tags"><span className="eyebrow">YOUR INTERESTS</span><div><span>#Branding</span><span>#Motion</span><span>#Design</span><span>#CreativeLife</span></div><button onClick={() => onNavigate('My Krew Page')}>MANAGE INTERESTS ↗</button></div>
      </aside>

      <section className="home-feed-column">
        <div className="feed-intro"><div><span className="eyebrow">THE COMMUNITY PULSE</span><h2>Your Krew Feed</h2></div><button className="feed-filter">For you <span>⌄</span></button></div>

        <div className="krew-stories">
          <div className="stories-heading"><strong>KREW MOMENTS</strong><button onClick={() => onNavigate('Stories')}>SEE ALL ↗</button></div>
          <div className="stories-bubbles">
            <button className="story-bubble add-story" onClick={() => alert('Story creation will be connected in a later phase.')}><span><Plus size={21}/></span><small>Add yours</small></button>
            {members.map((member, index) => <button className="story-bubble" key={member.handle} onClick={() => onNavigate('Discover')}><span style={{background: member.color}}>{member.initials}</span><small>{member.name.split(' ')[0]}</small><i>{index === 0 ? 'NEW' : ''}</i></button>)}
          </div>
        </div>

        <div className="post-composer">
          <div className="composer-top"><div className="composer-avatar">MF</div><textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="What's happening in your creative world? Share an idea, a win, a question..." rows={2}/></div>
          <div className="composer-bottom"><div><button onClick={() => alert('Photo uploads will be connected when storage is added.')}><ImageIcon size={16}/> Photo / Work</button><button onClick={() => alert('Tagging will be available in a later phase.')}><Hash size={16}/> Topic</button><button onClick={() => alert('Mood and activity options are coming soon.')}><Smile size={16}/> Feeling</button></div><button className="publish-button" disabled={!postText.trim()} onClick={publishPost}>POST TO KREW <Send size={14}/></button></div>
        </div>

        <div className="feed-sort-row"><span><Sparkles size={14}/> LATEST FROM YOUR NETWORK</span><button>Latest <span>⌄</span></button></div>
        <div className="feed-post-list">
          {posts.map(post => <article className="feed-post" key={post.id}>
            <div className="post-head"><div className="post-avatar" style={{background:post.color}}>{post.initials}</div><div className="post-author"><strong>{post.name}</strong><span>{post.role} · {post.time}</span></div><button className="post-more" aria-label="More post options"><MoreHorizontal size={20}/></button></div>
            <div className="post-kind">{post.kind}</div>
            <p className="post-copy">{post.text}</p>
            <div className="post-tags">{post.tags.map(tag => <span key={tag}>#{tag.replaceAll(' ', '')}</span>)}</div>
            <div className="post-engagement"><span>{post.likes} appreciations</span><span>{post.comments} comments</span></div>
            <div className="post-actions"><button className={post.liked ? 'post-liked' : ''} onClick={() => toggleLike(post.id)}><Heart size={17} fill={post.liked ? 'currentColor' : 'none'}/> Appreciate</button><button onClick={() => setActiveComments(activeComments === post.id ? null : post.id)}><MessageSquare size={17}/> Comment</button><button onClick={() => alert('Sharing will be available when public post links are implemented.')}><Share2 size={17}/> Share</button><button className={savedPosts.includes(post.id) ? 'post-liked' : ''} onClick={() => setSavedPosts(current => current.includes(post.id) ? current.filter(id => id !== post.id) : [...current, post.id])}><Bookmark size={17} fill={savedPosts.includes(post.id) ? 'currentColor' : 'none'}/></button></div>
            {activeComments === post.id && <div className="comment-composer"><input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add something thoughtful..."/><button onClick={() => addComment(post.id)} disabled={!commentText.trim()}><Send size={15}/></button></div>}
          </article>)}
        </div>
        <button className="load-more-posts" onClick={() => alert('You are all caught up in this demo feed.')}>YOU'RE ALL CAUGHT UP</button>
      </section>

      <aside className="home-right-rail">
        <div className="right-widget krew-prompt"><span className="eyebrow">A LITTLE NUDGE</span><h3>Good things happen when you show up.</h3><p>Share what you're working on or give someone else's work a little love.</p><button onClick={() => document.querySelector('.post-composer textarea')?.scrollIntoView({behavior:'smooth',block:'center'})}>START A CONVERSATION ↗</button></div>
        <div className="right-widget"><div className="widget-heading"><strong>PEOPLE YOU MAY KNOW</strong><button onClick={() => onNavigate('Discover')}>SEE ALL</button></div>{members.slice(1,4).map(member => <div className="suggested-person" key={member.handle}><span style={{background:member.color}}>{member.initials}</span><div><b>{member.name}</b><small>{member.role}</small></div><button onClick={() => onNavigate('Discover')}><Plus size={15}/></button></div>)}</div>
        <div className="right-widget"><div className="widget-heading"><strong>COMING UP</strong><button onClick={() => onNavigate('Events')}>CALENDAR ↗</button></div><div className="mini-event"><span><b>08</b>NOV</span><div><strong>Krew Meetup: Make New Things</strong><small>Makati City · 3:00 PM</small></div></div><div className="mini-event"><span><b>15</b>NOV</span><div><strong>Creative Work, Real Talk</strong><small>Online · 7:00 PM</small></div></div></div>
        <div className="right-widget trending-widget"><div className="widget-heading"><strong>BUZZING IN THE KREW</strong><TrendingUp size={16}/></div>{['#CreativeProcess','#FilipinoDesign','#OpenForWork','#MotionDesign'].map((tag,i)=><button key={tag} onClick={() => onNavigate('Discover')}><Hash size={14}/><span><b>{tag}</b><small>{[28,19,14,11][i]} conversations</small></span></button>)}</div>
        <div className="right-rail-footer">ABOUT KREATOR KREW · COMMUNITY GUIDELINES · PRIVACY<br/>MADE FOR THE KREW. PHILIPPINES. © 2026</div>
      </aside>
    </div>
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
