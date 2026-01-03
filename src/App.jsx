import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, 
  Globe, 
  Plane, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Anchor, 
  Phone, 
  MapPin, 
  Mail, 
  Clock,
  ArrowRight,
  FileText,
  CheckCircle,
  Plus,
  Minus,
  MessageCircle,
  Package,
  Ship,
  Shield,
  AlertTriangle,
  Scale,
  FileWarning,
  Cookie,
  Printer,
  Factory,
  ShoppingBag,
  Pill,
  Car
} from 'lucide-react';

/* --- STYLES & FONTS INJECTION --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F4F6F8;
      color: #0D253F;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Montserrat', sans-serif;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0D253F;
    }
    ::-webkit-scrollbar-thumb {
      background: #FF5722;
    }

    /* Kinetic Button Hover Effect */
    .btn-kinetic {
      position: relative;
      overflow: hidden;
      z-index: 1;
      transition: color 0.3s ease;
    }
    .btn-kinetic::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: #d84315;
      z-index: -1;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: skewX(-15deg);
      transform-origin: top left;
    }
    .btn-kinetic:hover::before {
      left: -10%; 
      width: 120%;
    }

    /* Loader Animation */
    .loader-arrow {
      clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
    }
    
    /* Scroll Reveal */
    .fade-up-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-up-element.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Staggered Checklist Animation */
    .checklist-item {
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.4s ease-out;
    }
    .checklist-item.visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Zig Zag Slide In */
    .slide-in-left {
      opacity: 0;
      transform: translateX(-50px);
      transition: all 0.8s ease-out;
    }
    .slide-in-right {
      opacity: 0;
      transform: translateX(50px);
      transition: all 0.8s ease-out;
    }
    .slide-in-active {
      opacity: 1;
      transform: translateX(0);
    }

    /* Form Styles */
    .input-group {
      position: relative;
      margin-bottom: 1.5rem;
    }
    .input-field:focus ~ label,
    .input-field:not(:placeholder-shown) ~ label {
      top: -0.5rem;
      left: 0.5rem;
      font-size: 0.75rem;
      color: #FF5722;
      background: white;
      padding: 0 4px;
    }
    
    /* Hide scrollbar for mobile tabs */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

/* --- HOOKS --- */
const useScrollReveal = (selector = '.fade-up-element') => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('slide-in-active');
            
            if (entry.target.classList.contains('checklist-container')) {
              const items = entry.target.querySelectorAll('.checklist-item');
              items.forEach((item, index) => {
                setTimeout(() => item.classList.add('visible'), index * 150);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector]);
};

/* --- COMPONENTS --- */

// 1. Initial Loader
const IntroLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => onComplete(), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (stage === 2) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center bg-[#0D253F] transition-transform duration-700 ease-in-out ${stage === 1 ? 'translate-x-full' : 'translate-x-0'}`}>
      <div className="w-full relative h-32 flex items-center justify-center overflow-hidden">
        <div className={`absolute left-0 h-full w-full bg-[#FF5722] loader-arrow transition-transform duration-[800ms] ease-in-out transform ${stage === 1 ? 'translate-x-full' : '-translate-x-full'}`} style={{ width: '150%' }}></div>
        <div className={`text-white text-4xl font-extrabold tracking-wider z-10 ${stage === 1 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>THIVRA</div>
      </div>
    </div>
  );
};

// 2. Navigation
const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'exim', label: 'Export-Import Guide' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#0D253F] shadow-lg py-2' : 'bg-[#0D253F]/95 py-4'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <div onClick={() => handleNav('home')} className="flex items-center space-x-2 group cursor-pointer">
            <div className="bg-[#FF5722] p-1 clip-arrow transform group-hover:skew-x-12 transition-transform duration-300">
              <ArrowRight className="text-white w-6 h-6" />
            </div>
            <span className="text-white text-2xl font-extrabold tracking-tight">THIVRA</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNav(item.id)}
                className={`text-sm uppercase tracking-wide transition-colors font-medium ${activePage === item.id ? 'text-[#FF5722]' : 'text-white hover:text-[#FF5722]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center bg-white/10 p-1 border border-white/20">
            <input type="text" placeholder="Track Shipment ID" className="bg-transparent text-white px-3 py-1 outline-none placeholder-gray-400 text-sm w-40 focus:w-56 transition-all duration-300" />
            <button className="bg-[#FF5722] p-2 hover:bg-orange-600 transition-colors"><Search className="text-white w-4 h-4" /></button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0D253F] border-t border-white/10 absolute w-full">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)} className={`text-left font-medium ${activePage === item.id ? 'text-[#FF5722]' : 'text-white'}`}>{item.label}</button>
            ))}
             <div className="flex items-center bg-white p-1 mt-4">
              <input type="text" placeholder="Enter Shipment ID" className="bg-transparent text-[#0D253F] px-3 py-2 outline-none w-full font-medium" />
              <button className="bg-[#FF5722] p-2"><Search className="text-white w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- HOME PAGE COMPONENTS ---
