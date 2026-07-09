'use client';

import { useState } from 'react';
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { FluidNav } from "@/components/ui/FluidNav";
import { FadeUp } from "@/components/ui/FadeUp";
import { ProTextType } from "@/components/ui/ProTextType";
import { CharacterAvatar } from "@/components/ui/CharacterAvatar";
import { VinylCard } from "@/components/ui/VinylCard";
import { VolumetricStudio } from "@/components/ui/volumetric-studio";
import { MediaEmbedModal } from "@/components/ui/MediaEmbedModal";
import { TvShowCard } from "@/components/ui/TvShowCard";
import { InteractiveBook } from "@/components/ui/InteractiveBook";
import { MusicCarousel } from "@/components/ui/MusicCarousel";
import { FilmStrip } from "@/components/ui/FilmStrip";
import { FortuneCookie } from "@/components/ui/FortuneCookie";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Mesh Gradient (Ethereal Glass) */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-60 mix-blend-screen">
        <div className="absolute h-[800px] w-[800px] rounded-full bg-fuchsia-600/30 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <FluidNav />

      {/* Top Left Avatar Logo */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
        <CharacterAvatar />
      </div>

      {/* Hero Section */}
      <VolumetricStudio className="!min-h-[100dvh]" spots={[32, 68]} fixtureSpots={[32, 68]} isReady={isLoaded}>
        <div className="relative z-10 flex h-full flex-col px-4 md:px-12 lg:px-24 pointer-events-none pt-[25vh] md:pt-[25vh] lg:pt-[30vh]">
          <div className="mx-auto max-w-7xl w-full">
            <FadeUp isReady={isLoaded}>
              <div className="mb-6 inline-flex shimmer-border rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
                <span className="shimmer-text">
                  <ProTextType text="Brand & Marketing Strategist" />
                </span>
              </div>
            </FadeUp>
            <div className="mb-2">
              <h1 className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-[linear-gradient(180deg,white,rgba(255,255,255,0.4))] drop-shadow-2xl pb-4">
                Jinali Mehta.
              </h1>
            </div>
            
            <FadeUp delay={0.2} isReady={isLoaded}>
              <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-white/60 md:text-2xl drop-shadow-md text-balance">
                I don't just broker partnerships. I look for the overlap between culture, timing, and a creator's actual voice, and then build the strategy around it.
              </p>
            </FadeUp>



          </div>
        </div>
      </VolumetricStudio>

      {/* Metrics Section */}
      <section className="relative z-10 w-full bg-[#050505] pt-0 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-y border-white/10">
            {[
              { value: "250+", label: "Brand partnerships" },
              { value: "50+", label: "IPs pitched & developed" },
              { value: "4+", label: "Years in talent & brand" },
              { value: "2×", label: "Brand growth" }
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col gap-4 py-12 ${i % 2 !== 0 ? 'border-l border-white/10 pl-6 md:pl-8' : 'pr-6 md:pr-0 md:border-l md:border-white/10 md:pl-8'} ${i === 0 ? 'md:border-l-0 md:pl-0' : ''}`}>
                <FadeUp delay={i * 0.1}>
                  <span className="font-serif text-5xl md:text-7xl text-transparent bg-clip-text bg-[linear-gradient(180deg,white,rgba(255,255,255,0.4))] drop-shadow-lg">{stat.value}</span>
                </FadeUp>
                <FadeUp delay={0.1 + (i * 0.1)}>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">{stat.label}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative items-start">
          {/* Left Column - Sticky Typography */}
          <div className="md:col-span-5 md:sticky md:top-32">
            <FadeUp>
              <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 uppercase">
                <ProTextType text="Trajectory" />
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight pb-2">Work<br/>Experience.</h2>
            </FadeUp>
          </div>

          {/* Right Column - Flowing Cards */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {[
              { company: "One Hand Clap", role: "Associate Brand Solutions Lead", period: "Jan 2026 to Present" },
              { company: "REPRESENT", role: "Manager, Brand Solutions", period: "Nov 2023 to Dec 2025" },
              { company: "Monk Entertainment", role: "Talent Manager", period: "Mar 2022 to Oct 2023" }
            ].map((job, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group cursor-default">
                  <DoubleBezel className="w-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:scale-[1.02]" innerClassName="flex flex-col gap-6 !p-8 md:!p-10 transition-colors duration-700 group-hover:bg-[#0f0f0f]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                      <h3 className="font-serif text-3xl text-white">{job.company}</h3>
                      <div className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {job.period}
                      </div>
                    </div>
                    <div>
                      <p className="text-xl text-white/80 font-light">{job.role}</p>
                    </div>
                  </DoubleBezel>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Menu Showcase */}
      <section id="work" className="relative z-10 w-full bg-[#050505] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-12 lg:px-24 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
           <FadeUp>
             <div className="mb-6 inline-flex shimmer-border rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
               <span className="shimmer-text">Visuals</span>
             </div>
             <h2 className="font-serif text-5xl md:text-7xl mb-6 pb-2 text-transparent bg-clip-text bg-[linear-gradient(180deg,white,rgba(255,255,255,0.6))]">Moments & Campaigns.</h2>
           </FadeUp>
           <FadeUp delay={0.2}>
             <p className="text-lg text-white/60 text-balance">
               From integrated campaigns to IP development and music marketing. Each card includes real content from the campaigns that moved culture forward.
             </p>
           </FadeUp>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-12 lg:px-24">
          <div className="w-full h-[500px] md:h-[700px] relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]">
            <MediaEmbedModal items={[
              { title: "Bumble Campaign", image: "/campaigns/thumb_0.jpg", link: "https://www.instagram.com/reel/DU-vpS5kxQr/", description: "View Campaign Details" },
              { title: "Swiggy Valentine's", image: "/campaigns/thumb_1.jpg", link: "https://www.instagram.com/reel/DUk7vjuEtq5/", description: "View Campaign Details" },
              { title: "Swiggy Mummy Ki Maar", image: "/campaigns/thumb_2.jpg", link: "https://www.instagram.com/reel/DYFMkZ2sdA3/", description: "View Campaign Details" },
              { title: "BGMI Cricket League", image: "/campaigns/thumb_3.jpg", link: "https://www.instagram.com/reel/DWil3XAlFcn/", description: "View Campaign Details" },
              { title: "Clinique India", image: "/campaigns/thumb_4.jpg", link: "https://www.instagram.com/reel/DItWOxQzia0/", description: "View Campaign Details" },
              { title: "Mercedes Benz x Aashna", image: "/campaigns/thumb_5.jpg", link: "https://www.instagram.com/reel/DGDMFukt519/", description: "View Campaign Details" },
              { title: "Label Ritu Kumar x Lisa", image: "/campaigns/thumb_6.jpg", link: "https://www.instagram.com/reel/DJPFWzVPeUG/", description: "View Campaign Details" },
              { title: "Casa Bacardi x Lisa", image: "/campaigns/thumb_7.jpg", link: "https://www.instagram.com/reel/DE2YdeViksL/", description: "View Campaign Details" },
              { title: "H&M x Nykaa", image: "/campaigns/thumb_8.jpg", link: "https://www.instagram.com/reel/DRBuNo0iPRl/", description: "View Campaign Details" },
              { title: "Love Beauty & Planet", image: "/campaigns/thumb_9.jpg", link: "https://www.instagram.com/p/DW-zvaBIx9t/", description: "View Campaign Details" },
              { title: "Noise x Anuv Jain", image: "/campaigns/thumb_10.jpg", link: "https://www.instagram.com/reel/C3Hk98ivmFL/", description: "View Campaign Details" },
              { title: "India vs Pakistan", image: "/campaigns/thumb_11.jpg", link: "https://www.instagram.com/p/C8CWHjVMl2w/", description: "View Campaign Details" },
              { title: "Coach x Aryaki Joon", image: "/campaigns/thumb_12.jpg", link: "https://www.instagram.com/reel/Cs6NRcjBUBA", description: "View Campaign Details" },
              { title: "Dinner Party Pod", image: "/campaigns/thumb_13.jpeg", link: "https://www.youtube.com/@DinnerPartyPod", description: "View Campaign Details" },
              { title: "Mars x Aashna Hegde", image: "/campaigns/thumb_14.jpg", link: "https://www.instagram.com/p/DNawzkpyB95/", description: "View Campaign Details" },
              { title: "Clinique x Aashna Hegde", image: "/campaigns/thumb_15.jpg", link: "https://www.instagram.com/p/DBnnQSpSX4i/", description: "View Campaign Details" },
              { title: "Zara x Armaan Malik", image: "/campaigns/thumb_16.jpg", link: "https://www.instagram.com/p/DDe9YhbyIgn/", description: "View Campaign Details" },
              { title: "Myntra FWD x Leisha", image: "/campaigns/thumb_17.jpg", link: "https://www.instagram.com/p/CvhkTrjgfHd/", description: "View Campaign Details" },
              { title: "Koffee With Karan", image: "/campaigns/thumb_18.jpg", link: "https://www.instagram.com/p/CihykNpvTrD/", description: "View Campaign Details" },
            ]} />
          </div>
        </div>
      </section>

      {/* Beyond the Brief (Asymmetrical Bento) */}
      <section id="beyond" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-12 lg:px-24">
        <div className="mb-16 max-w-2xl">
          <FadeUp>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 uppercase">
              <ProTextType text="Beyond The Brief" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-5xl md:text-7xl text-balance pb-2">
              The person behind the work.
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          <FadeUp className="md:col-span-2 md:row-span-2 min-w-0">
            <DoubleBezel className="h-full w-full" innerClassName="flex flex-col justify-between !p-6 sm:!p-10 overflow-hidden w-full">
              <div>
                <h3 className="font-serif text-4xl mb-6">On Repeat.</h3>
                <p className="text-xl font-light text-white/70 mb-8 max-w-xl text-balance">
                  Music is my second language. My playlist is just as scattered as my campaign decks, but it shapes how I think about timing and emotion. That's what great marketing runs on anyway.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Indie', 'Bollywood', 'Pop', 'Chillhop', 'Punjabi'].map(genre => (
                    <span key={genre} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full relative mt-8 flex justify-center scale-75 sm:scale-100 origin-top h-[350px] sm:h-auto overflow-visible">
                <MusicCarousel 
                  cardWidth={260} 
                  className="w-full"
                  tracks={[
                    {
                      id: "1",
                      title: "Mirrors",
                      artist: "Justin Timberlake",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/53/74/c9/5374c99e-cff1-61a6-ca0f-fa1219d050a0/886443854406.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/4rHZZAmHpZrA3iH5zx8frV?si=ufWiZGxVToiPyBNBp566VQ&utm_source=copy-link"
                    },
                    {
                      id: "2",
                      title: "You're U tho",
                      artist: "Karan Aujla",
                      coverImage: "https://i.scdn.co/image/ab67616d0000b27389e8f71cb6f3b6cc60944858",
                      songLink: "https://open.spotify.com/track/7E4EhLK8mG4ORi3QR52r2A?si=JiOhd0N2R56XgOPaBGrjmQ&utm_source=copy-link"
                    },
                    {
                      id: "3",
                      title: "She will be loved",
                      artist: "Maroon 5",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d0/3e/25/d03e255d-e205-0e66-20f6-01e251896c25/14UMGIM27076.rgb.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/7sapKrjDij2fpDVj0GxP66?si=CEFtp6UsRi-BEDseviCQWw&utm_source=copy-link"
                    },
                    {
                      id: "4",
                      title: "One Thing",
                      artist: "One Direction",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c3/d4/76/c3d4765f-006e-c9ac-6b83-50ae04894eff/dj.dqbxwvpe.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/5G2c6FsfTzgYUzageCmfXY?si=XfcQgkU8Tsqq7I0vPb-xTw&utm_source=copy-link"
                    },
                    {
                      id: "5",
                      title: "Late Night Talking",
                      artist: "Harry Styles",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/1qEmFfgcLObUfQm0j1W2CK?si=wc0wUEkyRgmu93KbyYWvog&utm_source=copy-link"
                    },
                    {
                      id: "6",
                      title: "Khat",
                      artist: "Navjot Ahuja",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ea/01/29/ea012994-51e8-6883-e1e1-c71fdd51754f/5026854264479.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/3gixnmepHSsyAuho34rprN?si=2S90CknWR6OM9oNkKhb1Qg&utm_source=copy-link"
                    },
                    {
                      id: "7",
                      title: "Heart of Gold",
                      artist: "Shawn Mendes",
                      coverImage: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/96/07/3b/96073b55-8e58-ef6e-6e81-2d751ac83ed8/24UMGIM83490.rgb.jpg/600x600bb.jpg",
                      songLink: "https://open.spotify.com/track/69YhwaZE5OTsijIt3Gp6P2?si=uFtnkc4rR9e1goG_8Ak44A&utm_source=copy-link"
                    }
                  ]}
                />
              </div>
            </DoubleBezel>
          </FadeUp>

          <FadeUp delay={0.1} className="md:col-span-1 md:row-span-1 h-full min-w-0">
            <div className="h-full w-full flex items-center justify-center p-2 sm:p-4 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <InteractiveBook pages={[
                <div key="cover" className="w-full h-full bg-[#111] relative flex flex-col justify-between cursor-pointer group hover:bg-[#151515] transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=400&auto=format&fit=crop" alt="Leather Texture" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                  <div className="relative z-10 border border-white/20 m-3 p-3 h-[calc(100%-24px)] flex flex-col justify-between text-center">
                    <span className="font-mono text-[8px] tracking-widest text-white/60 uppercase">Reading List</span>
                    <div className="py-4 border-y border-white/10 my-auto bg-black/20 backdrop-blur-sm">
                      <h4 className="font-serif text-xl text-white drop-shadow-md">On the<br/>Shelf.</h4>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Jinali Mehta</span>
                  </div>
                </div>,
                <div key="p1" className="w-full h-full bg-[#EAE8E3] relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] pointer-events-none mix-blend-multiply" />
                  <span className="font-serif text-black/10 text-5xl italic font-light">JM</span>
                </div>,
                <div key="p2" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-end p-4 text-left">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" alt="Magic" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="relative z-10">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block">01 / J.K. Rowling</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight">Harry Potter<br/>& The Order of the Phoenix</h5>
                  </div>
                </div>,
                <div key="p3" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-start p-4 text-left shadow-[-10px_0_20px_rgba(0,0,0,0.5)] border-l border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=400&auto=format&fit=crop" alt="Sun" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay sepia-[.3]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
                  <div className="relative z-10 mt-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block text-right">Khalid Hosseini / 02</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight text-right">A Thousand<br/>Splendid Suns</h5>
                  </div>
                </div>,
                <div key="p4" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-end p-4 text-left">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1505635552518-3448ff116af3?q=80&w=400&auto=format&fit=crop" alt="Thriller" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-hard-light grayscale-[0.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="relative z-10">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block">03 / Freida McFadden</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight">The Inmate</h5>
                  </div>
                </div>,
                <div key="p5" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-start p-4 text-left shadow-[-10px_0_20px_rgba(0,0,0,0.5)] border-l border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1518671644344-9343ee0f913e?q=80&w=400&auto=format&fit=crop" alt="Tehran" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay sepia-[.3]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
                  <div className="relative z-10 mt-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block text-right">Marjan Kamali / 04</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight text-right">The Stationery Shop<br/>of Tehran</h5>
                  </div>
                </div>,
                <div key="p6" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-end p-4 text-left">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1496053421526-728b7891ea6b?q=80&w=400&auto=format&fit=crop" alt="Prison" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-hard-light grayscale-[0.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="relative z-10">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block">05 / Jeffrey Archer</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight">Prisoner of Birth</h5>
                  </div>
                </div>,
                <div key="p7" className="w-full h-full bg-[#1A1A1A] relative overflow-hidden flex flex-col justify-start p-4 text-left shadow-[-10px_0_20px_rgba(0,0,0,0.5)] border-l border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1518709766631-90aace71c667?q=80&w=400&auto=format&fit=crop" alt="Myth" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay sepia-[.3]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
                  <div className="relative z-10 mt-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 mb-2 block text-right">Rick Riordan / 06</span>
                    <h5 className="font-serif text-sm text-white mb-1 leading-tight text-right">Percy Jackson &<br/>The Titan's Curse</h5>
                  </div>
                </div>,
                <div key="p8" className="w-full h-full bg-[#EAE8E3] relative flex flex-col justify-center items-center text-center p-6 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] border-l border-black/5">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] pointer-events-none mix-blend-multiply" />
                  <div className="w-4 h-[1px] bg-black/20 mb-4" />
                  <h5 className="font-serif text-[11px] text-black/80 leading-relaxed italic relative z-10">
                    "All of it ends up in my campaigns somehow."
                  </h5>
                  <div className="w-4 h-[1px] bg-black/20 mt-4" />
                </div>,
                <div key="p9" className="w-full h-full bg-[#EAE8E3] relative">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] pointer-events-none mix-blend-multiply" />
                </div>,
                <div key="inside-back" className="w-full h-full bg-[#EAE8E3] relative shadow-[-10px_0_20px_rgba(0,0,0,0.05)] border-l border-black/5">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] pointer-events-none mix-blend-multiply" />
                </div>,
                <div key="outside-back" className="w-full h-full bg-[#111] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=400&auto=format&fit=crop" alt="Leather Texture" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center relative z-10 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                     <span className="font-serif text-white/50 text-[10px]">JM</span>
                   </div>
                </div>
              ]} />
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="md:col-span-1 md:row-span-1 h-full">
            <TvShowCard className="h-full" />
          </FadeUp>

        </div>
      </section>

      {/* Beliefs & Contact */}
      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-24">
          
          <div>
            <FadeUp>
              <h2 className="font-serif text-5xl mb-12 pb-2">What I Believe.</h2>
            </FadeUp>
            <div className="space-y-12">
              {[
                { title: "Strategy first", desc: "Ideas without structure are just vibes. I plan everything backwards from the outcome." },
                { title: "Cultural honesty", desc: "Forcing a brand into a trend it doesn't belong in is the fastest way to lose credibility." },
                { title: "Creator respect", desc: "The best partnerships happen when brands give creators room to be themselves." },
                { title: "Attention to detail", desc: "The small things, the tone of a brief, the timing of a post, are what separate good from great." }
              ].map((belief, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <h4 className="text-xl font-medium mb-3">{belief.title}</h4>
                  <p className="text-white/60 font-light">{belief.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <FadeUp delay={0.2}>
              <DoubleBezel innerClassName="text-center py-24">
                <div className="relative flex justify-center mb-16 sm:mb-10 w-fit mx-auto">
                  <FortuneCookie />
                  
                  {/* Desktop Arrow (Right) */}
                  <div className="absolute -right-4 top-1/2 transform translate-x-full -translate-y-[30%] flex-col items-start gap-1 pointer-events-none opacity-60 hidden sm:flex">
                    <svg width="45" height="35" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
                       <path d="M 90 10 Q 50 60, 15 60" />
                       <path d="M 15 60 L 35 45" />
                       <path d="M 15 60 L 30 75" />
                    </svg>
                    <span className="font-serif italic text-sm text-white ml-6 -mt-2 whitespace-nowrap">Tap to open</span>
                  </div>

                  {/* Mobile Arrow (Below) */}
                  <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-60 sm:hidden">
                    <span className="font-serif italic text-sm text-white whitespace-nowrap mb-1">Tap to open</span>
                    <svg width="25" height="30" viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
                       <path d="M 20 80 Q 35 40, 20 10" />
                       <path d="M 20 10 L 10 25" />
                       <path d="M 20 10 L 30 20" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="font-serif text-4xl md:text-6xl mb-8 text-balance leading-tight">
                  Let's connect and build impactful partnerships.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:jinalimehta2301@gmail.com">
                    <MagneticButton>jinalimehta2301@gmail.com</MagneticButton>
                  </a>
                  <a href="https://www.linkedin.com/in/jinalimehta/" target="_blank" rel="noopener noreferrer">
                    <MagneticButton withArrow={false} className="!bg-[#0A66C2] border-none text-white hover:!bg-[#004182]">
                      LinkedIn
                    </MagneticButton>
                  </a>
                </div>
              </DoubleBezel>
            </FadeUp>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Jinali Mehta. All rights reserved.</p>
      </footer>
    </main>
  );
}
