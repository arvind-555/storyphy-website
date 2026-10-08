import type { Metadata } from "next";
import { SchoolsPage } from "@/components/schools/SchoolsPage";

export const metadata: Metadata = {
  title: "For Schools - Storyphy personalized storybooks",
  description:
    "Give every child in your preschool or school their own personalized storybook. Easy for your team, delivered in 7-10 days.",
};

export default function Schools() {
  return <SchoolsPage />;
}
