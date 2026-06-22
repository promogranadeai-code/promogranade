"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uBg;
  uniform vec3 uAccent;
  uniform float uIntensity;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // 3 octaves instead of 4 — visually identical, 25% fewer noise evals per pixel
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 cuv = uv;
    cuv.x *= aspect;
    vec2 mouse = uMouse;
    mouse.x *= aspect;

    vec2 mouseOffset = cuv - mouse;
    float dist = length(mouseOffset);
    vec2 ripple = normalize(mouseOffset + 0.0001) * exp(-dist * 4.0) * 0.10;

    float t = uTime * 0.09;
    vec2 q = vec2(
      fbm(uv * 1.6 + vec2(0.0, t)),
      fbm(uv * 1.6 + vec2(5.2, t))
    );
    vec2 r = vec2(
      fbm(uv * 2.2 + q + vec2(1.7, 9.2) + t * 0.6),
      fbm(uv * 2.2 + q + vec2(8.3, 2.8) - t * 0.6)
    );

    vec2 distorted = uv + r * 0.32 + ripple;

    float n1 = fbm(distorted * 2.2 + t);
    float n2 = fbm(distorted * 4.0 - t * 0.7);
    float pattern = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

    float liquid = smoothstep(0.30, 0.80, pattern);
    float streak = pow(smoothstep(0.52, 0.88, pattern), 1.2);

    vec3 deep = uAccent * 0.58;
    vec3 color = mix(uBg, deep, liquid * 0.78 * uIntensity);
    color = mix(color, uAccent * 0.92, streak * 0.58 * uIntensity);

    float glow = exp(-dist * 4.0);
    color = mix(color, uAccent, glow * 0.38 * uIntensity);

    float v = smoothstep(1.5, 0.3, length(uv - 0.5));
    color *= 0.88 + 0.12 * v;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Liquid() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { resolvedTheme } = useTheme();
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const _bgColor = useRef(new THREE.Color()); // reused each frame — avoids GC pressure

  // Initialize bg/intensity from whichever theme is already resolved at
  // mount (this component only mounts after the outer SiteLiquid's own
  // "mounted" gate fires, by which point next-themes has already resolved)
  // instead of always starting dark-biased and lerping down — that lerp
  // is a fine touch-up for a live theme *toggle*, but as a startup default
  // it meant light-theme visitors saw an over-saturated red wash for the
  // first second or so before it settled.
  const isDark = resolvedTheme === "dark";
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBg: { value: new THREE.Color(isDark ? "#0a0a0a" : "#fafafa") },
      uAccent: { value: new THREE.Color("#e0142c") },
      uIntensity: { value: isDark ? 0.78 : 0.18 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      mouseTarget.current.x = e.clientX / window.innerWidth;
      mouseTarget.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useFrame(({ clock, size }) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = clock.elapsedTime;
    m.uniforms.uResolution.value.set(size.width, size.height);

    const current = m.uniforms.uMouse.value as THREE.Vector2;
    current.x += (mouseTarget.current.x - current.x) * 0.05;
    current.y += (mouseTarget.current.y - current.y) * 0.05;

    _bgColor.current.set(resolvedTheme === "dark" ? "#0a0a0a" : "#fafafa");
    (m.uniforms.uBg.value as THREE.Color).lerp(_bgColor.current, 0.06);

    // Light theme reads "heavier" with the same mix strength — a white
    // canvas makes the deep-red swirls look much darker/denser than they
    // do against the near-black dark-theme canvas, so soften it a lot more:
    // the hero should read as a light page with a red accent, not a solid
    // red page with a light theme nominally applied.
    const targetIntensity = resolvedTheme === "dark" ? 0.78 : 0.18;
    m.uniforms.uIntensity.value += (targetIntensity - m.uniforms.uIntensity.value) * 0.05;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * Contained liquid background — fills its nearest `relative` ancestor
 * (a hero section) rather than the whole viewport. Mount one per hero.
 */
export function SiteLiquid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
      <Canvas
        dpr={[0.5, 0.75]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          depth: false,
          stencil: false,
        }}
        camera={{ position: [0, 0, 1] }}
        frameloop="always"
      >
        <Liquid />
      </Canvas>
    </div>
  );
}

export default SiteLiquid;
