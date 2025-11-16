import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Rexie">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9c6dfc]">
          <span className="text-xl font-bold text-white">R</span>
        </div>
        <span className="text-xl font-bold text-[#9c6dfc]">Rexie</span>
      </div>
    </Link>
  );
}