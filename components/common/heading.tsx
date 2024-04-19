import { merge } from "@/utils/merge";

export default function Heading({
  text,
  styles = "",
}: {
  text: string;
  styles?: string;
}) {
  return (
    <h2
      className={merge(
        "capitalize font-bold text-text text-2xl md:text-3xl lg:text-4xl mb-4 text-center md:text-start",
        styles
      )}
    >
      {text}
    </h2>
  );
}
