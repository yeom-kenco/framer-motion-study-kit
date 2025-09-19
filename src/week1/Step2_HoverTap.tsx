// Step2_HoverTap.tsx
import { MotionConfig, motion } from "framer-motion";

export default function Step2_HoverTap() {
  return (
    <MotionConfig reducedMotion="never">
      <div
        style={{
          padding: 24,
          display: "grid",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* 1) 버튼: hover/tap 기본 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
            1) 버튼 마이크로 인터랙션
          </h3>
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              background: "#111",
              color: "#fff",
              border: "1px solid #222",
              cursor: "pointer",
            }}
          >
            Hover & Tap me
          </motion.button>
          <p style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            hover(올려놓는 동안), tap(누르고 있는 동안)만 적용됨. 손 떼면 즉시
            원래 상태로 복귀.
          </p>
        </section>

        {/* 2) 카드: hover 시 그림자/떠오름 + tap 시 살짝 눌림 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>2) 카드 인터랙션</h3>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            }}
            whileTap={{ scale: 0.98, y: -2 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{
              height: 120,
              borderRadius: 16,
              background: "#f3f4f6",
              boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
              padding: 16,
            }}
          >
            카드 콘텐츠
          </motion.div>
          <p style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            hover로 살짝 떠오르고, tap으로 눌림. 시각적 깊이를 주는 기본 패턴.
          </p>
        </section>

        {/* 3) 아이콘: transform-origin 바꿔서 자연스러운 스케일 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
            3) 아이콘 스케일(기준점 지정)
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#a78bfa",
              display: "grid",
              placeItems: "center",
              transformOrigin: "center", // ← 기준점
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ★
          </motion.div>
          <p style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            transformOrigin으로 스케일 기준점을 조정. (보통 center, 버튼은
            top/left도 유효)
          </p>
        </section>
      </div>
    </MotionConfig>
  );
}
