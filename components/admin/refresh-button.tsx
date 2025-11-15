"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { revalidatePage } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

interface RefreshButtonProps {
  path: string;
}

export function RefreshButton({ path }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await revalidatePage(path);
      toast({
        title: "Success!",
        description: "Page data refreshed successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error refreshing page:", error);
      toast({
        title: "Error",
        description: "Failed to refresh page data.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
      {isRefreshing ? (
        <>
          <Spinner className="h-4 w-4 mr-2" />
          Refreshing...
        </>
      ) : (
        <>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh Data
        </>
      )}
    </Button>
  );
}
