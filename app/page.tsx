import { Dashboard } from '@/components/Dashboard/Dashboard';
import { SimpleVillaForm } from '@/components/Forms/SimpleVillaForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Dashboard />

      <div className="py-12 px-4">
        <SimpleVillaForm />
      </div>
    </main>
  );
}
