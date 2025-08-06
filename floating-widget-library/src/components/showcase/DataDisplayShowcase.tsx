/**
 * DataDisplayShowcase - Interactive examples of all data display components
 */

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

export function DataDisplayShowcase() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(66);

  // Sample data for table
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
  ];

  // Sample data for charts
  const chartData = [
    { month: "Jan", value: 186, revenue: 2400 },
    { month: "Feb", value: 305, revenue: 1398 },
    { month: "Mar", value: 237, revenue: 9800 },
    { month: "Apr", value: 273, revenue: 3908 },
    { month: "May", value: 209, revenue: 4800 },
    { month: "Jun", value: 214, revenue: 3800 },
  ];

  const pieData = [
    { name: "Desktop", value: 45, color: "#8884d8" },
    { name: "Mobile", value: 35, color: "#82ca9d" },
    { name: "Tablet", value: 20, color: "#ffc658" },
  ];

  return (
    <div className="space-y-8">
      {/* Table Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Table</h3>
          <p className="text-sm text-muted-foreground">
            A responsive table with headers, rows, and caption
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      invoice.paymentStatus === "Paid" 
                        ? "default" 
                        : invoice.paymentStatus === "Pending" 
                        ? "secondary" 
                        : "destructive"
                    }
                  >
                    {invoice.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Badge Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Badge</h3>
          <p className="text-sm text-muted-foreground">
            Display badges in different variants
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-green-500 text-white hover:bg-green-600">Custom</Badge>
        </div>
      </div>

      {/* Avatar Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Avatar</h3>
          <p className="text-sm text-muted-foreground">
            User avatars with image and fallback
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://unavailable.com/image.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar className="h-20 w-20">
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Progress Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Progress</h3>
          <p className="text-sm text-muted-foreground">
            Display progress indicators
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
            <Button onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
            <Button variant="outline" onClick={() => setProgress(0)}>Reset</Button>
          </div>
          <div className="space-y-2">
            <Progress value={25} className="w-full" />
            <Progress value={50} className="w-full" />
            <Progress value={75} className="w-full" />
            <Progress value={100} className="w-full" />
          </div>
        </div>
      </div>

      {/* Calendar Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Date picker calendar component
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Selected Date:</p>
            <p className="font-medium">
              {date ? date.toLocaleDateString() : "No date selected"}
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Carousel</h3>
          <p className="text-sm text-muted-foreground">
            Swipeable carousel component
          </p>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <CarouselItem key={num}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{num}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Chart Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Charts</h3>
          <p className="text-sm text-muted-foreground">
            Data visualization with bar, line, and pie charts
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Bar Chart */}
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4">Bar Chart</h4>
              <ChartContainer className="h-[200px] w-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4">Line Chart</h4>
              <ChartContainer className="h-[200px] w-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4">Pie Chart</h4>
              <ChartContainer className="h-[200px] w-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => entry.name}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skeleton Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Skeleton</h3>
          <p className="text-sm text-muted-foreground">
            Loading placeholder components
          </p>
        </div>
        <div className="space-y-4">
          {/* Text Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>

          {/* Card Skeleton */}
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avatar Skeleton */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}