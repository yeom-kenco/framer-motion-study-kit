import { MotionConfig } from "framer-motion";
import Step2_HoverTap from "./week1/Step2_HoverTap";
import Step3_VariantsPresence from "./week1/Step3_VariantsPresence";
import Step1_Motion from "./week1/Step1_Motion";
import Step4_InViewViewport from "./week1/Step4_InViewViewport";

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <Step1_Motion />
      <Step2_HoverTap />
      <Step3_VariantsPresence />
      <Step4_InViewViewport />
    </MotionConfig>
  );
}
