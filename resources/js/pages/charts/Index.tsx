import React from 'react';
import { ExampleChart } from './components/ExampleChart';
import { useTranslations } from '@/hooks/use-translations';
import { ChartPie } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gráfico de ejemplo</h1>
      <ExampleChart />
    </div>
  );
}
