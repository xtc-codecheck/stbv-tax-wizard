/**
 * Dokumenten-Anzahl Chart (Trend)
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { MonthlyRevenue } from '@/hooks/useDocumentArchive';

interface DocumentCountChartProps {
  data: MonthlyRevenue[];
}

const chartConfig: ChartConfig = {
  count: {
    label: 'Dokumente',
    color: 'hsl(var(--primary))',
  },
};

export function DocumentCountChart({ data }: DocumentCountChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumenten-Trend</CardTitle>
        <CardDescription>Anzahl erstellter Rechnungen pro Monat</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="monthLabel" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => (
                    <span className="font-medium">{value} Dokument{value !== 1 ? 'e' : ''}</span>
                  )}
                />
              }
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--primary))" 
              fill="url(#colorCount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
