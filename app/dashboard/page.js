import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
  title: "Diet Tracker ⋅ Dashboard",
};
export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
