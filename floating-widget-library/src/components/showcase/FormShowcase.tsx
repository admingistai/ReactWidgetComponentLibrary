/**
 * FormShowcase - Interactive examples of all form components
 */

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Bold, Italic, Underline } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters.",
  }),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  volume: z.number().min(0).max(100),
});

export function FormShowcase() {
  const { toast } = useToast();
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [toggleValue, setToggleValue] = useState(false);
  const [toggleGroupValue, setToggleGroupValue] = useState("bold");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      notifications: false,
      theme: "system",
      volume: 50,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Form submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="space-y-8">
      {/* Form Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Complete Form Example</h3>
          <p className="text-sm text-muted-foreground">
            React Hook Form with Zod validation
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can write up to 160 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      {/* Individual Components */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Input</h3>
            <p className="text-sm text-muted-foreground">
              Basic text input field
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-demo">Your name</Label>
            <Input id="input-demo" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-disabled">Disabled</Label>
            <Input id="input-disabled" placeholder="Disabled input" disabled />
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Textarea</h3>
            <p className="text-sm text-muted-foreground">
              Multi-line text input
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="textarea-demo">Your message</Label>
            <Textarea
              id="textarea-demo"
              placeholder="Type your message here."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Select */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Select</h3>
            <p className="text-sm text-muted-foreground">
              Dropdown selection menu
            </p>
          </div>
          <div className="space-y-2">
            <Label>Select a fruit</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Checkbox */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Checkbox</h3>
            <p className="text-sm text-muted-foreground">
              Toggle option on/off
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-demo"
                checked={checkboxValue}
                onCheckedChange={(checked) => setCheckboxValue(checked === true)}
              />
              <Label
                htmlFor="checkbox-demo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Checked: {checkboxValue ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Radio Group */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Radio Group</h3>
            <p className="text-sm text-muted-foreground">
              Select one option from a group
            </p>
          </div>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three">Option Three</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Switch */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Switch</h3>
            <p className="text-sm text-muted-foreground">
              Toggle switch control
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="switch-demo"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="switch-demo">Enable notifications</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Status: {switchValue ? "On" : "Off"}
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Slider</h3>
            <p className="text-sm text-muted-foreground">
              Range input control
            </p>
          </div>
          <div className="space-y-4">
            <Label>Volume: {sliderValue[0]}%</Label>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>
        </div>

        {/* Toggle */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Toggle</h3>
            <p className="text-sm text-muted-foreground">
              Toggle button control
            </p>
          </div>
          <div className="space-y-4">
            <Toggle
              pressed={toggleValue}
              onPressedChange={setToggleValue}
              aria-label="Toggle italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <p className="text-sm text-muted-foreground">
              Pressed: {toggleValue ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Toggle Group */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Toggle Group</h3>
            <p className="text-sm text-muted-foreground">
              Group of toggle buttons
            </p>
          </div>
          <div className="space-y-4">
            <ToggleGroup
              type="single"
              value={toggleGroupValue}
              onValueChange={setToggleGroupValue}
            >
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">
              Selected: {toggleGroupValue || "None"}
            </p>
          </div>
        </div>

        {/* Input OTP */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Input OTP</h3>
            <p className="text-sm text-muted-foreground">
              One-time password input
            </p>
          </div>
          <div className="space-y-4">
            <Label>Enter verification code</Label>
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Code: {otpValue || "------"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}