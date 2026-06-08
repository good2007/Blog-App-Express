import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-400 bg-blue-500 backdrop-blur-md shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Top-Left Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600">
            <svg className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H8.5L15.5 20H20M4 4V20M4 4L15.5 20M20 20V4M20 20H15.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-200">
            nexus
          </span>
        </Link>

        {/* Center: Capsule Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-blue-600/90 border border-blue-400/60 p-1.5 rounded-full">
          <Link 
            href="/" 
            className="text-xs font-semibold text-blue-100 px-4 py-1.5 rounded-full hover:text-white hover:bg-blue-500 transition-colors duration-200"
          >
            Features
          </Link>
          <Link 
            href="/" 
            className="text-xs font-semibold text-blue-100 px-4 py-1.5 rounded-full hover:text-white hover:bg-blue-500 transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link 
            href="/" 
            className="text-xs font-semibold text-blue-100 px-4 py-1.5 rounded-full hover:text-white hover:bg-blue-500 transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            href="/" 
            className="text-xs font-semibold bg-white text-blue-600 px-4 py-1.5 rounded-full transition-all duration-200 font-bold"
          >
            Blog
          </Link>
          <Link 
            href="/" 
            className="text-xs font-semibold text-blue-100 px-4 py-1.5 rounded-full hover:text-white hover:bg-blue-500 transition-colors duration-200"
          >
            Pages
          </Link>
        </nav>

        {/* Right: Add Blog Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full bg-green-400 hover:bg-green-500 active:bg-green-600 text-white font-bold text-xs px-5 py-2 transition-all duration-150 active:scale-95 shadow-md hover:shadow-lg"
          >
            + Add Blog
          </Link>
        </div>

      </div>
    </header>
  );
}
