import { notFound } from 'next/navigation';
// to render no-found  for dashboardlayout  not global
export default function CatchAll() {
  notFound();
}
