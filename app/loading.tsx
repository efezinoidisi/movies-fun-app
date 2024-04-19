import Fallback from "@/components/loaders/fallback";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] fixed inset-0 bg-background">
      <h2 className="animate-text text-transparent bg-cover bg-bottom bg-list text-6xl bg-clip-text drop-shadow-lg font-bold uppercase md:text-7xl lg:text-8xl bg-no-repeat">
        MoviesFUN
      </h2>
      <Fallback />
    </div>
  );
}
