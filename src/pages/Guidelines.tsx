
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface GuidelineDocument {
  id: string;
  name: string;
  category: string;
  lastUpdated: string;
  size: string;
}

const Guidelines = () => {
  // This would typically come from your backend
  const documents: GuidelineDocument[] = [
    {
      id: "1",
      name: "Brand Standards Guide 2024",
      category: "Brand Standards",
      lastUpdated: "2024-01-15",
      size: "2.5 MB",
    },
    {
      id: "2",
      name: "Room Design Specifications",
      category: "Design Guidelines",
      lastUpdated: "2024-02-01",
      size: "4.1 MB",
    },
    {
      id: "3",
      name: "Technology Requirements",
      category: "Technical Standards",
      lastUpdated: "2024-01-30",
      size: "1.8 MB",
    },
    {
      id: "4",
      name: "FF&E Specifications",
      category: "Product Guidelines",
      lastUpdated: "2024-02-10",
      size: "3.2 MB",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Guidelines</h1>
          <p className="text-muted-foreground">
            Access your hotel brand compliance documentation
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Documents</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>{new Date(doc.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Guidelines;
