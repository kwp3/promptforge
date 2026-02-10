export default function Hero() {
  return (
    <div className="relative py-12 sm:py-16 text-center">
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70 blur-3xl"></div>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content tracking-tight mb-4">
        Forge Powerful AI Prompts
      </h1>
      <p className="text-lg text-secondary max-w-2xl mx-auto">
        Turn rough ideas into expert prompts — free, instant, no signup.
      </p>
    </div>
  );
}
