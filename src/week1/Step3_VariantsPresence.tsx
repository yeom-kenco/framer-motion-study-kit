// Step3_VariantsPresence.tsx
import { useState } from "react"; // 리액트 상태 훅
import { MotionConfig, AnimatePresence, motion } from "framer-motion"; // framer 핵심 컴포넌트들
import { type Variants } from "framer-motion";

// 부모 컨테이너가 "자식들을 순차 재생"하도록 하는 상태 정의(variants)
const containerVariants: Variants = {
  hidden: {}, // 숨김 상태(자식에게는 아무것도 강제 안 함)
  show: {
    transition: {
      staggerChildren: 0.12, // 자식들 사이에 0.12s 간격을 둬서 순차 재생
      delayChildren: 0.05, // 첫 자식 시작 전 0.05s 지연
    },
  },
};

// 리스트 아이템(카드/칩/패널 등) 개별 요소에 적용할 상태 정의
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 }, // 처음엔 살짝 아래 + 투명
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 24 }, // 스프링으로 자연스럽게
  },
  exit: { opacity: 0, y: 8 }, // 제거될 때(퇴장) 살짝 아래로 사라짐
};

// 토글 가능한 패널(열기/닫기). export 안 함(이 파일 내부 전용)
function TogglePanel() {
  const [open, setOpen] = useState(true); // 열림 상태

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)} // 버튼으로 열림/닫힘 토글
        style={{
          padding: "8px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {open ? "닫기" : "열기"} // 라벨 토글
      </button>

      {/* AnimatePresence: 조건부 렌더가 '사라질 때' 퇴장 애니메이션을 허용 */}
      <AnimatePresence initial={false}>
        {/* open이 true일 때만 패널이 존재 → false로 바뀌면 '사라지는 순간' exit 재생 */}
        {open && (
          <motion.div
            key="panel" // presence 추적용 키(고유값)
            initial={{ opacity: 0, y: -8, scale: 0.98 }} // 처음 나타날 때 살짝 위/작게
            animate={{ opacity: 1, y: 0, scale: 1 }} // 보일 때 상태
            exit={{ opacity: 0, y: -8, scale: 0.98 }} // 닫힐 때(조건부가 false로 바뀌는 순간) 상태
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{
              marginTop: 12,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
            }}
          >
            나는 토글 패널이에요. 닫을 때도 부드럽게 사라져요.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 이 파일의 기본 내보내기 컴포넌트(화면 전체 데모)
export default function Step3_VariantsPresence() {
  const [seed, setSeed] = useState(0); // remount용 시드(키 바꿔서 재생)
  const [chips, setChips] = useState([
    // 칩 목록(삭제 데모에 사용)
    "React",
    "TypeScript",
    "Framer Motion",
    "Tailwind",
  ]);

  return (
    // 학습 단계: OS '모션 줄이기' 설정을 무시하고 항상 애니메이션 보이도록
    <MotionConfig reducedMotion="never">
      <div
        style={{
          padding: 24,
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gap: 24,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <h1>Week1: Step3</h1>
        {/* 0) Replay: 'seed'를 바꿔 key를 바꾸면 해당 블록이 remount → 들어오는 모션을 다시 볼 수 있음 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => setSeed((s) => s + 1)} // 클릭 시 seed 증가 → 아래 grid key 변경
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
            Variants & Stagger가 다시 재생돼요.
          </span>
        </div>

        {/* 1) Variants + Stagger: 카드 그리드 입장 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
            1) Staggered Cards (variants)
          </h3>
          <motion.ul
            key={`grid-${seed}`} // seed가 바뀌면 ul 자체를 remount → 자식들 재생
            variants={containerVariants} // 부모 variants: 자식들의 타이밍을 조율
            initial="hidden" // 부모 상태 이름: 시작은 hidden
            animate="show" // 부모 상태 이름: show로 전환
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: 12,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.li
                key={i} // 각 자식은 고유 key 필요
                variants={itemVariants} // 자식 variants: hidden/show 정의를 따름
                style={{ height: 72, borderRadius: 12, background: "#f3f4f6" }}
              />
            ))}
          </motion.ul>
          <p style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            부모에 <code>variants</code> + <code>initial/animate</code>를 주면,
            자식의 <code>variants</code> 키가 자동으로 오케스트레이션됩니다.
          </p>
        </section>

        {/* 2) AnimatePresence + exit: 아이템 개별 삭제 시 부드러운 퇴장 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
            2) Chips Remove (AnimatePresence)
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* 목록을 감싸서 '사라지는' 순간에 exit를 실행시킴 */}
            <AnimatePresence initial={false}>
              {chips.map((label) => (
                <motion.button
                  key={label} // 항목 식별용 key(퇴장 애니메이션에 필수)
                  layout // 레이아웃 변화(칩이 빠지며 빈공간 메우기)를 부드럽게
                  initial="hidden" // 개별 칩도 입장 애니메이션 사용
                  animate="show"
                  exit="exit" // 삭제될 때 사용할 상태 이름
                  variants={itemVariants} // 위에서 정의한 hidden/show/exit를 그대로 사용
                  onClick={
                    () => setChips((prev) => prev.filter((c) => c !== label)) // 클릭하면 자기 자신을 제거
                  }
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    borderRadius: 999,
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  {label} ✕
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          <p style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            <b>중요:</b> <code>AnimatePresence</code>는 반드시 “조건부/목록”
            요소를 감싸야 하고, 각 아이템에는 <code>key</code>가 필요합니다.
            퇴장 모션은 <code>exit</code>로 정의해요.
          </p>
        </section>

        {/* 3) 토글 패널: 조건부 렌더 퇴장 */}
        <section>
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
            3) Toggle Panel (enter/exit)
          </h3>
          <TogglePanel /> {/* 위의 보조 컴포넌트 렌더 */}
        </section>
      </div>
    </MotionConfig>
  );
}
