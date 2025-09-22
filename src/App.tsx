import { MotionConfig } from "framer-motion";
import MotionStep1 from "./week1/Step1_Motion";
import Step2_HoverTap from "./week1/Step2_HoverTap";
import Step3_VariantsPresence from "./week1/Step3_VariantsPresence";

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <MotionStep1 />
      <Step2_HoverTap />
      <Step3_VariantsPresence />
    </MotionConfig>
  );
}
