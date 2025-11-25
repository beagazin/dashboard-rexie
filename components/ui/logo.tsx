import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Rexie">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Rexie Logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <span className="text-xl font-bold text-[#9c6dfc]">Rexie</span>
      </div>
    </Link>
  );
}
