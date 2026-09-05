import { AppShell } from "@/components/app-shell";
import { HomeView } from "@/components/home-view";

export default function Home() {
  return (
    <AppShell page="home">
      <HomeView />
    </AppShell>
  );
}
