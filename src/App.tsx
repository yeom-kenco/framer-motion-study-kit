import { MotionConfig } from "framer-motion";
import MotionStep1 from "./week1/Step1_Motion";
import Step2_HoverTap from "./week1/Step2_HoverTap";

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <MotionStep1 />
      <Step2_HoverTap />
    </MotionConfig>
  );
}
