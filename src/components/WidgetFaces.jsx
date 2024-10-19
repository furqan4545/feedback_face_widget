import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import tailwindstyles from "../index.css?inline";

function SimpleFeedbackWidget({ allowedRoutes = [], displayAfter = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [satisfaction, setSatisfaction] = useState(null);

  useEffect(() => {
    const checkRoute = () => {
      const currentPath = window.location.pathname;
      const isAllowed = allowedRoutes.some((route) =>
        currentPath.includes(route)
      );

      if (isAllowed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, displayAfter * 1000);

        return () => clearTimeout(timer);
      } else {
        setIsOpen(false);
      }
    };

    checkRoute();
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("popstate", checkRoute);
    };
  }, [allowedRoutes, displayAfter]);

  const handleSatisfactionClick = (value) => {
    setSatisfaction(value);
    // Here you can add logic to submit the feedback
    console.log(`Satisfaction level: ${value}`);
    // Close the widget after selection
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{tailwindstyles}</style>
      <Card className="widget fixed bottom-4 right-4 w-64 shadow-2xl transform hover:scale-105 transition-all duration-300">
        <style>{tailwindstyles}</style>
        <CardHeader className="widget flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
          <CardTitle className="widget text-sm font-medium leading-tight">
            How was your experience?
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="widget px-4 pt-0 pb-4">
          <style>{tailwindstyles}</style>
          <div className="flex justify-between">
            {[1, 2, 3].map((value) => (
              <Button
                key={value}
                variant="ghost"
                size="lg"
                className="w-[30%] h-12 text-3xl"
                onClick={() => handleSatisfactionClick(value)}
              >
                {value === 1 ? "😞" : value === 2 ? "😐" : "😊"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default SimpleFeedbackWidget;
