import Head from "next/head";
import BlankComponent from "@/components/BlankComponent";

import dynamic from "next/dynamic";

const GlobeSection = dynamic(() => import("@/components/GlobeSection"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue Bird</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <BlankComponent text="Scroll Down" />
        <GlobeSection />
        <BlankComponent text="Scroll Up" />
      </div>
    </>
  );
}
