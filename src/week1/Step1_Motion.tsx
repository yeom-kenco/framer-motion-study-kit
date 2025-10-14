// MotionStep1.tsx (디버그 버전)
import { MotionConfig, motion } from "framer-motion";

export default function Step1_Motion() {
  return (
    <MotionConfig reducedMotion="never">
      <div
        style={{
          padding: 24,
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gap: 24,
        }}
      >
        {/* 0. 강제 왕복 박스 (무한 반복) */}
        <section>
          <h2 style={{ marginBottom: 8, fontWeight: 600 }}>0. Must move</h2>
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: [0, 300, 0], opacity: 1, rotate: [0, 12, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#6366f1",
            }}
          />
        </section>

        {/* A. 스프링 기본 (살짝만 변화 → 못 느낄 수 있어, y를 크게 키움) */}
        <section>
          <h2 style={{ marginBottom: 8, fontWeight: 600 }}>A. Spring 기본</h2>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ height: 80, borderRadius: 12, background: "#e5e7eb" }}
          />
        </section>

        {/* B. 스프링 비교 */}
        <section>
          <h2 style={{ marginBottom: 8, fontWeight: 600 }}>B. 스프링 비교</h2>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 16 }}
            style={{
              height: 56,
              borderRadius: 12,
              background: "#a7f3d0",
              marginBottom: 6,
            }}
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            style={{ height: 56, borderRadius: 12, background: "#a7f3d0" }}
          />
        </section>

        {/* C. 트윈 */}
        <section>
          <h2 style={{ marginBottom: 8, fontWeight: 600 }}>C. Tween</h2>
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
            style={{ height: 80, borderRadius: 12, background: "#ddd6fe" }}
          />
        </section>
      </div>
    </MotionConfig>
  );
}
