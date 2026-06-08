"use client";

/**
 * Client-side shell that lazy-loads every heavy non-critical component
 * AFTER the initial HTML/CSS paint — Three.js, cursor, chatbot, intro animation
 * are all deferred so they never block First Contentful Paint or LCP.
 *
 * `ssr: false` is only valid inside a Client Component, which is why these
 * imports live here rather than directly in app/layout.tsx (a Server Component).
 */
import dynamic from "next/dynamic";

const AmbientField   = dynamic(() => import("./AmbientField"),    { ssr: false });
const IntroAnimation = dynamic(() => import("./IntroAnimation"),  { ssr: false });
const Cursor         = dynamic(() => import("./Cursor"),          { ssr: false });
const ChatBot        = dynamic(() => import("./ChatBot"),         { ssr: false });

export function DeferredShell() {
  return (
    <>
      <AmbientField />
      <Cursor />
      <ChatBot />
      <IntroAnimation />
    </>
  );
}
