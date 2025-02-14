
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Guidelines = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold mb-2">Brand Guidelines</h1>
        <p className="text-muted-foreground">
          Access your hotel brand compliance documentation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Guidelines;
