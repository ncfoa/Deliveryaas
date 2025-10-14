import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="w-full px-4 lg:px-8 py-10">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">About</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Careers</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Mobile</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="hover:text-gray-900">How we work</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Support & Partners</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Help/FAQ</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Press</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Affiliates</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Hotel owners</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Partners</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Advertise with us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">More</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Airline fees</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Airlines</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Low fare tips</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Badges & Certificates</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Security</Link></li>
            </ul>
          </div>
          <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Get the Tazmania app</h3>
            <div className="flex flex-col gap-3">
              <Link href="#" aria-label="Get the app on Google Play" className="inline-flex">
                <Image src="/google-play.svg" alt="Get it on Google Play" width={120} height={40} />
              </Link>
              <Link href="#" aria-label="Download on the App Store" className="inline-flex">
                <Image src="/app-store.svg" alt="Download on the App Store" width={120} height={40} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-200">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span>©2025 Tazmania</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-900">Privacy</Link>
            <Link href="#" className="hover:text-gray-900">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


