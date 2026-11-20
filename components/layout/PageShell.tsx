import { NeuralBackground } from "@/components/background/NeuralBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Loader } from "@/components/ui/Loader";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { MobileNotice } from "@/components/ui/MobileNotice";
import { SnowEffect } from "@/components/ui/SnowEffect";

/**
 * Every page shares this shell: background, cursor, smooth scroll, the
 * arrival loader, grain, header, footer.
 */

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <NeuralBackground />
      <SnowEffect />
      <KeyboardShortcuts />
      <div className="pointer-events-none fixed inset-0 z-[60] grain" aria-hidden="true" />
      <CustomCursor />
      <Header />
      <main className="relative z-10">{children}</main>
      <Contact />
      <Footer />
      <MobileNotice />
    </>
  );
}

