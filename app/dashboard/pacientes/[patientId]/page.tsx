export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const patientId = (await params).patientId;
  return <div>My ID de paciente: {patientId}</div>;
}
