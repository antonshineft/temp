
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Quote, Clock, CheckCircle, XCircle } from "lucide-react";

interface QuoteRequest {
  id: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

const statusColors = {
  pending: "text-yellow-500",
  approved: "text-green-500",
  rejected: "text-red-500",
};

const QuoteRequestCard = ({ quote }: { quote: QuoteRequest }) => {
  const StatusIcon = statusIcons[quote.status];
  const statusColor = statusColors[quote.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {quote.productName}
        </CardTitle>
        <StatusIcon className={`h-4 w-4 ${statusColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{quote.quantity} units</div>
        <p className="text-xs text-muted-foreground mt-1">
          Requested on {new Date(quote.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

const Quotes = () => {
  // This would typically come from your backend
  const quoteRequests: QuoteRequest[] = [
    {
      id: "1",
      productName: "Samsung 43\" Crystal UHD Smart TV",
      quantity: 10,
      status: "pending",
      createdAt: "2024-02-15T12:00:00Z",
    },
    {
      id: "2",
      productName: "LG 50\" 4K UHD Smart TV",
      quantity: 5,
      status: "approved",
      createdAt: "2024-02-14T15:30:00Z",
    },
    {
      id: "3",
      productName: "Amana PTAC Standard",
      quantity: 20,
      status: "rejected",
      createdAt: "2024-02-13T09:15:00Z",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Quote className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Quote Requests</h1>
          <p className="text-muted-foreground">
            Manage your product quote requests
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quoteRequests.map((quote) => (
          <QuoteRequestCard key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default Quotes;
