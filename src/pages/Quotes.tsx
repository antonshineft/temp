
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Quotes = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold mb-2">Quote Requests</h1>
        <p className="text-muted-foreground">
          Manage your product quote requests
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Quotes;
