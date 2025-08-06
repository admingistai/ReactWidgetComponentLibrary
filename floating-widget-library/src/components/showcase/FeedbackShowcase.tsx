/**
 * FeedbackShowcase - Interactive examples of all feedback components
 */

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  Terminal,
  AlertTriangle
} from "lucide-react";

export function FeedbackShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const showToast = (type: "success" | "error" | "info" | "warning") => {
    switch (type) {
      case "success":
        toast.success("Success!", {
          description: "Your action was completed successfully.",
        });
        break;
      case "error":
        toast.error("Error!", {
          description: "Something went wrong. Please try again.",
        });
        break;
      case "info":
        toast.info("Information", {
          description: "Here's some helpful information for you.",
        });
        break;
      case "warning":
        toast.warning("Warning!", {
          description: "Please review this important information.",
        });
        break;
    }
  };

  const showLoadingToast = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    
    toast.promise(promise(), {
      loading: "Loading...",
      success: "Data loaded successfully!",
      error: "Failed to load data",
    });
  };

  return (
    <div className="space-y-8">
      {/* Alert Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Alert</h3>
          <p className="text-sm text-muted-foreground">
            Display important messages in different styles
          </p>
        </div>
        <div className="space-y-4">
          {/* Default Alert */}
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>

          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert to provide context.
            </AlertDescription>
          </Alert>

          {/* Success Alert */}
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your action has been completed successfully.
            </AlertDescription>
          </Alert>

          {/* Warning Alert */}
          <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please review this important information before proceeding.
            </AlertDescription>
          </Alert>

          {/* Destructive Alert */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Alert Dialog Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Alert Dialog</h3>
          <p className="text-sm text-muted-foreground">
            Modal dialogs that interrupt user flow with important information
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Basic Alert Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Confirmation Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Save Changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes. Do you want to save them before leaving?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Discard</AlertDialogCancel>
                <AlertDialogAction>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Toast Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Toast</h3>
          <p className="text-sm text-muted-foreground">
            Brief messages that appear temporarily
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => showToast("success")} variant="outline">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Success Toast
          </Button>
          <Button onClick={() => showToast("error")} variant="outline">
            <XCircle className="mr-2 h-4 w-4" />
            Error Toast
          </Button>
          <Button onClick={() => showToast("info")} variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Info Toast
          </Button>
          <Button onClick={() => showToast("warning")} variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Warning Toast
          </Button>
          <Button onClick={showLoadingToast} variant="outline">
            Loading Toast
          </Button>
          <Button 
            onClick={() => {
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              });
            }}
            variant="outline"
          >
            Toast with Action
          </Button>
        </div>
      </div>

      {/* Dialog Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Dialog</h3>
          <p className="text-sm text-muted-foreground">
            Modal dialog for forms and content
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Basic Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={() => {
                    toast.success("Profile updated successfully!");
                    setDialogOpen(false);
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Custom Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share this document</DialogTitle>
                <DialogDescription>
                  Anyone with the link can view this document.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://example.com/document/123"
                    readOnly
                  />
                </div>
                <Button 
                  type="submit" 
                  size="sm" 
                  className="px-3"
                  onClick={() => {
                    navigator.clipboard.writeText("https://example.com/document/123");
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  Copy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Drawer Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Drawer</h3>
          <p className="text-sm text-muted-foreground">
            A panel that slides out from the edge of the screen
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Bottom Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                    >
                      -
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        350
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Drawer with Form */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Settings</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Account Settings</DrawerTitle>
                <DrawerDescription>
                  Configure your account preferences.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <select 
                    id="notifications" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>All notifications</option>
                    <option>Important only</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <DrawerFooter>
                <Button>Save Settings</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}