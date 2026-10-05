import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="grid min-h-[70vh] place-items-center bg-ink px-6 py-16 text-center text-sky">
        <p className="max-w-[22ch] font-display text-[clamp(1.1rem,2.4vw,2rem)] leading-snug">
          Keep scrolling. The page picks up where the car leaves off.
        </p>
      </section>
    </main>
  );
}
