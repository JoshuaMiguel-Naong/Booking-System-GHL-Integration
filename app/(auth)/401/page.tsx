import Unauthorized from "@/components/401/unauthorized";

export const metadata = {
  title: "401 Unauthorized",
};

export default function UnauthorizedPage() {
  return (
    <Unauthorized
      title="401 — Unauthorized"
      message="You do not have access to this page. Please contact your administrator if you believe this is a mistake."
      supportEmail="joshuamiguel.naong@microsource.com.ph"
    />
  );
}
    