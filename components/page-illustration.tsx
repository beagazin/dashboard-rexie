import Image from "next/image";

export default function PageIllustration({ multiple = false }: { multiple?: boolean }) {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
        aria-hidden="true"
      >
        <div className="h-[594px] w-[846px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
      </div>
      {multiple && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50"
            aria-hidden="true"
          >
            <div className="h-[668px] w-[760px] bg-gradient-to-r from-gray-500/20 to-gray-700/20 blur-3xl" />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3"
            aria-hidden="true"
          >
            <div className="h-[668px] w-[760px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
          </div>
        </>
      )}
    </>
  );
}