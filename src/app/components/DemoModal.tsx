import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import calendarScreenshot from "../../assets/calendarScreenshot.png";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>See Appointzy in action</DialogTitle>
          <DialogDescription>
            Manage your appointments with our intuitive weekly calendar view
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={calendarScreenshot}
            alt="Appointzy calendar interface showing weekly view"
            className="w-full rounded-lg border border-border shadow-lg"
          />
          <div className="mt-6 space-y-4">
            <h4>Key features shown:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Weekly calendar view with time slots</li>
              <li>✓ Easy-to-read appointment blocks</li>
              <li>✓ Quick navigation between weeks</li>
              <li>✓ Add appointments with a single click</li>
            </ul>
            <Button className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
              Start your free trial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
