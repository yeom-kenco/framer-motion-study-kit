// Step4_InViewViewport.tsx
import { useState } from "react";
import { MotionConfig, motion, useInView } from "framer-motion";
import { useInViewHysteresis } from "./useInViewHysteresis";

export default function Step4_InViewViewport() {
  const [seed, setSeed] = useState(0); // remount용 (스크롤 없이도 재시작 테스트 가능)

  return (
    <MotionConfig reducedMotion="never">
      <div
        style={{
          padding: 24,
          maxWidth: 900,
          margin: "0 auto",
          borderTop: "1px solid #e5e7eb",
          marginTop: 40,
        }}
      >
        <h1>Week1: Step4</h1>
        {/* 0) Replay 버튼: 전체 섹션을 remount해서 '한 번만 재생' 케이스도 반복 확인 */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => setSeed((s) => s + 1)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#111",
              color: "#fff",
            }}
          >
            🔁 Replay (remount)
          </button>
          <span style={{ color: "#6b7280" }}>
            스크롤 없이도 다시 실험할 수 있어요.
          </span>
        </div>

        {/* --- 스크롤 여백을 위해 더미 컨텐츠 --- */}
        <Spacer />
        {/* key를 바꿔 remount → 각 섹션 초기화 */}
        <section key={`s1-${seed}`}>
          <DemoOnce />
        </section>
        <Spacer />
        <section key={`s2-${seed}`}>
          <DemoRepeat />
        </section>
        <Spacer />
        <section key={`s3-${seed}`}>
          <DemoMargin />
        </section>
        <Spacer />
        <section key={`s4-${seed}`}>
          <DemoMargin2 />
        </section>
        <Spacer />
        <section key={`s5-${seed}`}>
          <DemoHook />
        </section>
        <Spacer />
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* 1) once: true — 한 번만 재생                                           */
/* ------------------------------------------------------------------ */
function DemoOnce() {
  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
        1) once: true (한 번만 재생)
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        요소가 화면에 처음 들어올 때 한 번만 애니메이션. 다시 스크롤해도
        재생되지 않음.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} // 30% 보이면 트리거, 이후에는 다시 안 함
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ height: 90, borderRadius: 12, background: "#e5e7eb" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2) once: false — 들어올 때마다 재생                                     */
/* ------------------------------------------------------------------ */
function DemoRepeat() {
  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
        2) once: false (반복 재생)
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        뷰포트에서 나갔다가 다시 들어오면 매번 재생. 데모를 보려면 위/아래로
        넘나들며 스크롤.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }} // 50%가 보일 때마다 트리거
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        style={{ height: 90, borderRadius: 12, background: "#ddd6fe" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3) margin — 조금 일찍 트리거 (상단에 닿기도 전에 시작)                     */
/* ------------------------------------------------------------------ */
function DemoMargin() {
  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
        3-1) viewport.margin (조금 일찍 시작)
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        margin으로 트리거 시점을 앞당겨 '스크롤 도착하기 전에' 미리 애니메이션을
        시작.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: false,
          amount: 0.3,
          margin: "-120px 0px -120px 0px", // 위/아래로 120px 당겨서 일찍/늦게 트리거
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ height: 90, borderRadius: 12, background: "#a7f3d0" }}
      />
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>
        스크롤 상단에 딱 닿기 전에 자연스럽게 등장하는 느낌을 만들 때 유용.
      </p>
    </div>
  );
}

function DemoMargin2() {
  // 들어올 때는 60%만 보여도 true, 나갈 때는 40% 이하로 줄어들어야 false
  // 관찰 상자는 위/아래 140px 확장(조기 감지), 120ms 디바운스
  const { el, inView } = useInViewHysteresis<HTMLDivElement>({
    enter: 0.3,
    leave: 0.1,
    rootMargin: "-120px 0px",
    debounceMs: 120,
  });

  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
        3-2) viewport.margin + 완충(히스테리시스) 버전
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        경계에서 무한 애니메이션이 일어나는 3-1과 달리 들어올 때/나갈 때 기준을
        다르게 둬서 경계 깜빡임을 줄였습니다.
      </p>

      <motion.div
        ref={el}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 24,
          duration: 0.5,
        }}
        style={{ height: 90, borderRadius: 12, background: "#a7f3d0" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4) useInView 훅 — 더 세밀하게 제어(상태/클래스 토글, 연쇄 트리거 등)          */
/* ------------------------------------------------------------------ */
function DemoHook() {
  const ref = useRefDiv(); // ref + inView 관찰 유틸(아래 정의)
  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
        4) useInView 훅 (커스텀 제어)
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        훅을 쓰면 "보이는지 여부"로 상태를 바꾸거나, 다른 애니메이션을
        연쇄적으로 트리거할 수 있어.
      </p>

      <motion.div
        ref={ref.el} // 이 요소를 관찰
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          ref.inView ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.98 }
        }
        transition={{ type: "spring", stiffness: 340, damping: 24 }}
        style={{
          height: 100,
          borderRadius: 12,
          background: ref.inView ? "#fee2e2" : "#f3f4f6", // inView에 따라 배경 변경
          display: "grid",
          placeItems: "center",
          fontWeight: 600,
        }}
      >
        {ref.inView ? "보이는 중 (inView=true)" : "아직 멀어요 (inView=false)"}
      </motion.div>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>
        이 방식은 <code>whileInView</code> 대신, <code>inView</code> 상태로 더
        많은 로직을 엮고 싶을 때 적합.
      </p>
    </div>
  );
}

/* ---- 유틸: useRef + useInView 묶음 --------------------------------- */
import { useRef } from "react";
function useRefDiv() {
  const el = useRef<HTMLDivElement | null>(null);
  const inView = useInView(el, { amount: 0.5, margin: "-80px 0px" }); // 50% 보일 때, 위쪽 80px 당겨서 트리거
  return { el, inView };
}

/* ---- 스페이서: 스크롤 여백용 -------------------------------------- */
function Spacer() {
  return <div style={{ height: 240 }} />;
}
