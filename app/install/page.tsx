import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Globe,
  Download,
  Bell,
  Chrome,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-[180px] shrink-0 flex-col items-center">
      <svg width="180" height="360" className="overflow-visible">
        <rect
          x="4"
          y="4"
          width="172"
          height="352"
          rx="22"
          fill="none"
          stroke="var(--color-ink-faint)"
          strokeWidth="2"
          opacity="0.3"
        />
        <rect
          x="60"
          y="0"
          width="60"
          height="6"
          rx="3"
          fill="var(--color-ink-faint)"
          opacity="0.15"
        />
        <rect
          x="10"
          y="14"
          width="160"
          height="330"
          rx="12"
          fill="white"
        />
        <foreignObject x="10" y="14" width="160" height="330">
          <div
            className="flex h-full w-full flex-col text-[8px] leading-tight"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pt-3 pb-1 text-[7px] font-semibold text-gray-500">
      <span>9:41</span>
      <span className="flex gap-0.5">
        <span className="inline-block h-2 w-2.5 rounded-sm border border-gray-400 relative">
          <span className="absolute left-[1px] top-[1px] bottom-[1px] right-[1px] bg-gray-400 rounded-sm" style={{ width: "60%" }} />
        </span>
      </span>
    </div>
  );
}

function ChromeBar() {
  return (
    <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100">
      <div className="h-3 w-3 rounded-full border-2 border-gray-300 flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-gray-300" />
      </div>
      <div className="flex-1 rounded bg-gray-100 px-2 py-0.5 text-[6px] text-gray-400 truncate">
        platinumrentals.ug
      </div>
      <div className="h-3 w-3 rounded-full border border-gray-300 flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

function DotMenuOpen() {
  return (
    <div className="absolute right-2 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-28 z-10 text-[7px]">
      <div className="px-2 py-1.5 font-medium bg-gray-50">⋮ Menu</div>
      <div className="px-2 py-1.5 text-gray-700 flex items-center gap-1.5">
        <Download size={8} />
        Install app
      </div>
      <div className="px-2 py-1.5 text-gray-500">Add to Home screen</div>
      <div className="px-2 py-1.5 text-gray-500">Find in page</div>
    </div>
  );
}

function InstallDialog() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
      <div className="mx-4 w-full max-w-[140px] rounded-xl bg-white p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-red-600 flex items-center justify-center text-white text-[6px] font-bold">PR</div>
          <div className="flex-1 min-w-0">
            <p className="text-[7px] font-bold leading-tight">Platinum Rentals</p>
            <p className="text-[6px] text-gray-400">platinumrentals.ug</p>
          </div>
        </div>
        <p className="mt-2 text-[7px] text-gray-600">Add to Home screen?</p>
        <div className="mt-2 flex justify-end gap-2">
          <span className="px-2 py-1 text-[7px] text-gray-500">Cancel</span>
          <span className="rounded-md bg-red-600 px-3 py-1 text-[7px] font-bold text-white">Install</span>
        </div>
      </div>
    </div>
  );
}

