import { useState } from 'react'
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa'
import { cn } from '../../lib/utils'

const DEFAULT_MEMBERS = [
  { id: '1', name: 'Chadrack', role: 'director of photography', image: 'https://i.pravatar.cc/400?img=32', social: { twitter: '#', linkedin: '#', behance: '#' } },
  { id: '2', name: 'Mak VieSAinte', role: 'FOUNDER', image: 'https://i.pravatar.cc/400?img=47', social: { twitter: '#', linkedin: '#' } },
  { id: '3', name: 'Osiris Balonga', role: 'LEAD FRONT-END', image: 'https://i.pravatar.cc/400?img=53', social: { twitter: '#', linkedin: '#' } },
  { id: '4', name: 'Jacques', role: 'PRODUCT OWNER', image: 'https://i.pravatar.cc/400?img=68', social: { linkedin: '#' } },
  { id: '5', name: 'Riche Makso', role: 'CTO - PRODUCT DESIGNER', image: 'https://i.pravatar.cc/400?img=59', social: { twitter: '#', linkedin: '#' } },
  { id: '6', name: 'Jemima', role: 'MAKE-UP ARTISTE', image: 'https://i.pravatar.cc/400?img=16', social: { instagram: '#' } },
]

export default function TeamShowcase({ members = DEFAULT_MEMBERS }) {
  const [hoveredId, setHoveredId] = useState(null)

  const col1 = members.filter((_, i) => i % 3 === 0)
  const col2 = members.filter((_, i) => i % 3 === 1)
  const col3 = members.filter((_, i) => i % 3 === 2)

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-7xl mx-auto py-8 px-4 md:px-6 font-sans">
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map(m => <PhotoCard key={m.id} member={m} className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]" hoveredId={hoveredId} onHover={setHoveredId} />)}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map(m => <PhotoCard key={m.id} member={m} className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]" hoveredId={hoveredId} onHover={setHoveredId} />)}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map(m => <PhotoCard key={m.id} member={m} className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]" hoveredId={hoveredId} onHover={setHoveredId} />)}
        </div>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {members.map(m => <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} />)}
      </div>
    </div>
  )
}

function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive
  return (
    <div className={cn('overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400', className, isDimmed ? 'opacity-60' : 'opacity-100')}
      onMouseEnter={() => onHover(member.id)} onMouseLeave={() => onHover(null)}>
      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-[filter] duration-500"
        style={{ filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)' }}/>
    </div>
  )
}

function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance
  return (
    <div className={cn('cursor-pointer transition-opacity duration-300', isDimmed ? 'opacity-50' : 'opacity-100')}
      onMouseEnter={() => onHover(member.id)} onMouseLeave={() => onHover(null)}>
      <div className="flex items-center gap-2.5">
        <span className={cn('w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300', isActive ? 'bg-navy dark:bg-cream-300 w-5' : 'bg-navy/25 dark:bg-cream-300/25')} />
        <span className={cn('text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300', isActive ? 'text-navy dark:text-cream' : 'text-navy/80 dark:text-cream/80')}>{member.name}</span>
        {hasSocial && <div className={cn('flex items-center gap-1.5 ml-0.5 transition-all duration-200', isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none')}>
          {member.social?.twitter && <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1 rounded text-navy/40 dark:text-cream-400/60 hover:text-navy dark:hover:text-cream hover:bg-navy/10 dark:hover:bg-cream-300/10 transition-all duration-150 hover:scale-110"><FaTwitter size={10}/></a>}
          {member.social?.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1 rounded text-navy/40 dark:text-cream-400/60 hover:text-navy dark:hover:text-cream hover:bg-navy/10 dark:hover:bg-cream-300/10 transition-all duration-150 hover:scale-110"><FaLinkedinIn size={10}/></a>}
          {member.social?.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1 rounded text-navy/40 dark:text-cream-400/60 hover:text-navy dark:hover:text-cream hover:bg-navy/10 dark:hover:bg-cream-300/10 transition-all duration-150 hover:scale-110"><FaInstagram size={10}/></a>}
          {member.social?.behance && <a href={member.social.behance} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1 rounded text-navy/40 dark:text-cream-400/60 hover:text-navy dark:hover:text-cream hover:bg-navy/10 dark:hover:bg-cream-300/10 transition-all duration-150 hover:scale-110"><FaBehance size={10}/></a>}
        </div>}
      </div>
      <p className="mt-1.5 pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-navy/40 dark:text-cream-400/60">{member.role}</p>
    </div>
  )
}