const Hero = ({ setActivePage }) => (
  <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[#0D253F]">
      <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80" alt="Container Truck" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
      <div className="absolute inset-0 bg-[#0D253F] opacity-70"></div>
    </div>
    <div className="container mx-auto px-4 z-10 pt-16">
      <div className="max-w-4xl fade-up-element">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          Reliable Logistics & <br className="hidden md:block"/> Supply Chain Solutions You Can Trust
        </h1>
        <p className="text-[#FF5722] font-bold text-lg md:text-xl mb-6 tracking-wide">
          Domestic Cargo | Export Import | International Courier | Label Printing
        </p>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
          We are a trusted logistics service provider offering end-to-end transportation, courier, export-import, and labeling solutions. With a strong domestic and international network, we ensure safe, fast, and cost-effective delivery for businesses of all sizes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setActivePage('contact')} className="btn-kinetic bg-[#FF5722] text-white px-8 py-4 font-bold tracking-wide uppercase text-sm border-2 border-[#FF5722]">Get a Quote</button>
          <button onClick={() => setActivePage('services')} className="group px-8 py-4 font-bold tracking-wide uppercase text-sm border-2 border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all duration-300">Our Services</button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-2 bg-[#FF5722]"></div>
  </section>
);

const ServicePreview = ({ setActivePage }) => {
  const cards = [
    { icon: Truck, title: "Local Cargo", desc: "Road freight (FTL & Part Load), Real-time tracking, Safe handling of fragile goods." },
    { icon: Anchor, title: "Export - Import", desc: "Air & sea freight, Customs clearance, Consulting & compliance support." },
    { icon: Plane, title: "Intl. Courier", desc: "Express & economy options, Worldwide coverage, Secure packaging." },
    { icon: Printer, title: "Label Printing", desc: "Barcode, QR, Product & Shipping labels. Custom size & durable printing." }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 border-l-4 border-[#FF5722] pl-4 fade-up-element">
          <h2 className="text-3xl font-bold text-[#0D253F]">Moving Your Business Forward</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((c, i) => (
            <div 
              key={i} 
              className="bg-white p-6 border-b-4 border-transparent hover:border-[#FF5722] hover:bg-[#F4F6F8] shadow-lg hover:shadow-xl transition-all duration-300 group fade-up-element cursor-pointer" 
              style={{ transitionDelay: `${i*100}ms` }}
              onClick={() => setActivePage('services')}
            >
              <div className="bg-[#F4F6F8] w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#FF5722] transition-colors duration-300">
                <c.icon className="w-7 h-7 text-[#0D253F] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-[#0D253F] mb-3">{c.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{c.desc}</p>
              <button className="text-[#FF5722] font-semibold text-sm flex items-center group-hover:text-[#d84315] transition-colors">
                Learn More 
                <ChevronRight className="w-4 h-4 ml-1 transform transition-all duration-300 group-hover:translate-x-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesServed = () => (
  <section className="py-16 bg-[#F4F6F8]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10 fade-up-element">
        <h2 className="text-3xl font-bold text-[#0D253F]">Industries We Serve</h2>
        <div className="w-16 h-1 bg-[#FF5722] mx-auto mt-4"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 text-center">
        {[
          { name: "Manufacturing", icon: Factory },
          { name: "E-commerce", icon: ShoppingBag },
          { name: "Retail & FMCG", icon: Package },
          { name: "Pharmaceuticals", icon: Pill },
          { name: "Automotive", icon: Car },
          { name: "Exporters", icon: Globe }
        ].map((ind, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded shadow-sm hover:shadow-md transition-shadow fade-up-element">
            <ind.icon className="w-8 h-8 mx-auto mb-3 text-[#FF5722]" strokeWidth={1.5} />
            <h4 className="font-semibold text-[#0D253F] text-xs md:text-sm">{ind.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyThivra = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/2 fade-up-element">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D253F] mb-8">Why Gujarat Industries Trust Us</h2>
        <div className="space-y-6">
          {[
            { t: "Speed First", d: "Optimized routes to ensure on-time delivery." },
            { t: "Paperwork Perfection", d: "We handle complex EXIM documentation." },
            { t: "Secure Handling", d: "Safety is our protocol for all shipments." }
          ].map((p, i) => (
            <div key={i} className="flex group">
              <div className="mr-4 mt-1"><div className="w-8 h-8 flex items-center justify-center bg-[#F4F6F8] group-hover:bg-[#FF5722] transition-colors"><ChevronRight className="w-5 h-5 text-[#FF5722] group-hover:text-white" /></div></div>
              <div><h4 className="text-lg font-bold text-[#0D253F]">{p.t}</h4><p className="text-gray-600 text-sm">{p.d}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 relative fade-up-element min-h-[300px]">
        <img src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80" alt="Thivra Fleet" className="w-full h-auto object-cover shadow-2xl filter contrast-125" onError={(e) => { e.target.src = "https://placehold.co/600x400/0D253F/FFF?text=Thivra+Logistics"; }} />
      </div>
    </div>
  </section>
);

const HomeView = ({ setActivePage }) => (
  <>
    <Hero setActivePage={setActivePage} />
    <ServicePreview setActivePage={setActivePage} />
    <IndustriesServed />
    <WhyThivra />
  </>
);

// --- SERVICES PAGE ---
const ServicesView = () => {
  const [activeTab, setActiveTab] = useState('domestic');
  useScrollReveal('.fade-up-element, .slide-in-left, .slide-in-right');

  const services = [
    {
      id: 'domestic',
      title: 'Local Cargo Transport',
      tagline: "Domestic Logistics Solutions",
      icon: Truck,
      points: [
        'Road freight transportation (Full Truck Load & Part Load)',
        'Real-time shipment tracking',
        'Safe handling of fragile and high-value goods',
        'Daily GIDC Pickups'
      ],
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80',
      cta: 'Get Domestic Rates'
    },
    {
      id: 'exim',
      title: 'Export & Import Services',
      tagline: "End-to-End Freight Forwarding",
      icon: Ship,
      points: [
        'Air and sea freight forwarding',
        'Customs clearance & documentation',
        'Import/export consulting & compliance support',
        'Port handling & container services',
        'Door-to-door international logistics'
      ],
      img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80',
      cta: 'Book Sea Freight'
    },
    {
      id: 'courier',
      title: 'International Courier',
      tagline: "Express & Economy Delivery",
      icon: Package,
      points: [
        'Worldwide delivery coverage',
        'Document and non-document shipping',
        'Customs documentation support',
        'Online shipment tracking',
        'Secure packaging and handling'
      ],
      img: 'https://images.unsplash.com/photo-1524592714635-d77511a4834d?auto=format&fit=crop&q=80',
      cta: 'Send a Courier'
    },
    {
      id: 'label',
      title: 'Label Printing',
      tagline: "For Packed Products",
      icon: Printer,
      points: [
        'Barcode & QR code labels',
        'Product information & compliance labels',
        'Shipping & courier labels',
        'Export packaging labels',
        'Custom size & design printing (Durable & Smudge-proof)'
      ],
      img: 'https://images.unsplash.com/photo-1628135804618-6222b40b72a4?auto=format&fit=crop&q=80',
      cta: 'Order Labels'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 mb-12 text-center fade-up-element">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D253F] mb-4">Logistics Solutions for Every Scale</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">From GIDC to the Globe—we handle the movement so you can handle the business.</p>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden flex justify-center mb-8 px-4 sticky top-20 z-30 bg-[#F4F6F8] py-2 overflow-x-auto no-scrollbar">
        <div className="bg-white rounded shadow-sm p-1 flex min-w-full">
          {services.map(s => (
            <button 
              key={s.id} 
              onClick={() => setActiveTab(s.id)}
              className={`flex-1 py-2 px-4 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${activeTab === s.id ? 'bg-[#FF5722] text-white shadow' : 'text-gray-500'}`}
            >
              {s.id === 'label' ? 'Labels' : s.id === 'exim' ? 'Exim' : s.id === 'domestic' ? 'Domestic' : 'Courier'}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-24">
        {services.map((s, idx) => (
          <div 
            key={s.id} 
            className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} ${activeTab !== s.id ? 'hidden md:flex' : 'flex'}`}
          >
            {/* Image Side */}
            <div className={`w-full md:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden group shadow-2xl ${idx % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              <img 
                src={s.img} 
                alt={s.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/0D253F/FFF?text=" + s.title.replace(/\s/g, '+');
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 fade-up-element`}>
              <div className="flex items-center space-x-4 mb-4">
                <s.icon className="w-12 h-12 text-[#FF5722]" strokeWidth={1} />
                <h2 className="text-3xl font-bold text-[#0D253F]">{s.title}</h2>
              </div>
              <p className="text-[#FF5722] font-semibold text-lg mb-6 tracking-wide border-l-4 border-[#0D253F] pl-3">{s.tagline}</p>
              
              <ul className="space-y-4 mb-8">
                {s.points.map((p, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#FF5722] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{p}</span>
                  </li>
                ))}
              </ul>

              <button className="btn-kinetic bg-[#0D253F] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-[#FF5722]">
                {s.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- EXIM GUIDE PAGE ---
const EximGuideView = () => {
  useScrollReveal('.fade-up-element, .checklist-container');
  const [openSection, setOpenSection] = useState(null);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  const incoterms = [
    { term: "FOB (Free on Board)", def: "Seller loads goods on board; buyer handles cost/risk from there." },
    { term: "CIF (Cost, Insurance, Freight)", def: "Seller pays costs to destination port; buyer assumes risk once loaded." },
    { term: "EXW (Ex Works)", def: "Buyer picks up goods from seller's premises; buyer bears all costs/risks." }
  ];

  const faqs = [
    { q: "How do I calculate volumetric weight?", a: "Length x Width x Height (cm) / 5000. Couriers charge the higher of actual or volumetric weight." },
    { q: "What items are prohibited for air cargo?", a: "Explosives, flammable liquids, magnets, and lithium batteries (without special packaging)." }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 fade-up-element">
          <h1 className="text-4xl font-extrabold text-[#0D253F] mb-4">The Exporter’s Handbook</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Simplifying Customs, Documentation, and Global Shipping for Vadodara’s Businesses.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky TOC (Desktop) */}
          <div className="hidden lg:block w-1/4">
            <div className="sticky top-28 space-y-4 border-l-2 border-gray-100 pl-6">
              {['Essential Documents', 'Incoterms Simplified', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-gray-500 hover:text-[#FF5722] font-medium transition-colors">
                  {item}
                </a>
              ))}
              <button className="mt-8 flex items-center space-x-2 text-[#FF5722] font-bold border border-[#FF5722] px-4 py-2 hover:bg-[#FF5722] hover:text-white transition-all">
                <FileText className="w-4 h-4" /> <span>Download Checklist PDF</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-20">
            
            {/* Checklist Section */}
            <div id="essential-documents" className="checklist-container">
              <h2 className="text-2xl font-bold text-[#0D253F] mb-6 flex items-center">
                <FileText className="mr-3 text-[#FF5722]" /> Essential Documents for Export
              </h2>
              <div className="bg-[#F4F6F8] p-8 border-l-4 border-[#0D253F]">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['IEC (Import Export Code)', 'Commercial Invoice', 'Packing List', 'Bill of Lading / Airway Bill', 'Certificate of Origin'].map((item, i) => (
                    <li key={i} className="checklist-item flex items-center bg-white p-4 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                      <span className="font-medium text-[#0D253F]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Incoterms Section */}
            <div id="incoterms-simplified" className="fade-up-element">
              <h2 className="text-2xl font-bold text-[#0D253F] mb-6">Know Your Shipping Terms</h2>
              <div className="space-y-4">
                {incoterms.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => toggle(`inco-${i}`)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-white transition-colors">
                      <span className="font-bold text-[#0D253F]">{item.term}</span>
                      {openSection === `inco-${i}` ? <Minus className="w-5 h-5 text-[#FF5722]" /> : <Plus className="w-5 h-5 text-gray-400" />}
                    </button>
                    <div className={`bg-white px-4 text-gray-600 overflow-hidden transition-all duration-300 ${openSection === `inco-${i}` ? 'max-h-24 py-4' : 'max-h-0'}`}>
                      {item.def}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="fade-up-element">
              <h2 className="text-2xl font-bold text-[#0D253F] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((item, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button onClick={() => toggle(`faq-${i}`)} className="w-full flex justify-between items-center py-4 text-left">
                      <span className="font-semibold text-lg text-[#0D253F]">{item.q}</span>
                      <ChevronRight className={`w-5 h-5 text-[#FF5722] transition-transform duration-300 ${openSection === `faq-${i}` ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`text-gray-600 overflow-hidden transition-all duration-300 ${openSection === `faq-${i}` ? 'max-h-24 pb-4' : 'max-h-0'}`}>
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
const ContactView = () => {
  const [formState, setFormState] = useState('idle'); // idle, loading, success
  const [formData, setFormData] = useState({ name: '', type: 'Domestic', pickup: '', dest: '', weight: '', phone: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!formData.name) err.name = true;
    if (!formData.phone) err.phone = true;
    if (!formData.pickup) err.pickup = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col md:flex-row">
      {/* Left: Contact Info (Blue) */}
      <div className="w-full md:w-1/2 bg-[#0D253F] text-white p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-lg mx-auto md:mx-0">
          <h1 className="text-4xl font-extrabold mb-4">Let’s Get Moving.</h1>
          <p className="text-blue-200 mb-12">Visit us in Vadodara or drop a query.</p>

          <div className="space-y-8 mb-12">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-[#FF5722] mr-4 mt-1" />
              <p>12A, GIDC Estate Phase II, <br/>Makarpura, Vadodara, Gujarat 390010</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-[#FF5722] mr-4" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-[#FF5722] mr-4" />
              <p>booking@thivralogistics.com</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-50" alt="Map" />
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <MapPin className="w-10 h-10 text-[#FF5722] drop-shadow-lg animate-bounce" fill="currentColor" />
             </div>
          </div>
        </div>
      </div>

      {/* Right: Form (White) */}
      <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center relative">
        <div className="max-w-lg mx-auto w-full">
          {formState === 'success' ? (
            <div className="text-center py-20 fade-up-element visible">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D253F] mb-2">Request Received!</h3>
              <p className="text-gray-500">Our team will call you within 30 minutes.</p>
              <button onClick={() => setFormState('idle')} className="mt-8 text-[#FF5722] font-bold underline">Send another</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0D253F] mb-8">Quick Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="input-group">
                  <input 
                    type="text" name="name" placeholder=" " 
                    className={`input-field w-full border-b-2 bg-transparent py-2 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#FF5722]'}`}
                    onChange={handleChange}
                  />
                  <label className="absolute left-0 top-2 text-gray-500 transition-all duration-300 pointer-events-none">Name & Company</label>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="input-group">
                    <select name="type" className="w-full border-b-2 border-gray-300 py-2 outline-none bg-transparent" onChange={handleChange} value={formData.type}>
                      <option>Domestic</option>
                      <option>Export-Import</option>
                      <option>Courier</option>
                    </select>
                    <label className="absolute left-0 -top-3 text-xs text-[#FF5722] font-medium">Service Type</label>
                  </div>
                  <div className="input-group">
                    <input type="text" name="weight" placeholder=" " className="input-field w-full border-b-2 border-gray-300 focus:border-[#FF5722] py-2 outline-none" onChange={handleChange} />
                    <label className="absolute left-0 top-2 text-gray-500 transition-all pointer-events-none">Approx Kg</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="input-group">
                    <input type="text" name="pickup" placeholder=" " className={`input-field w-full border-b-2 py-2 outline-none ${errors.pickup ? 'border-red-500' : 'border-gray-300 focus:border-[#FF5722]'}`} onChange={handleChange} />
                    <label className="absolute left-0 top-2 text-gray-500 transition-all pointer-events-none">Pickup City</label>
                  </div>
                  <div className="input-group">
                    <input type="text" name="dest" placeholder=" " className="input-field w-full border-b-2 border-gray-300 focus:border-[#FF5722] py-2 outline-none" onChange={handleChange} />
                    <label className="absolute left-0 top-2 text-gray-500 transition-all pointer-events-none">Destination</label>
                  </div>
                </div>

                <div className="input-group">
                  <input type="tel" name="phone" placeholder=" " className={`input-field w-full border-b-2 py-2 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-[#FF5722]'}`} onChange={handleChange} />
                  <label className={`absolute left-0 top-2 transition-all pointer-events-none ${errors.phone ? 'text-red-500' : 'text-gray-500'}`}>Phone Number {errors.phone && '*'}</label>
                </div>

                <button type="submit" className="w-full bg-[#FF5722] text-white font-bold uppercase tracking-wider py-4 hover:bg-orange-600 transition-colors flex justify-center items-center h-14">
                  {formState === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Get Quote'}
                </button>
              </form>
            </>
          )}
        </div>
        
        {/* WhatsApp Floating Button */}
        <button className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:-translate-y-2 z-50 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" /> <span className="font-bold hidden md:inline">Chat</span>
        </button>
      </div>
    </div>
  );
};

// --- TERMS OF SERVICE PAGE ---
const TermsView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
        {/* Quick Jump Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-28 space-y-2 border-l-2 border-gray-100 pl-6">
            <h4 className="text-[#0D253F] font-bold mb-4 uppercase text-sm tracking-wider">Quick Jump</h4>
            {['Prohibited Items', 'Liability', 'Claims'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="block text-gray-500 hover:text-[#FF5722] text-sm font-medium transition-colors text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 max-w-[800px] mx-auto">
          <h1 className="text-3xl font-extrabold text-[#0D253F] mb-2 text-center">Terms and Conditions</h1>
          <p className="text-gray-500 text-center mb-12 text-sm">Last Updated: December 2025</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
              <p className="mb-4">Welcome to Thivra Logistics. By using our services (Local Cargo, Export-Import, International Courier), you agree to the following terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">1. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>"Company"</strong> refers to Thivra Logistics, based in Vadodara, Gujarat.</li>
                <li><strong>"Shipper"</strong> refers to the person or entity sending the shipment.</li>
                <li><strong>"Consignment"</strong> refers to the documents or goods travelling under one Waybill.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">2. Booking & Declarations</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The Shipper warrants that all descriptions, values, and other particulars furnished to the Company for customs, consular, and other purposes are true, correct, and complete.</li>
                <li>The Company reserves the right to inspect (open) any package to ensure safety and compliance with security regulations, without prior notice to the Shipper.</li>
              </ul>
            </section>

            <section id="prohibited-items" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-[#0D253F] mb-4 flex items-center">
                <FileWarning className="w-5 h-5 text-[#FF5722] mr-2" /> 3. Prohibited Items
              </h2>
              <p className="mb-3">Thivra Logistics does not accept the following items for transport under any circumstances:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cash, Bullion, Jewellery, and Precious Stones.</li>
                <li>Firearms, Explosives, and Ammunition.</li>
                <li>Illegal Drugs or Narcotics.</li>
                <li>Live Animals.</li>
                <li>Hazardous Waste or material defined as "Dangerous Goods" by IATA or ICAO, unless explicitly agreed upon with proper documentation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">4. Customs & Duties (For International Shipments)</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Destination Duties:</strong> Customs duties, taxes, and penalties levied by the destination country are the responsibility of the Receiver.</li>
                <li><strong>Payment Default:</strong> If the Receiver refuses to pay, the Shipper is liable for all return charges, duties, and taxes.</li>
              </ul>
            </section>

            <section id="liability" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-[#0D253F] mb-4 flex items-center">
                <Shield className="w-5 h-5 text-[#FF5722] mr-2" /> 5. Limitation of Liability
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cargo & Courier:</strong> Unless a higher value is declared in writing and "Enhanced Liability Coverage" (Insurance) is purchased at the time of booking, the liability of Thivra Logistics for loss or damage is limited to the standard industry carrier limit (e.g., ₹100 per kg or the value of the goods, whichever is lower).</li>
                <li><strong>Indirect Damages:</strong> The Company is not liable for consequential losses (e.g., loss of income, profit, markets, or reputation) due to delays.</li>
              </ul>
            </section>

            <section id="claims" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-[#0D253F] mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-[#FF5722] mr-2" /> 6. Claims
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any claim for lost or damaged goods must be submitted in writing within 7 days of the delivery date (or expected delivery date).</li>
                <li>No claim will be entertained until all freight charges have been paid.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4 flex items-center">
                 <Scale className="w-5 h-5 text-[#FF5722] mr-2" /> 7. Jurisdiction
              </h2>
              <p>These terms shall be governed by the laws of India. Any disputes arising out of or in connection with Thivra Logistics services shall be subject to the exclusive jurisdiction of the Courts of Vadodara, Gujarat.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PRIVACY POLICY PAGE ---
const PrivacyView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl font-extrabold text-[#0D253F] mb-2 text-center">Privacy Policy</h1>
          <p className="text-gray-500 text-center mb-12 text-sm">Last Updated: December 2025</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
              <p>At Thivra Logistics ("we", "us", "our"), we are committed to protecting the privacy of our clients in Vadodara and across the globe. This policy outlines how we handle your data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">1. Information We Collect</h2>
              <p className="mb-2">To process shipments and provide logistics solutions, we collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Sender/Receiver Details:</strong> Name, Address, Phone Number, Email.</li>
                <li><strong>KYC Documents:</strong> Aadhar, PAN, GST Certificate, or IEC Code (required by Indian Customs for Export-Import).</li>
                <li><strong>Shipment Data:</strong> Contents, value, and destination of your packages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Service Fulfillment:</strong> To pick up, transport, and deliver your consignment.</li>
                <li><strong>Customs Clearance:</strong> We are legally required to share shipment details with Customs Authorities (Indian and International) for security and tax assessment.</li>
                <li><strong>Status Updates:</strong> To send you tracking notifications via SMS, WhatsApp, or Email.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">3. Sharing with Third Parties</h2>
              <p className="mb-2">We do not sell your personal data. However, logistics is a network business. We share necessary data with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Partner Carriers:</strong> Airlines, Shipping Lines, and Last-Mile Delivery partners (e.g., FedEx, DHL, Local Trucking Vendors) to complete the delivery.</li>
                <li><strong>Government Authorities:</strong> As required by law for regulatory compliance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">4. Data Security</h2>
              <p>We implement standard digital security measures to protect your KYC documents and personal data from unauthorized access. Physical documents are stored securely in our Vadodara facility until archived or destroyed as per statutory requirements.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">5. Cookies</h2>
              <p className="mb-2">Our website uses cookies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Remember your "Track Shipment" history.</li>
                <li>Analyze website traffic to improve our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D253F] mb-4">6. Contact Us</h2>
              <p className="mb-2">For privacy-related queries, please contact our Compliance Officer:</p>
              <div className="bg-[#F4F6F8] p-4 border-l-4 border-[#FF5722]">
                <p><strong>Email:</strong> privacy@thivralogistics.com</p>
                <p><strong>Address:</strong> Thivra Logistics, Vadodara, Gujarat.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COOKIE BANNER ---
const CookieBanner = ({ onAccept, onPrivacyClick }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
    <div className="flex items-center text-sm text-gray-600">
      <Cookie className="w-10 h-10 text-[#FF5722] mr-3 shrink-0" />
      <p>
        We use cookies to track shipments and improve experience. 
        <button onClick={onPrivacyClick} className="text-[#FF5722] font-bold underline ml-1 hover:text-[#0D253F]">Read Privacy Policy</button>
      </p>
    </div>
    <button 
      onClick={onAccept}
      className="whitespace-nowrap bg-[#0D253F] text-white px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors"
    >
      Got it
    </button>
  </div>
);

// 6. CTA Strip
const CTAStrip = ({ setActivePage }) => (
  <section className="relative py-16 overflow-hidden bg-[#FF5722]">
    {/* Added Background Image with Overlay */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80" 
        alt="Logistics Background" 
        className="w-full h-full object-cover opacity-10 mix-blend-multiply filter grayscale"
      />
    </div>

    <div className="absolute top-0 right-0 w-64 h-full bg-white opacity-10 skew-x-12 transform translate-x-20 z-0"></div>
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-2">Ready to ship?</h2>
        <p className="text-white/90 font-medium">Get a competitive quote in 30 minutes.</p>
      </div>
      <button onClick={() => setActivePage('contact')} className="bg-white text-[#FF5722] px-10 py-4 font-bold uppercase tracking-wider hover:bg-[#0D253F] hover:text-white transition-colors duration-300 shadow-lg">
        Request Quote Now
      </button>
    </div>
  </section>
);

// 7. Footer
const Footer = ({ setActivePage }) => (
  <footer className="bg-[#0D253F] text-white pt-16 pb-8 border-t border-white/10">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="bg-[#FF5722] p-1 clip-arrow"><ArrowRight className="text-white w-5 h-5" /></div>
          <span className="text-2xl font-extrabold tracking-tight">THIVRA</span>
        </div>
        <p className="text-gray-400 text-sm max-w-xs">Accelerating Business. Your trusted partner for industrial logistics solutions in Gujarat and beyond.</p>
      </div>
      <div>
        <h4 className="text-[#FF5722] font-bold uppercase tracking-wider mb-6 text-sm">Quick Access</h4>
        <ul className="space-y-3 text-sm text-gray-300">
          {[
            { label: 'Track Shipment', action: () => {} },
            { label: 'Tariff Rates', action: () => {} },
            { label: 'Terms of Service', action: () => setActivePage('terms') },
            { label: 'Privacy Policy', action: () => setActivePage('privacy') }
          ].map(link => (
            <li key={link.label}>
              <button onClick={link.action} className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center w-full text-left">
                <span className="w-1 h-1 bg-[#FF5722] mr-2 rounded-full"></span>{link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-[#FF5722] font-bold uppercase tracking-wider mb-6 text-sm">Contact Us</h4>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="flex items-start"><MapPin className="w-5 h-5 mr-3 text-[#FF5722] shrink-0" /><span>12A, GIDC Estate Phase II, <br/>Vadodara, Gujarat 390010</span></div>
          <div className="flex items-center"><Phone className="w-5 h-5 mr-3 text-[#FF5722] shrink-0" /><span>+91 98765 43210</span></div>
          <div className="flex items-center"><Mail className="w-5 h-5 mr-3 text-[#FF5722] shrink-0" /><span>booking@thivralogistics.com</span></div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <p>&copy; {new Date().getFullYear()} Thivra Logistics. All Rights Reserved.</p>
      <div className="mt-2 md:mt-0 font-mono">Designed for Speed.</div>
    </div>
  </footer>
);

/* --- MAIN APP --- */
const App = () => {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [showCookie, setShowCookie] = useState(true);

  useScrollReveal();

  const renderPage = () => {
    switch (activePage) {
      case 'services': return <ServicesView />;
      case 'exim': return <EximGuideView />;
      case 'contact': return <ContactView />;
      case 'terms': return <TermsView />;
      case 'privacy': return <PrivacyView />;
      default: return <HomeView setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4F6F8]">
      <GlobalStyles />
      {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        
        <main>{renderPage()}</main>
        
        {/* Only show CTA strip on main marketing pages, usually hidden on legal/contact pages if desired, keeping for consistency except contact */}
        {activePage !== 'contact' && activePage !== 'terms' && activePage !== 'privacy' && <CTAStrip setActivePage={setActivePage} />}
        
        <Footer setActivePage={setActivePage} />
        
        {showCookie && (
          <CookieBanner 
            onAccept={() => setShowCookie(false)} 
            onPrivacyClick={() => setActivePage('privacy')} 
          />
        )}
      </div>
    </div>
  );
};

export default App;