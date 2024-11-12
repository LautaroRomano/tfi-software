import PatientPage from "./PatientPage";

export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const patientId = (await params).patientId;

  return <PatientPage patientId={parseInt(patientId)} />;
}