function ShareSheet() {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl border-t border-gray-200 shadow-lg z-10 px-3 pt-2 pb-3">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-gray-300" />
      <p className="text-[7px] font-semibold text-gray-500 mb-2">Share</p>
      <div className="grid grid-cols-4 gap-2">
        {["Messages", "Mail", "Notes", "Reminders"].map((s) => (
          <div key={s} className="flex flex-col items-center gap-0.5">
            <div className="h-7 w-7 rounded-xl bg-gray-100" />
            <span className="text-[5px] text-gray-500">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-lg bg-gray-50 px-2 py-1.5 flex items-center gap-2">
        <div className="h-5 w-5 rounded-lg bg-blue-500 flex items-center justify-center text-white text-[5px] font-bold">+</div>
        <span className="text-[7px] font-semibold text-blue-600">Add to Home Screen</span>
      </div>
    </div>
  );
}

const ANDROID_STEPS = [
  {
    title: "Open in Chrome",
    desc: 'Launch Platinum Rentals in the Google Chrome browser on your Android device.',
    screen: (
      <>
        <StatusBar />
        <ChromeBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
          <p className="text-[7px] font-bold text-gray-800">Platinum Rentals</p>
          <p className="text-[6px] text-gray-400 mt-0.5">Property Management</p>
          <div className="mt-2 h-6 w-full rounded bg-gray-50" />
          <div className="mt-1 h-6 w-3/4 rounded bg-gray-50" />
        </div>
        <div className="border-t border-gray-100 px-3 py-1.5 flex justify-around text-gray-400">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
      </>
    ),
  },
  {
    title: "Tap the menu",
    desc: 'Tap the <strong>⋮</strong> (three-dot menu) icon in the top-right corner of Chrome.',
    screen: (
      <div className="relative">
        <StatusBar />
        <ChromeBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
          <p className="text-[7px] font-bold text-gray-800">Platinum Rentals</p>
        </div>
        <div className="absolute right-1 top-9">
          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-[9px] font-bold text-red-600">⋮</span>
          </div>
          <div className="absolute top-5 right-0">
            <div className="h-2 w-2 rotate-45 bg-red-100" />
          </div>
        </div>
        <DotMenuOpen />
        <div className="border-t border-gray-100 px-3 py-1.5 flex justify-around text-gray-400">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
      </div>
    ),
  },
  {
    title: "Select Install",
    desc: 'Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong> from the menu.',
    screen: (
      <div className="relative">
        <StatusBar />
        <ChromeBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center opacity-30">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
          <p className="text-[7px] font-bold text-gray-800">Platinum Rentals</p>
        </div>
        <div className="absolute right-1 top-9">
          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-[9px] font-bold text-red-600">⋮</span>
          </div>
        </div>
        <div className="absolute right-2 top-14 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-28 z-10 text-[7px]">
          <div className="px-2 py-1.5 font-medium bg-gray-50">⋮ Menu</div>
          <div className="px-2 py-1.5 bg-red-50 text-red-600 font-semibold flex items-center gap-1.5 rounded">
            <Download size={8} />
            Install app
          </div>
          <div className="px-2 py-1.5 text-gray-500">Add to Home screen</div>
        </div>
        <div className="border-t border-gray-100 px-3 py-1.5 flex justify-around text-gray-400">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
      </div>
    ),
  },
  {
    title: "Confirm",
    desc: 'Tap <strong>"Install"</strong> in the pop-up. The app will be added to your home screen.',
    screen: (
      <div className="relative">
        <StatusBar />
        <ChromeBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center opacity-20">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
        </div>
        <InstallDialog />
        <div className="border-t border-gray-100 px-3 py-1.5 flex justify-around text-gray-400">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
      </div>
    ),
  },
];

const IOS_STEPS = [
  {
    title: "Open in Safari",
    desc: "Launch Platinum Rentals in the Safari browser on your iPhone or iPad.",
    screen: (
      <>
        <StatusBar />
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100">
          <div className="flex-1 rounded bg-gray-100 px-2 py-0.5 text-[6px] text-gray-400 truncate text-center">
            platinumrentals.ug
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
          <p className="text-[7px] font-bold text-gray-800">Platinum Rentals</p>
          <p className="text-[6px] text-gray-400 mt-0.5">Property Management</p>
          <div className="mt-2 h-6 w-full rounded bg-gray-50" />
          <div className="mt-1 h-6 w-3/4 rounded bg-gray-50" />
        </div>
        <div className="border-t border-gray-100 px-4 py-1 flex justify-between text-gray-400 text-[6px]">
          <span>←</span>
          <span>→</span>
          <span className="h-3 w-3 rounded-full bg-gray-200" />
          <span>☰</span>
        </div>
      </>
    ),
  },
  {
    title: "Tap Share",
    desc: 'Tap the <strong>Share</strong> icon (square with arrow pointing up) at the bottom of Safari.',
    screen: (
      <div className="relative">
        <StatusBar />
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100">
          <div className="flex-1 rounded bg-gray-100 px-2 py-0.5 text-[6px] text-gray-400 truncate text-center">
            platinumrentals.ug
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center opacity-30">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
          <p className="text-[7px] font-bold text-gray-800">Platinum Rentals</p>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
        </div>
        <ShareSheet />
      </div>
    ),
  },
  {
    title: "Scroll & select",
    desc: 'Scroll down and tap <strong>"Add to Home Screen"</strong>.',
    screen: (
      <div className="relative">
        <StatusBar />
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100">
          <div className="flex-1 rounded bg-gray-100 px-2 py-0.5 text-[6px] text-gray-400 truncate text-center">
            platinumrentals.ug
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center opacity-20">
          <div className="h-5 w-5 rounded bg-red-600 flex items-center justify-center text-white text-[5px] font-bold mb-1">PR</div>
        </div>
        <ShareSheet />
      </div>
    ),
  },
  {
    title: "Confirm",
    desc: 'Tap <strong>"Add"</strong> in the top-right corner. The app icon will appear on your home screen.',
    screen: (
      <div className="relative">
        <StatusBar />
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100">
          <span className="text-[7px] text-blue-500">Cancel</span>
          <span className="text-[7px] font-bold">Home Screen</span>
          <span className="text-[7px] font-bold text-blue-500">Add</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="h-12 w-12 rounded-2xl bg-red-600 shadow-lg flex items-center justify-center text-white text-[8px] font-bold">PR</div>
          <p className="mt-2 text-[8px] font-bold text-gray-800">Platinum Rentals</p>
          <p className="text-[6px] text-gray-400">platinumrentals.ug</p>
          <div className="mt-3 w-full rounded-lg bg-gray-50 px-3 py-2 text-center">
            <p className="text-[7px] text-gray-600">This will add the icon to your home screen for easy access.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function InstallPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-clip">
      <section className="px-4 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </FadeIn>

          <FadeIn delay={50}>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              PWA
            </span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Install the App
            </h1>
            <p
              className="mt-4 max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Platinum Rentals is a Progressive Web App (PWA). Install it on
              your device for instant notifications on new listings, faster
              loading, and an app-like experience — no app store required.
            </p>
          </FadeIn>

          {/* Android instructions */}
          <FadeIn delay={100}>
            <div className="surface-raised mt-10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <Smartphone size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <h2 className="text-lg font-extrabold">Android</h2>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {ANDROID_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex items-center gap-2 mb-3 self-start">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0"
                        style={{ background: "var(--color-accent)" }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm font-bold">{step.title}</p>
                    </div>
                    <PhoneFrame>{step.screen}</PhoneFrame>
                    <p
                      className="mt-3 max-w-[200px] text-[11px] leading-relaxed"
                      style={{ color: "var(--color-ink-soft)" }}
                      dangerouslySetInnerHTML={{ __html: step.desc }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* iOS instructions */}
          <FadeIn delay={150}>
            <div className="surface-raised mt-6 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <Tablet size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <h2 className="text-lg font-extrabold">iOS (iPhone / iPad)</h2>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {IOS_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex items-center gap-2 mb-3 self-start">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0"
                        style={{ background: "var(--color-accent)" }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm font-bold">{step.title}</p>
                    </div>
                    <PhoneFrame>{step.screen}</PhoneFrame>
                    <p
                      className="mt-3 max-w-[200px] text-[11px] leading-relaxed"
                      style={{ color: "var(--color-ink-soft)" }}
                      dangerouslySetInnerHTML={{ __html: step.desc }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Notification CTA */}
          <FadeIn delay={180}>
            <div
              className="mt-6 rounded-3xl p-6 sm:p-8 text-center"
              style={{ background: "var(--color-accent-soft)" }}
            >
              <Bell size={28} className="mx-auto" style={{ color: "var(--color-accent)" }} />
              <h2 className="mt-3 text-lg font-extrabold">
                Get instant notifications on new listings
              </h2>
              <p
                className="mt-2 max-w-lg mx-auto text-sm leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                Install the app to receive push notifications when new properties
                are listed, prices change, or a property you are interested in
                becomes available. Never miss an opportunity.
              </p>
            </div>
          </FadeIn>

          {/* Why install */}
          <FadeIn delay={200}>
            <div className="surface-raised mt-6 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <Globe size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <h2 className="text-lg font-extrabold">Why install?</h2>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Instant notifications on new listings",
                  "Works offline for previously viewed pages",
                  "Loads faster — no browser tabs or URL bar",
                  "App icon on your home screen, just like a native app",
                  "Small footprint: only a few MB of cached data",
                  "Always up to date — no manual updates needed",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Download size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span style={{ color: "var(--color-ink-soft)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <div className="h-16" />
        </div>
      </section>
    </main>
  );
}
