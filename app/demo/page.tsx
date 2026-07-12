import type { Metadata } from "next";
import DemoApp from "@/components/DemoApp";

export const metadata: Metadata = {
  title: "Live Demo — SignSimple",
  description: "Interactive demo of SignSimple's e-signature dashboard for tax preparers.",
};

export default function DemoPage() {
  return <DemoApp />;
}
