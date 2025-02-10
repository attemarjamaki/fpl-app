"use client";

import dynamic from "next/dynamic";

const WheelSpinner = dynamic(() => import("@/components/WheelSpinner"), {
  ssr: false,
});

export default function Home() {
  return (
    <section>
      <WheelSpinner />
    </section>
  );
}
